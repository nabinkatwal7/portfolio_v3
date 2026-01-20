"use client";

import { motion } from "framer-motion";

export function BlueprintBackground() {
  const lines = Array.from({ length: 12 }, (_, i) => i * 10);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueprintFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#blueprintFade)" />

        {lines.map((value) => (
          <g key={value}>
            <motion.line
              x1={`${value}%`}
              y1="0"
              x2={`${value}%`}
              y2="100%"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[var(--color-primary)]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, delay: value * 0.05 }}
            />
            <motion.line
              x1="0"
              y1={`${value}%`}
              x2="100%"
              y2={`${value}%`}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[var(--color-primary)]/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, delay: value * 0.04 }}
            />
          </g>
        ))}

        {lines.slice(0, 6).map((value) => (
          <motion.circle
            key={`node-${value}`}
            cx={`${value * 1.6 + 5}%`}
            cy={`${value * 1.2 + 10}%`}
            r="2.4"
            fill="currentColor"
            className="text-[var(--color-primary)]/70"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 5 + value * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
