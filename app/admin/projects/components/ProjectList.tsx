'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/app/lib/firebase-config'
import ProjectCard from './ProjectCard'
import AddProjectForm from './AddProjectForm'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  status: string
  clientName: string
  createdAt: Date
}

interface ProjectListProps {
  updateTrigger: number
}

export default function ProjectList({ updateTrigger }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)

  const fetchProjects = async () => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const projectsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Project[]
    setProjects(projectsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [updateTrigger])

  const handleAddProject = async (newProject: Project) => {
    setIsAddProjectOpen(false)
    await fetchProjects()
  }

  const handleDeleteProject = (id: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
  }

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <motion.button
          onClick={() => setIsAddProjectOpen(true)}
          className="bg-[#00a5b5] text-white rounded-full p-2 shadow-lg hover:bg-[#008999] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isAddProjectOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-6 bg-white rounded-lg shadow-md"
          >
            <AddProjectForm onProjectAdded={handleAddProject} onCancel={() => setIsAddProjectOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length === 0 ? (
        <div className="text-center text-gray-700 py-8">No projects found. Add a new project to get started!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
          ))}
        </div>
      )}
    </div>
  )
}

