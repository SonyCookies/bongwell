'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, FolderOpen, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Desktop Navigation
  const DesktopNav = () => (
    <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-50' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/bongwell-solutions-logo.svg"
              alt="BongWell Solutions Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className={`text-xl font-bold ${
              pathname === '/home' ? 'text-[#001830]' : 'text-white'
            }`}>BongWell Solutions</span>
          </Link>
          <div className="flex gap-8 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    isActive 
                      ? 'text-[#5af1ff]' 
                      : pathname === '/home'
                        ? 'text-[#001830] hover:text-[#00a5b5]'
                        : 'text-white hover:text-[#00a5b5]'
                  } font-medium transition-colors duration-200 px-2 py-1 rounded`}
                >
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .text-[#001830], .text-[#00a5b5], .text-white {
          text-shadow: ${pathname === '/home' ? '0 0 10px rgba(255, 255, 255, 0.7)' : 'none'};
        }
      `}</style>
    </header>
  )

  // Mobile Navigation
  const MobileNav = () => {
    const activeIndex = navItems.findIndex(item => item.href === pathname)

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <Link 
          href="/" 
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg"
        >
          <Image
            src="/bongwell-solutions-logo.svg"
            alt="BongWell Solutions Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
        <div className="relative h-20 bg-white transition-colors duration-300">
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
            {navItems.map((item, index) => {
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
                      className="absolute -top-5 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors duration-300"
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
                      ? 'text-white font-semibold mt-8' 
                      : 'text-white'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

