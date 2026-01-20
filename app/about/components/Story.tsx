"use client";
import { slideInLeft, slideInRight, slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const Story = () => {
  return (
    <div className="relative">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-3xl px-6 py-24 text-center flex flex-col items-center"
      >
        <motion.p variants={slideUp} className="text-label mb-4 opacity-50 uppercase tracking-[0.2em]">
          The Context
        </motion.p>
        <motion.h2 variants={slideInLeft} className="heading-section text-4xl md:text-5xl">
          The Journey of a Developer <span className="text-[var(--color-primary)]">🚀</span>
        </motion.h2>

        <div className="mt-16 text-body text-left space-y-12">
          <motion.p variants={slideInRight} className="text-lg md:text-xl leading-relaxed text-[var(--color-text-main)]/80">
            You know me, right? By day, I&apos;m crafting sleek,
            high-performance Next.js, React, and Tailwind CSS
            applications—sleek enough to make your grandmother think it&apos;s
            magic. By night? I&apos;m all about Go, TypeScript, and Rust.
          </motion.p>

          <motion.div variants={slideUp} className="max-w-3xl text-body text-left">
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-main)]/80">
              Code isn&apos;t just code for me—it&apos;s my playground, my
              canvas. I take the complex, the difficult, and turn it into
              something elegant, user-friendly, and easy to understand.
            </p>

            <ul role="list" className="mt-16 space-y-12">
              <motion.li variants={slideUp} className="flex gap-x-6 group">
                <div className="flex-none h-2 w-2 rounded-full bg-[var(--color-primary)] mt-3 group-hover:scale-150 transition-transform duration-300" />
                <span className="text-body text-lg md:text-xl font-medium leading-relaxed">
                  <strong className="text-[var(--color-primary)] block mb-1">Frontend Mastery.</strong>{" "}
                  I don&apos;t just build UIs—I craft experiences that are so
                  good, you&apos;ll think they were made by a team of wizards.
                </span>
              </motion.li>

              <motion.li variants={slideUp} className="flex gap-x-6 group">
                <div className="flex-none h-2 w-2 rounded-full bg-[var(--color-primary)] mt-3 group-hover:scale-150 transition-transform duration-300" />
                <span className="text-body text-lg md:text-xl font-medium leading-relaxed">
                  <strong className="text-[var(--color-primary)] block mb-1">
                    Performance-First Engineering.
                  </strong>{" "}
                  Whether it&apos;s designing a rock-solid backend or managing
                  thousands of requests, I keep things clean, efficient, and blazing fast.
                </span>
              </motion.li>
            </ul>

            <motion.div variants={slideUp} className="mt-24 pt-12 border-t border-[var(--color-primary)]/10">
              <h2 className="heading-card text-3xl mb-6">
                Let’s Make Something Epic
              </h2>
              <p className="text-body text-lg md:text-xl text-[var(--color-text-main)]/70">
                So, you want clean code? You want things done with precision?
                Well, I&apos;m your guy. Let&apos;s work together
                and build something amazing.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Story;
