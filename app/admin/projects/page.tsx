'use client'

import { useState } from 'react'
import ProjectList from './components/ProjectList'
import AddProjectForm from './components/AddProjectForm'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function ProjectsPage() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const handleAddProjectSuccess = () => {
    setIsAddProjectOpen(false)
    setUpdateTrigger(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className={`transition-all duration-300 ease-in-out ${isAddProjectOpen ? 'w-2/3 pr-6' : 'w-full'}`}>
          <ProjectList updateTrigger={updateTrigger} />
        </div>
        <AnimatePresence>
          {isAddProjectOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '33.333333%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l border-gray-200"
            >
              <div className="pl-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Add New Project</h2>
                  <button
                    onClick={() => setIsAddProjectOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <AddProjectForm 
                  onProjectAdded={handleAddProjectSuccess} 
                  onCancel={() => setIsAddProjectOpen(false)} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

