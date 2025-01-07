import DashboardStats from '@/app/admin/dashboard/components/DashboardStats'
import RecentActivity from '@/app/admin/dashboard/components/RecentActivity'
import ProjectOverview from '@/app/admin/dashboard/components/ProjectOverview'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <ProjectOverview />
      </div>
    </div>
  )
}

