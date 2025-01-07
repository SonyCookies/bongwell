"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prevProgress + 30, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    controls.start({ width: `${progress}%` });
  }, [progress, controls]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f8ff] dark:bg-[#001830]">
      <div className="relative text-6xl md:text-8xl font-bold">
        <span className="text-[#003366] dark:text-[#b3d9ff]">BONGWELL</span>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="h-full bg-[#00a5b5]"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1.2, ease: "linear" }}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            BONGWELL
          </motion.div>
        </div>
      </div>
    </div>
  );
}
