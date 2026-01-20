"use client";

import { motion } from "framer-motion";

export function ParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill="currentColor"
            className="text-[var(--color-primary)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connecting lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          {particles.slice(0, 15).map((particle, i) => {
            const next = particles[(i + 1) % 15];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${particle.x}%`}
                y1={`${particle.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-[var(--color-primary)]"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: i * 0.1 }}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
}
