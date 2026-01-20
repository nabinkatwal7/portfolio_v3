"use client";

import { motion } from "framer-motion";

export function ConstellationBackground() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stars */}
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r="3"
            fill="currentColor"
            className="text-[var(--color-primary)]"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Connecting lines */}
        {stars.slice(0, 15).map((star, i) => {
          const next = stars[(i + 1) % 15];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${star.x}%`}
              y1={`${star.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-[var(--color-primary)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
