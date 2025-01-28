import { motion } from 'framer-motion'
import { X, User, Mail, MapPin, MessageSquare, Calendar } from 'lucide-react'

interface Submission {
  id: string
  name: string
  email: string
  address: string
  message: string
  date: string
}

interface ViewSubmissionProps {
  submission: Submission
  onClose: () => void
}

export default function ViewSubmission({ submission, onClose }: ViewSubmissionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed -mt-10 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Submission Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Name:</span>
            <span>{submission.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Email:</span>
            <span>{submission.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Address:</span>
            <span>{submission.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Date:</span>
            <span>{submission.date}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Message:</span>
            </div>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{submission.message}</p>
          </div>
        </div>
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00a5b5] text-white rounded-md hover:bg-[#008999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00a5b5]"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  )
}

