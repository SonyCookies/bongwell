"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "@/app/lib/firebase-config";
import {
  Loader2,
  Upload,
  X,
  Maximize2,
  MinusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  clientName: string;
  likeCount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface FormData {
  title: string;
  description: string;
  status: string;
  clientName: string;
}

interface ImagePreview {
  file: File;
  preview: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  status: "planning",
  clientName: "",
};

interface AddProjectFormProps {
  onProjectAdded: (newProject: Project) => void;
  onCancel: () => void;
}

export default function AddProjectForm({
  onProjectAdded,
  onCancel,
}: AddProjectFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    index: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!auth.currentUser) {
      setError("You must be logged in to add a project.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(
            storage,
            `projects/${Date.now()}-${image.file.name}`
          );
          await uploadBytes(imageRef, image.file);
          return getDownloadURL(imageRef);
        })
      );

      const newProject: Omit<Project, "id"> = {
        ...formData,
        likeCount: 0,
        images: imageUrls,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: auth.currentUser.uid,
      };

      const docRef = await addDoc(collection(db, "projects"), newProject);
      onProjectAdded({ ...newProject, id: docRef.id } as Project);
      setFormData(initialFormData);
      setImages([]);
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-base font-semibold text-gray-900"
        >
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-base placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter project title"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-base font-semibold text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-base placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Describe your project"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="status"
          className="block text-base font-semibold text-gray-900"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-base focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="planning">Planning</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="clientName"
          className="block text-base font-semibold text-gray-900"
        >
          Client Name
        </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-gray-900 text-base placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter client name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-semibold text-gray-900">
          Project Images
        </label>
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
            className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-base font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Images
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={image.preview}
                alt={`Preview ${index + 1}`}
                fill
                className="absolute inset-0 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage({ url: image.preview, index })
                  }
                  className="text-white p-1 hover:text-blue-300 transition-colors duration-200"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-white p-1 hover:text-red-300 transition-colors duration-200"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <motion.div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
          role="alert"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-lg border border-gray-300 text-base font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-4 rounded-lg border border-transparent text-base font-medium text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Adding...
            </>
          ) : (
            "Add Project"
          )}
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed -top-10 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <div className="relative w-[90vw] h-[80vh] max-w-6xl">
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.url}
                  alt="Full size preview"
                  fill
                  className="object-contain"
                  sizes="100vw"
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
                    onClick={() =>
                      setSelectedImage({
                        url: images[selectedImage.index - 1].preview,
                        index: selectedImage.index - 1,
                      })
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-lg text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                )}
                {selectedImage.index < images.length - 1 && (
                  <button
                    onClick={() =>
                      setSelectedImage({
                        url: images[selectedImage.index + 1].preview,
                        index: selectedImage.index + 1,
                      })
                    }
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
    </form>
  );
}
