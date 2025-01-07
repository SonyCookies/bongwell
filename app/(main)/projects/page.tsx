'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectsHero from './components/ProjectsHero'
import ProjectList from './components/ProjectList'

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:from-[#001830] dark:to-[#002040]">
      <ProjectsHero />
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <ProjectList />
        </AnimatedSection>
      </div>
    </div>
  )
}

