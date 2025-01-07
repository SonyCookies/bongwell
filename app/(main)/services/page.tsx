'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ServicesHero from './components/ServicesHero'
import ServicesList from './components/ServicesList'
import WhyChooseUs from './components/WhyChooseUs'
import ContactCTA from './components/ContactCTA'

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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fff] dark:bg-[#001830] text-[#001830] dark:text-[#f0f8ff]">
      <ServicesHero />
      <AnimatedSection>
        <ServicesList />
      </AnimatedSection>
      <AnimatedSection>
        <WhyChooseUs />
      </AnimatedSection>
      <AnimatedSection>
        <ContactCTA />
      </AnimatedSection>
    </div>
  )
}

