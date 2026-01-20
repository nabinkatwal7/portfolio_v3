"use client";

import { motion } from "framer-motion";

export function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Wave 1 */}
        <motion.path
          d="M0,50 Q250,20 500,50 T1000,50 T1500,50 T2000,50 V100 H0 Z"
          fill="url(#wave-gradient)"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Wave 2 */}
        <motion.path
          d="M0,65 Q250,35 500,65 T1000,65 T1500,65 T2000,65 V100 H0 Z"
          fill="url(#wave-gradient)"
          initial={{ x: 0 }}
          animate={{ x: -1000 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          opacity={0.6}
        />

        {/* Wave 3 */}
        <motion.path
          d="M0,80 Q250,50 500,80 T1000,80 T1500,80 T2000,80 V100 H0 Z"
          fill="url(#wave-gradient)"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          opacity={0.3}
        />
      </svg>
    </div>
  );
}
