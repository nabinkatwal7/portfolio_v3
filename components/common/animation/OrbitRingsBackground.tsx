"use client";

import { motion } from "framer-motion";

export function OrbitRingsBackground() {
  const rings = [
    { radius: 320, duration: 48, opacity: 0.08 },
    { radius: 260, duration: 36, opacity: 0.07 },
    { radius: 200, duration: 28, opacity: 0.06 },
    { radius: 140, duration: 20, opacity: 0.06 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="orbitGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="70%" stopColor="var(--color-primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#orbitGlow)" />

        {rings.map((ring, index) => (
          <motion.circle
            key={ring.radius}
            cx="50%"
            cy="50%"
            r={ring.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-[var(--color-primary)]"
            style={{ transformOrigin: "50% 50%" }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: ring.opacity }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.2,
            }}
          />
        ))}

        <motion.circle
          cx="50%"
          cy="50%"
          r="4"
          fill="currentColor"
          className="text-[var(--color-primary)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
