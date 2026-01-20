"use client";

import { motion } from "framer-motion";

export function DotsBackground() {
  const dots = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: (i % 10) * 10,
    y: Math.floor(i / 10) * 10,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r="2"
            fill="currentColor"
            className="text-[var(--color-primary)]"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 3,
              delay: (dot.id * 0.05) % 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
