'use client'

import { motion } from 'framer-motion'
import { PenToolIcon as Tool, Users, Lightbulb, Recycle, Clock, ThumbsUp } from 'lucide-react'

const reasons = [
  {
    icon: Tool,
    title: "Extensive Hands-On Experience",
    description: "Years of practical knowledge in well drilling and water systems."
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "We treat every project with individual attention and care."
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "Creative approaches to solve complex water challenges."
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Practices",
    description: "Committed to sustainable and environmentally conscious methods."
  },
  {
    icon: Clock,
    title: "Timely Project Completion",
    description: "Efficient work to minimize disruption to your property."
  },
  {
    icon: ThumbsUp,
    title: "Satisfied Customers",
    description: "A track record of happy clients and successful projects."
  }
]

export default function WhyChooseUs() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#e6f3ff] dark:bg-[#002040]">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center text-[#00a5b5]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose BongWell Solutions?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-[#001830] rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <reason.icon className="w-12 h-12 text-[#00a5b5] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#001830] dark:text-[#f0f8ff]">{reason.title}</h3>
            <p className="text-[#4a5568] dark:text-[#b3d9ff]">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

