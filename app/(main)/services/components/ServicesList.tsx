'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplet, Drill, Wrench, FlaskRound, Leaf, Users, ArrowRight } from 'lucide-react'

const services = [
  {
    title: "Well Drilling",
    description: "State-of-the-art well drilling services for residential, commercial, and agricultural needs.",
    icon: Drill,
    color: "#4A90E2",
  },
  {
    title: "Water Pump Installation",
    description: "Expert installation and maintenance of water pumps to ensure efficient water distribution.",
    icon: Wrench,
    color: "#50E3C2",
  },
  {
    title: "Water Quality Testing",
    description: "Comprehensive water quality analysis to ensure safe and clean water for all purposes.",
    icon: FlaskRound,
    color: "#F5A623",
  },
  {
    title: "Groundwater Exploration",
    description: "Advanced techniques for locating and assessing groundwater resources.",
    icon: Droplet,
    color: "#7ED321",
  },
  {
    title: "Sustainable Water Solutions",
    description: "Eco-friendly water management systems for long-term sustainability.",
    icon: Leaf,
    color: "#B8E986",
  },
  {
    title: "Community Water Projects",
    description: "Collaborative efforts to bring clean water to underserved communities.",
    icon: Users,
    color: "#9013FE",
  },
]

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center text-[#00a5b5]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Expertise
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-[#002040] rounded-lg shadow-lg overflow-hidden relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-2" style={{ backgroundColor: service.color }}></div>
            <div className="p-6">
              <service.icon className="w-12 h-12 mb-4" style={{ color: service.color }} />
              <h3 className="text-xl font-semibold mb-2 text-[#001830] dark:text-[#f0f8ff]">{service.title}</h3>
              <p className="text-[#003366] dark:text-[#b3d9ff]">{service.description}</p>
            </div>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-[#00a5b5] bg-opacity-90 flex items-center justify-center"
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
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
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

