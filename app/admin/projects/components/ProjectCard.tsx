import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, X } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase-config";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebase-config";
import { Loader2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    images: string[];
    status: string;
    clientName: string;
    createdAt: Date;
  };
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete images from Firebase Storage
      if (project.images && project.images.length > 0) {
        await Promise.all(
          project.images.map(async (imageUrl) => {
            const imageRef = ref(storage, imageUrl); // Get reference to the image in storage
            await deleteObject(imageRef); // Delete the image
          })
        );
      }

      await deleteDoc(doc(db, "projects", project.id));

      onDelete(project.id);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-64 w-full">
        <Image
          src={
            project.images && project.images.length > 0
              ? project.images[0]
              : "/placeholder-project.jpg"
          }
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {project.title}
          </h2>
          <div className="flex space-x-2">
            <button className="text-gray-600 hover:text-[#00a5b5]">
              <Edit size={20} />
            </button>
            <button
              className="text-gray-600 hover:text-red-500"
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === "completed"
                ? "bg-green-100 text-green-800"
                : project.status === "in-progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {project.status}
          </span>
          <span className="text-sm text-gray-500">
            Client: {project.clientName}
          </span>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Posted on {project.createdAt.toLocaleDateString()}
        </div>
      </div>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Project
                </h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mb-4 text-gray-800">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
