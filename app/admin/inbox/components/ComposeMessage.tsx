import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface ComposeMessageProps {
  onClose: () => void
}

export default function ComposeMessage({ onClose }: ComposeMessageProps) {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement send logic here
    console.log('Sending message:', { recipient, subject, message })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Compose Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
              To
            </label>
            <input
              id="recipient"
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient's email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a5b5]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a5b5]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a5b5]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00a5b5] text-white rounded-md hover:bg-[#008999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

