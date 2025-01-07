'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, MapPin, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', address: '', message: '' })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#002040] rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#00a5b5]">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div className="relative">
          <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Your Address"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute top-3 left-3 text-gray-400" size={20} />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Your Message"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a5b5] focus:border-transparent text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
          ></textarea>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#00a5b5] hover:bg-[#008999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5] transition-colors duration-200"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Message
        </motion.button>
      </form>
    </motion.div>
  )
}

