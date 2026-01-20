"use client";

import { motion } from "framer-motion";

export function RibbonBackground() {
  const ribbons = [
    { d: "M0 220 C 180 160 320 280 520 210 C 700 150 860 260 1100 200", duration: 14 },
    { d: "M0 140 C 200 80 340 180 520 140 C 740 90 880 160 1100 120", duration: 18 },
    { d: "M0 300 C 220 260 360 360 520 300 C 760 230 900 320 1100 260", duration: 16 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-60">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {ribbons.map((ribbon, index) => (
          <motion.path
            key={index}
            d={ribbon.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="120"
            className="text-[var(--color-primary)]/10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35, y: [-20, 20, -20] }}
            transition={{
              duration: ribbon.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          />
        ))}

        <motion.rect
          x="10%"
          y="20%"
          width="12%"
          height="8%"
          rx="20"
          ry="20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-[var(--color-primary)]/30"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.3, rotate: [0, 4, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
