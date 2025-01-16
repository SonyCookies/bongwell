import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";

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
    commentCount: number;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      >
        <div className="relative h-48 w-full">
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
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent h-24 pointer-events-none" />
          <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
            {project.status}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {project.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{project.clientName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{project.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-gray-600">{project.likeCount}</span>
              </div>
              <div className="flex items-center text-sm">
                <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                <span className="text-gray-600">{project.commentCount}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#00a5b5] text-white rounded-full text-sm font-medium hover:bg-[#008999] transition-colors duration-200"
            >
              View Project
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
