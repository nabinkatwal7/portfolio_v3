"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  const waves = [
    { path: "M-50 180 Q 220 80 520 180 T 1100 180", opacity: 0.18, duration: 18 },
    { path: "M-50 240 Q 200 140 520 240 T 1100 240", opacity: 0.14, duration: 22 },
    { path: "M-50 120 Q 240 40 520 120 T 1100 120", opacity: 0.12, duration: 26 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {waves.map((wave, index) => (
          <motion.path
            key={wave.path}
            d={wave.path}
            fill="none"
            stroke="url(#auroraGradient)"
            strokeWidth="220"
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: wave.opacity,
              pathLength: 1,
              y: [-30, 20, -20],
              x: [-10, 10, -5],
            }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.6,
            }}
          />
        ))}

        <motion.circle
          cx="15%"
          cy="25%"
          r="60"
          fill="url(#auroraGradient)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.05, 0.2, 0.05], scale: [0.8, 1.05, 0.95] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
