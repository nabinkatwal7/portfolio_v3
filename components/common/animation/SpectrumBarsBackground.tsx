"use client";

import { motion } from "framer-motion";

export function SpectrumBarsBackground() {
  const bars = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: i * 4 + 2,
    height: 30 + (i % 5) * 8,
    delay: (i % 6) * 0.25,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {bars.map((bar) => (
          <motion.rect
            key={bar.id}
            x={`${bar.x}%`}
            y="20%"
            width="2%"
            height={`${bar.height}%`}
            rx="8"
            fill="currentColor"
            className="text-[var(--color-primary)]/35"
            initial={{ scaleY: 0.6, opacity: 0 }}
            animate={{ scaleY: [0.6, 1.2, 0.8, 1], opacity: [0.2, 0.6, 0.2, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: bar.delay }}
            style={{ transformOrigin: "50% 100%" }}
          />
        ))}

        <motion.rect
          x="30%"
          y="10%"
          width="40%"
          height="12%"
          rx="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[var(--color-primary)]/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
