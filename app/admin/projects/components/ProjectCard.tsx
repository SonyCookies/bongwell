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
        className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        {/* Project Image */}
        <div className="relative h-56">
          <Image
            src={
              project.images && project.images.length > 0
                ? project.images[0]
                : "/placeholder-project.jpg"
            }
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3">
            {project.description}
          </p>

          {/* Status and Client */}
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
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
              Client: <strong>{project.clientName}</strong>
            </span>
          </div>

          {/* Likes and Date */}
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-red-500" />
              <span>{project.likeCount} Likes</span>
            </div>
            <div>
              Posted on <strong>{project.createdAt.toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
