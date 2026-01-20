"use client";

import { motion } from "framer-motion";

export function RadialGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="radial-pulse" cx="50%" cy="50%" r="50%">
            <motion.stop
              offset="0%"
              stopColor="var(--color-primary)"
              stopOpacity="0.2"
              animate={{ stopOpacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="50%"
              stopColor="var(--color-primary)"
              stopOpacity="0.1"
              animate={{ stopOpacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          r="40%"
          fill="url(#radial-pulse)"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
