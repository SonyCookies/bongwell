export default function RecentActivity() {
  const activities = [
    { id: 1, description: 'New user registered', time: '2 hours ago' },
    { id: 2, description: 'Project "Clean Water Initiative" updated', time: '4 hours ago' },
    { id: 3, description: 'New water pump installed in Project #1234', time: '1 day ago' },
    { id: 4, description: 'Monthly report generated', time: '2 days ago' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">{activity.description}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

