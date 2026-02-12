"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MultiStepLoader = ({
  loading,
  onFinished,
}: {
  loading: boolean;
  onFinished?: () => void;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const duration = 1000;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinished?.(), 800);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [loading, onFinished]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: progress === 100 ? "-100%" : 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden"
        >
          <div className="relative flex items-center justify-center scale-90 md:scale-100">
            {/* Rotating Atmosphere - Optimized for both modes */}
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute w-[400px] h-[400px] border border-[var(--color-primary)]/20 rounded-full border-t-[var(--color-primary)]/60"
            />
            <motion.div
               animate={{ rotate: -360 }}
               transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
               className="absolute w-[450px] h-[450px] border border-[var(--color-primary)]/15 rounded-full border-b-[var(--color-primary)]/40 shadow-[0_0_80px_rgba(var(--color-primary),0.05)]"
            />

            {/* Central Animated Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative z-10 flex flex-col gap-12 items-center justify-center p-16 rounded-[3rem] bg-background border border-[var(--color-primary)]/25 shadow-2xl backdrop-blur-2xl max-w-sm overflow-hidden"
            >
              {/* Vertical technical scanning effect - Higher contrast for Light Mode */}
              <motion.div
                animate={{ y: ["-100%", "400%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[var(--color-primary)]/25 to-transparent pointer-events-none"
              />

              <div className="flex flex-col items-center justify-center relative">
                <div className="flex items-baseline justify-center relative">
                    <span className="heading-display text-[9rem] font-black tracking-tighter leading-none text-[var(--color-text-main)]">
                        {Math.round(progress)}
                    </span>
                    <span className="text-4xl font-bold text-[var(--color-primary)] ml-2 mb-4 leading-none">
                        %
                    </span>
                </div>
              </div>

              {/* Progress Detail */}
              <div className="w-72 h-0.5 bg-[var(--color-primary)]/20 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="h-full bg-[var(--color-primary)] shadow-[0_0_30px_var(--color-primary)]"
                />
              </div>

              {/* Sequential Indicators */}
              <div className="flex justify-between w-full px-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                        scale: progress >= (i * 25) ? [1, 1.5, 1] : 1,
                        opacity: progress >= (i * 25) ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-2 h-2 rounded-full bg-[var(--color-primary)]"
                    style={{
                        opacity: progress >= (i * 25) ? 1 : 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Powerful Ambient Glows - Boosted for light mode presence */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-[var(--color-primary)]/25 blur-[150px] rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
