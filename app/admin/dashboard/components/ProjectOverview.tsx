export default function ProjectOverview() {
  const projects = [
    { id: 1, name: 'Clean Water Initiative', progress: 75 },
    { id: 2, name: 'Sustainable Irrigation', progress: 40 },
    { id: 3, name: 'Water Conservation Program', progress: 90 },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Project Overview</h3>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700 dark:text-gray-300">{project.name}</span>
              <span className="text-sm font-semibold text-[#00a5b5]">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#00a5b5] h-2.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

