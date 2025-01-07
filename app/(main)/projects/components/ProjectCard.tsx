'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type LucideIcon, ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  Icon: LucideIcon
}

export default function ProjectCard({ title, description, image, Icon }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white dark:bg-[#003366] rounded-lg shadow-lg overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00a5b5] opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-16 h-16 text-white" />
          </motion.div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#001830] dark:text-[#f0f8ff] mb-2">{title}</h2>
        <p className="text-[#4a5568] dark:text-[#b3d9ff]">{description}</p>
      </div>
      <motion.div
        className="absolute inset-0 bg-[#00a5b5] bg-opacity-90 flex items-center justify-center"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.button
          className="px-6 py-3 bg-white text-[#00a5b5] rounded-full font-semibold flex items-center transition-colors duration-300 hover:bg-[#f0f8ff]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

