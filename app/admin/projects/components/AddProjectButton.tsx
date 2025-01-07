'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function AddProjectButton() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push('/admin/add-project')}
      className="bg-[#00a5b5] text-white px-4 py-2 rounded-lg flex items-center"
      whileHover={{ scale: 1.05, backgroundColor: '#008999' }}
      whileTap={{ scale: 0.95 }}
    >
      <Plus className="w-5 h-5 mr-2" />
      Add Project
    </motion.button>
  )
}

