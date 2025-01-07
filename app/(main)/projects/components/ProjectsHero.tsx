'use client'

import { motion } from 'framer-motion'
import { Droplet } from 'lucide-react'

export default function ProjectsHero() {
  return (
    <div className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#00a5b5] to-[#001830]">
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl md:text-2xl mb-8">Innovative Water Solutions in Action</p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Droplet className="w-16 h-16 mx-auto text-white opacity-80" />
          </motion.div>
        </motion.div>
      </div>

      {/* CSS for wave animation */}
      <style jsx>{`
        .waves {
          position: absolute;
          width: 100%;
          height: 100px;
          min-height: 100px;
          max-height: 150px;
          bottom: 0;
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
      `}</style>
    </div>
  )
}

