'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Home, FolderPlus, Folders, Inbox, LogOut } from 'lucide-react'
import { useFirebase } from '@/app/hooks/useFirebase'
import { useRouter } from 'next/navigation'

const menuItems = [
  { icon: Home, label: 'Overview', href: '/admin/dashboard' },
  { icon: Folders, label: 'Projects', href: '/admin/projects' },
  { icon: Inbox, label: 'Inbox', href: '/admin/inbox' },
]

export default function AdminSidebar() {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { auth } = useFirebase()
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  const DesktopSidebar = () => (
    <div className="fixed left-0 top-0 h-screen z-50 flex">
      <div className="w-16 h-full bg-white border-r flex flex-col items-center py-4">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/bongwell-solutions-logo.svg"
            alt="BongWell Solutions Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full">
          <ul className="flex flex-col items-center gap-2">
            {menuItems.map((item) => (
              <li key={item.label} className="w-full px-3">
                <Link href={item.href}>
                  <motion.div
                    className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors duration-200 group relative ${
                      pathname === item.href
                        ? 'bg-[#00a5b5] text-white'
                        : 'text-gray-600 hover:bg-[#e6f7f8] hover:text-[#00a5b5]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />

                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-white border rounded text-xs text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  </motion.div>
                </Link>
              </li>
            ))}

            {/* Add Project Button */}
            <li className="w-full px-3">
              <Link href="/admin/add-project">
                <motion.div
                  className="w-full flex items-center justify-center p-3 rounded-lg text-gray-600 hover:bg-[#e6f7f8] hover:text-[#00a5b5] transition-colors duration-200 group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FolderPlus className="w-5 h-5" />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-white border rounded text-xs text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg whitespace-nowrap z-50">
                    Add Project
                  </div>
                </motion.div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="w-full px-3 mb-4">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 rounded-lg text-gray-600 hover:bg-[#e6f7f8] hover:text-[#00a5b5] transition-colors duration-200 group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />

            <div className="absolute left-full ml-2 px-2 py-1 bg-white border rounded text-xs text-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg whitespace-nowrap z-50">
              Logout
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )

  const MobileNav = () => {
    const activeIndex = menuItems.findIndex(item => item.href === pathname)

    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="relative h-16 bg-white transition-colors duration-300">
          {/* Curved cutout overlay */}
          <div
            className="absolute inset-0 bg-[#00a5b5]"
            style={{
              clipPath: `path('M 0,0 
                     H ${activeIndex * 25}% 
                     a 40 40 0 0 1 40 40 
                     h 20 
                     a 40 40 0 0 0 40 -40 
                     H 100% 
                     V 100% 
                     H 0 
                     Z')`,
            }}
          />

          {/* Navigation items */}
          <div className="relative h-full flex items-center justify-around px-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-5 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors duration-300"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    >
                      <Icon className="h-6 w-6 text-[#00a5b5]" />
                    </motion.div>
                  ) : (
                    <Icon className="h-6 w-6 text-white" />
                  )}
                  <span className={`text-xs mt-1 ${
                    isActive
                      ? 'text-white font-semibold mt-6'
                      : 'text-white'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
            <Link href="/admin/add-project" className="flex flex-col items-center">
              <FolderPlus className="h-6 w-6 text-white" />
              <span className="text-xs mt-1 text-white">Add Project</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isMobile ? <MobileNav /> : <DesktopSidebar />}
    </>
  )
}

