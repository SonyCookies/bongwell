import Hero from './components/Hero'
import MissionValues from './components/MissionValues'
import Team from './components/Team'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f8ff] dark:bg-[#001830] text-[#001830] dark:text-[#f0f8ff]">
      <Hero />
      <MissionValues />
      <Team />
    </div>
  )
}

