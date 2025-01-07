import { Bell, User } from 'lucide-react'
import { useFirebase } from '@/app/hooks/useFirebase'

export default function AdminHeader() {
  const { auth } = useFirebase()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome, Admin</h2>
            <p className="text-gray-600 dark:text-gray-300">{auth.currentUser?.email}</p>
          </div>
          <div className="flex items-center">
            <button className="text-gray-500 dark:text-gray-300 hover:text-[#00a5b5] mr-4">
              <Bell size={24} />
            </button>
            <button className="text-gray-500 dark:text-gray-300 hover:text-[#00a5b5]">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

