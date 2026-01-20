"use client";
import { slideInLeft, slideInRight, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className="common-layout max-w-[1350px]"
    >
      <div className="mx-auto text-center max-w-4xl">
        <motion.h2 variants={slideInLeft} className="heading-display">
          Pixels, Code & <span className="text-[var(--color-primary)]">Magic</span>
        </motion.h2>
        <motion.p variants={slideInRight} className="mt-8 text-body text-lg md:text-xl text-[var(--color-text-main)]/70">
          I build fast, beautiful, and user-friendly web apps with Next.js,
          React, and Tailwind—because the internet deserves better. When
          I&apos;m not crafting sleek interfaces, I&apos;m off exploring Go,
          TypeScript, and Rust. Let&apos;s build something legendary!
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Description;
