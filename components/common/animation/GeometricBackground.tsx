"use client";

import { motion } from "framer-motion";

export function GeometricBackground() {
  const shapes = [
    { type: "circle", cx: "10%", cy: "20%", r: 100 },
    { type: "circle", cx: "90%", cy: "80%", r: 150 },
    { type: "rect", x: "70%", y: "10%", width: 120, height: 120 },
    { type: "polygon", points: "15,30 30,10 45,30" },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated circles */}
        <motion.circle
          cx="10%"
          cy="20%"
          r="100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--color-primary)]/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.circle
          cx="90%"
          cy="80%"
          r="150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--color-primary)]/15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
        />

        {/* Rotating square */}
        <motion.rect
          x="70%"
          y="10%"
          width="120"
          height="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--color-primary)]/10"
          style={{ transformOrigin: "75% 15%" }}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1 },
          }}
        />

        {/* Floating triangles */}
        <motion.polygon
          points="100,200 150,100 200,200"
          fill="currentColor"
          className="text-[var(--color-primary)]/5"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [-10, 10, -10], opacity: 0.3 }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 },
          }}
        />

        <motion.polygon
          points="calc(100% - 150),300 calc(100% - 100),250 calc(100% - 50),300"
          fill="currentColor"
          className="text-[var(--color-primary)]/5"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [10, -10, 10], opacity: 0.3 }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1.2 },
          }}
        />
      </svg>
    </div>
  );
}
