"use client";
import { staggerContainer, textReveal } from "@/utils/motion-variants";
import { motion } from "framer-motion";

export const TextReveal = ({
  text,
  className = "",
  as: Component = "h1",
}: {
  text: string;
  className?: string;

  as?: any;
}) => {
  const words = text.split(" ");

  return (
    <Component
      className={`${className} overflow-hidden flex flex-wrap justify-center`}
    >
      <motion.span
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-wrap justify-center gap-[0.2em]"
      >
        {words.map((word, i) => (
          <span key={i} className="relative overflow-hidden inline-block">
            <motion.span variants={textReveal} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
