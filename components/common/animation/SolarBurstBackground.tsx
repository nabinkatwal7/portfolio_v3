"use client";

import { motion } from "framer-motion";

export function SolarBurstBackground() {
  const rays = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    rotation: (i * 360) / 28,
    length: 520 + (i % 4) * 30,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="burst" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
            <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#burst)" />

        {rays.map((ray) => (
          <motion.line
            key={ray.id}
            x1="50%"
            y1="50%"
            x2="50%"
            y2={`calc(50% - ${ray.length}px)`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-[var(--color-primary)]/30"
            style={{ transformOrigin: "50% 50%", rotate: `${ray.rotation}deg` }}
            initial={{ scaleY: 0.4, opacity: 0 }}
            animate={{ scaleY: [0.4, 1, 0.6, 1], opacity: [0.1, 0.4, 0.15, 0.35] }}
            transition={{ duration: 12 + ray.id * 0.05, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.circle
          cx="50%"
          cy="50%"
          r="80"
          fill="url(#burst)"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--color-primary)]/40"
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: [0.8, 1.05, 0.9, 1], opacity: [0.2, 0.5, 0.3, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
