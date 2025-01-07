import { Users, FileText, Droplet } from 'lucide-react'

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <Users className="h-12 w-12 text-[#00a5b5]" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Total Users</h3>
            <p className="text-3xl font-bold text-[#00a5b5]">1,234</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <FileText className="h-12 w-12 text-[#00a5b5]" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Active Projects</h3>
            <p className="text-3xl font-bold text-[#00a5b5]">42</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <Droplet className="h-12 w-12 text-[#00a5b5]" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Water Saved (Gal)</h3>
            <p className="text-3xl font-bold text-[#00a5b5]">1.2M</p>
          </div>
        </div>
      </div>
    </div>
  )
}

