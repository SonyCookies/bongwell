import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectItemProps {
  project: {
    id: string
    name: string
    description: string
    status: string
    createdAt: Date
  }
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
          <span className="text-sm text-gray-500">
            {project.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
      <Link href={`/admin/projects/${project.id}`}>
        <motion.div
          className="bg-[#00a5b5] text-white text-center py-2 font-medium"
          whileHover={{ backgroundColor: '#008999' }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.div>
      </Link>
    </motion.div>
  )
}

