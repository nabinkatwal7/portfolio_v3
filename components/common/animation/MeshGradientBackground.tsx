"use client";

import { motion } from "framer-motion";

export function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mesh-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="mesh-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <motion.ellipse
          cx="20%"
          cy="30%"
          rx="30%"
          ry="40%"
          fill="url(#mesh-grad-1)"
          animate={{ cx: ["20%", "25%", "20%"], cy: ["30%", "35%", "30%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.ellipse
          cx="80%"
          cy="70%"
          rx="35%"
          ry="45%"
          fill="url(#mesh-grad-2)"
          animate={{ cx: ["80%", "75%", "80%"], cy: ["70%", "65%", "70%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
