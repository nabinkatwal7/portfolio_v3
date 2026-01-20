"use client";

import { motion } from "framer-motion";

export function CircuitBoardBackground() {
  const traces = [
    { x1: "5%", y1: "10%", x2: "35%", y2: "30%" },
    { x1: "20%", y1: "60%", x2: "50%", y2: "30%" },
    { x1: "60%", y1: "70%", x2: "85%", y2: "40%" },
    { x1: "40%", y1: "85%", x2: "70%", y2: "55%" },
  ];

  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    cx: `${8 + i * 7}%`,
    cy: `${15 + (i % 6) * 12}%`,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#circuitGlow)" />

        {traces.map((trace, index) => (
          <motion.line
            key={index}
            {...trace}
            stroke="currentColor"
            strokeWidth="1"
            className="text-[var(--color-primary)]/40"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 6 + index, repeat: Infinity, repeatDelay: 4 }}
          />
        ))}

        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="currentColor"
            className="text-[var(--color-primary)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 5 + node.id * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
