'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import MessageList from './MessageList'

export default function InboxContent() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Contact Form Submissions</h2>
      </div>
      <div className="p-6 space-y-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a5b5]"
          />
          <button
            type="submit"
            className="p-2 bg-[#00a5b5] text-white rounded-lg hover:bg-[#008999] transition-colors duration-200"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
        <MessageList />
      </div>
    </div>
  )
}

