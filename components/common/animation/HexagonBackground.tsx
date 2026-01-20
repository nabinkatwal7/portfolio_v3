"use client";

import { motion } from "framer-motion";

export function HexagonBackground() {
  const hexagons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i % 4) * 25 + 10,
    y: Math.floor(i / 4) * 30 + 10,
  }));

  const hexagonPath = "M 0,-20 L 17.32,-10 L 17.32,10 L 0,20 L -17.32,10 L -17.32,-10 Z";

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-15">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hexagons.map((hex) => (
          <motion.path
            key={hex.id}
            d={hexagonPath}
            transform={`translate(${hex.x}%, ${hex.y}%)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--color-primary)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              delay: hex.id * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
