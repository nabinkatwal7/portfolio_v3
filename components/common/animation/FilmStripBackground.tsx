"use client";

import { motion } from "framer-motion";

export function FilmStripBackground() {
  const frames = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <motion.g
          animate={{ x: [0, -200, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Top Film Strip */}
          <rect x="-200" y="50" width="1400" height="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" />
          <rect x="-200" y="50" width="1400" height="150" fill="none" stroke="currentColor" strokeWidth="4" />

          {/* Bottom Film Strip */}
          <rect x="-200" y="800" width="1400" height="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 10" />
          <rect x="-200" y="800" width="1400" height="150" fill="none" stroke="currentColor" strokeWidth="4" />

          {/* Frame dividers */}
          {frames.map((f) => (
            <line
              key={f}
              x1={f * 100 - 200}
              y1="50"
              x2={f * 100 - 200}
              y2="200"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
          {frames.map((f) => (
            <line
              key={`bottom-${f}`}
              x1={f * 100 - 200}
              y1="800"
              x2={f * 100 - 200}
              y2="950"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </motion.g>

        {/* Floating Play Icons */}
        {[1, 2, 3].map((i) => (
          <motion.polygon
            key={i}
            points="0,0 20,10 0,20"
            fill="currentColor"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              rotate: Math.random() * 360,
              opacity: 0.2
            }}
            animate={{
              y: [null, Math.random() * 1000],
              rotate: [null, Math.random() * 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
