"use client";

import Link from "next/link";
import Image from "next/image";
import { GlassWaterIcon as WaterIcon, Droplets } from 'lucide-react';
import { motion } from "framer-motion";

export default function HomeClient() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#f0f8ff] dark:bg-[#001830] transition-colors duration-300">
      {/* Water-like background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#e6f3ff] dark:bg-[#002040] opacity-30"></div>
      </div>

      {/* Splash background in top right */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 z-0 opacity-20 transform translate-x-1/3 -translate-y-1/3">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#00a5b5"
            d="M39.9,-65.7C48.4,-57.4,49.8,-41.1,55.5,-27.1C61.1,-13.1,71,-1.4,71.6,11.1C72.2,23.6,63.5,36.9,52.4,46.5C41.3,56.1,27.8,62,13.3,67.3C-1.2,72.5,-16.7,77.1,-31.1,74.3C-45.5,71.5,-58.8,61.3,-67.6,47.9C-76.4,34.4,-80.7,17.7,-79.9,1.5C-79,-14.8,-73,-29.5,-63.3,-40.1C-53.6,-50.7,-40.2,-57.1,-27.8,-62.8C-15.4,-68.5,-3.9,-73.5,7.4,-72.9C18.6,-72.3,31.4,-74,39.9,-65.7Z"
            transform="translate(200 200) scale(2)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="min-h-[90vh] w-full flex flex-col justify-center relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-[#001830] dark:text-[#f0f8ff] text-center md:text-left order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  DISCOVER CLEAN WATER SOLUTIONS WITH{" "}
                  <span className="text-[#00a5b5]">BONGWELL</span>
                </h1>
                <p className="text-[#003366] dark:text-[#b3d9ff] text-base sm:text-lg mb-8 max-w-lg mx-auto md:mx-0">
                  Expert well drilling and water pump installation services.
                  Bringing reliable water sources to communities with
                  professional expertise.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                  <Link
                    href="/services"
                    className="bg-[#00a5b5] hover:bg-[#008999] text-white px-6 w-fit sm:px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center group"
                  >
                    <WaterIcon className="mr-2 group-hover:animate-bounce" />
                    OUR SERVICES
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-[#e6f3ff] dark:bg-[#003366] hover:bg-[#d1e9ff] dark:hover:bg-[#004080] text-[#003366] dark:text-[#f0f8ff] px-6 w-fit sm:px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center group"
                  >
                    <Droplets className="mr-2 group-hover:animate-bounce" />
                    GET QUOTE
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Logo Animation */}
            <div className="relative mt-6 md:mt-0 flex justify-center items-center order-1 md:order-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-[#00a5b5] rounded-full opacity-20"></div>
                <Image
                  src="/bongwell-solutions-logo-full.svg"
                  alt="BongWell Solutions Logo"
                  layout="fill"
                  objectFit="contain"
                  className="relative z-10"
                  priority
                />
                {/* Animated Rings */}
                <div className="absolute inset-0 z-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 border-2 border-[#00a5b5] rounded-full"
                      style={{
                        boxShadow: `0 0 15px rgba(0, 165, 181, ${0.2 - i * 0.03})`,
                        filter: `blur(${i * 0.8}px)`,
                      }}
                      initial={{ scale: 1, opacity: 0, z: 0 }}
                      animate={{
                        scale: [1, 1 + (i + 1) * 0.3],
                        opacity: [0.6, 0],
                        z: [0, (i + 1) * 15],
                      }}
                      transition={{
                        duration: 4 + i * 0.8,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave Shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 40"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0, 165, 181, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(0, 165, 181, 0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(0, 165, 181, 0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(0, 165, 181, 0.1)"
            />
          </g>
        </svg>
      </div>

      <style jsx>{`
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
        .waves {
          position: absolute;
          width: 100%;
          height: 300px;
          bottom: 0;
          min-height: 150px;
          max-height: 200px;
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5)
            infinite;
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
        .relative {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

