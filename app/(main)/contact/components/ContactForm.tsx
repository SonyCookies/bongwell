'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Send, User, Mail, MapPin, MessageSquare } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/app/lib/firebase-config'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  message: string
}

interface Notification {
  type: 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const saveSubmission = async (data: FormData) => {
    try {
      const docRef = await addDoc(collection(db, 'submissions'), {
        ...data,
        date: serverTimestamp(),
        read: false,
        contacted: false,
        notes: ''
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding document: ', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const submissionId = await saveSubmission(formData)
      console.log('Submission saved with ID: ', submissionId)
      setNotification({
        type: 'success',
        message: 'Your message has been sent successfully.'
      })
      setFormData({ name: '', email: '', phone: '', address: '', message: '' })
    } catch (error) {
      console.error('Error submitting form: ', error)
      setNotification({
        type: 'error',
        message: 'There was a problem sending your message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#002040] rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#00a5b5]">Get in Touch</h2>
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notification.message}
        </div>
      )}
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
          <Phone className="absolute top-3 left-3 text-gray-400" size={20} />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Your Phone Number"
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
          disabled={isSubmitting}
          className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#00a5b5] hover:bg-[#008999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

