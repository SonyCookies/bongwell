'use client'

import { motion } from 'framer-motion'
import { Droplet, Users, Leaf } from 'lucide-react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "Community Well Project",
    description: "Bringing clean water to rural communities through sustainable well drilling and installation.",
    image: "/images/community-well.jpg",
    Icon: Users
  },
  {
    title: "Eco-Friendly Water Treatment",
    description: "Implementing cutting-edge, environmentally friendly water treatment solutions for urban areas.",
    image: "/images/eco-treatment.jpg",
    Icon: Leaf
  },
  {
    title: "Groundwater Mapping Initiative",
    description: "Comprehensive groundwater mapping to identify and protect vital water resources.",
    image: "/images/groundwater-mapping.jpg",
    Icon: Droplet
  },
]

export default function ProjectList() {
  return (
    <>
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center text-[#00a5b5]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore Our Initiatives
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

