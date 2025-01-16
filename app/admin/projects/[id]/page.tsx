'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, Loader2, Upload, Maximize2, MinusCircle, ChevronLeft, ChevronRight, Save, Heart, MessageCircle, Send } from 'lucide-react';
import { doc, getDoc, updateDoc, deleteDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db, storage } from "@/app/lib/firebase-config";
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { use } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  status: string;
  clientName: string;
  createdAt: Date | null;
  likeCount: number;
  likes?: string[];
  comments?: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Timestamp;
}

interface ImagePreview {
  file: File;
  preview: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectViewEditPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newImages, setNewImages] = useState<ImagePreview[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
  const [comment, setComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectDoc = await getDoc(doc(db, "projects", resolvedParams.id));
        if (projectDoc.exists()) {
          const projectData = projectDoc.data() as Project & { createdAt?: any };
          projectData.id = projectDoc.id;
          projectData.likeCount = projectData.likeCount || 0;
          projectData.likes = projectData.likes || [];
          projectData.comments = projectData.comments || [];

          // Safely handle `createdAt` field
          if (projectData.createdAt) {
            if (typeof projectData.createdAt.toDate === "function") {
              projectData.createdAt = projectData.createdAt.toDate();
            } else if (projectData.createdAt instanceof Date) {
              projectData.createdAt = projectData.createdAt;
            } else {
              console.warn("Invalid 'createdAt' format:", projectData.createdAt);
              projectData.createdAt = null;
            }
          } else {
            projectData.createdAt = null;
          }

          setProject(projectData);
          setEditedProject(projectData);
        } else {
          console.error("Project not found");
          // Handle not found case (e.g., redirect to 404 page)
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        // Handle error (e.g., show error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.id]);

  const handleSave = async () => {
    if (!editedProject) return;

    setIsEditing(true);
    try {
      const projectRef = doc(db, "projects", resolvedParams.id);
      
      // Upload new images
      const newImageUrls = await Promise.all(
        newImages.map(async (image) => {
          const imageRef = ref(storage, `projects/${Date.now()}-${image.file.name}`);
          await uploadBytes(imageRef, image.file);
          return getDownloadURL(imageRef);
        })
      );

      // Remove deleted images from storage
      await Promise.all(
        removedImages.map(async (imageUrl) => {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        })
      );

      // Combine existing and new image URLs, excluding removed ones
      const updatedImageUrls = [
        ...editedProject.images.filter(img => !removedImages.includes(img)),
        ...newImageUrls
      ];

      const updatedProject = {
        ...editedProject,
        images: updatedImageUrls,
      };

      await updateDoc(projectRef, updatedProject);

      setProject(updatedProject);
      setEditedProject(updatedProject);
      setNewImages([]);
      setRemovedImages([]);

      // Show success message or handle successful update
    } catch (error) {
      console.error("Error updating project:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;

    try {
      // Delete images from storage
      if (project.images && project.images.length > 0) {
        await Promise.all(
          project.images.map(async (imageUrl) => {
            const imageRef = ref(storage, imageUrl); 
            await deleteObject(imageRef); 
          })
        );
      }

      // Delete project document
      await deleteDoc(doc(db, "projects", project.id));

      // Redirect to projects list page
      router.push('/admin/projects');
    } catch (error) {
      console.error("Error deleting project:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImagePreviews = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewImages((prev) => [...prev, ...newImagePreviews]);
    }
  };

  const removeImage = (index: number, isNewImage: boolean) => {
    if (isNewImage) {
      setNewImages((prev) => {
        const newImages = [...prev];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        return newImages;
      });
    } else if (editedProject) {
      const imageToRemove = editedProject.images[index];
      setRemovedImages((prev) => [...prev, imageToRemove]);
    }
  };

  const handleLike = async () => {
    if (!project || !user) return;

    const projectRef = doc(db, "projects", project.id);
    const userId = user.uid;

    if (project.likes?.includes(userId)) {
      // User has already liked, so unlike
      await updateDoc(projectRef, {
        likeCount: project.likeCount - 1,
        likes: (project.likes || []).filter(id => id !== userId)
      });
      setProject({
        ...project,
        likeCount: project.likeCount - 1,
        likes: (project.likes || []).filter(id => id !== userId)
      });
    } else {
      // User hasn't liked, so add like
      await updateDoc(projectRef, {
        likeCount: project.likeCount + 1,
        likes: arrayUnion(userId)
      });
      setProject({
        ...project,
        likeCount: project.likeCount + 1,
        likes: [...(project.likes || []), userId]
      });
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !user || !comment.trim()) return;

    const projectRef = doc(db, "projects", project.id);
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      content: comment.trim(),
      createdAt: Timestamp.now()
    };

    await updateDoc(projectRef, {
      comments: arrayUnion(newComment)
    });

    setProject({
      ...project,
      comments: [...(project.comments || []), newComment]
    });
    setComment('');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project || !editedProject) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-gray-700 font-bold mb-6">View/Edit Project</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={editedProject.title}
              onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
              className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={editedProject.description}
              onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={editedProject.status}
              onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
              className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              id="clientName"
              value={editedProject.clientName}
              onChange={(e) => setEditedProject({ ...editedProject, clientName: e.target.value })}
              className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Images</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="sr-only"
                ref={fileInputRef}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Images
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {editedProject.images.map((image, index) => (
                !removedImages.includes(image) && (
                  <div key={`existing-${index}`} className="relative group aspect-square">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setSelectedImage({ url: image, index })}
                        className="text-white p-1 hover:text-blue-300 transition-colors duration-200"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index, false)}
                        className="text-white p-1 hover:text-red-300 transition-colors duration-200"
                      >
                        <MinusCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )
              ))}
              {newImages.map((image, index) => (
                <div key={`new-${index}`} className="relative group aspect-square">
                  <img
                    src={image.preview}
                    alt={`New Preview ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setSelectedImage({ url: image.preview, index: editedProject.images.length + index })}
                      className="text-white p-1 hover:text-blue-300 transition-colors duration-200"
                    >
                      <Maximize2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="text-white p-1 hover:text-red-300 transition-colors duration-200"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:space-x-2 mt-4">
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete Project
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isEditing}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isEditing ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Like and Comment Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleLike}
            className={`flex items-center ${project.likes?.includes(user?.uid || '') ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
          >
            <Heart className="w-6 h-6 mr-2" />
            <span>{project.likeCount} likes</span>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {project.comments?.map((comment) => (
            <div key={comment.id} className="bg-gray-100 rounded-lg p-3 mb-2">
              <p className="font-semibold">{comment.userName}</p>
              <p>{comment.content}</p>
              <p className="text-xs text-gray-500">{comment.createdAt.toDate().toLocaleString()}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleComment} className="flex items-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow mr-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="relative w-[90vw] h-[80vh] max-w-6xl">
              <div className="relative w-full h-full">
                <img
                  src={selectedImage.url}
                  alt="Full size preview"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-50 rounded-bl-lg">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {selectedImage.index > 0 && (
                  <button
                    onClick={() => {
                      const newIndex = selectedImage.index - 1;
                      const newUrl = newIndex < editedProject.images.length 
                        ? editedProject.images[newIndex] 
                        : newImages[newIndex - editedProject.images.length].preview;
                      setSelectedImage({ url: newUrl, index: newIndex });
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-lg text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                )}
                {selectedImage.index < editedProject.images.length + newImages.length - 1 && (
                  <button
                    onClick={() => {
                      const newIndex = selectedImage.index + 1;
                      const newUrl = newIndex < editedProject.images.length 
                        ? editedProject.images[newIndex] 
                        : newImages[newIndex - editedProject.images.length].preview;
                      setSelectedImage({ url: newUrl, index: newIndex });
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-lg text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
