import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    images: string[];
    status: string;
    clientName: string;
    createdAt: Date;
    likeCount: number;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/admin/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
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
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            <span>{project.likeCount} likes</span>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Posted on {project.createdAt.toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

