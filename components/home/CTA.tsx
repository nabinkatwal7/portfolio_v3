"use client";
import { DotsBackground } from "@/components/common/animation/DotsBackground";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="relative common-layout py-24 overflow-hidden">
      <DotsBackground />
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.h2
          variants={slideUp}
          className="heading-section text-4xl md:text-5xl"
        >
          Ready to Build Something{" "}
          <span className="text-[var(--color-primary)]">Extraordinary?</span>
        </motion.h2>
        <motion.p
          variants={slideUp}
          className="mx-auto mt-8 max-w-xl text-body text-lg text-[var(--color-text-main)]/70"
        >
          Whether you have a fully-fledged idea or just a spark of inspiration,
          I&apos;m here to help you bring it to life. Let&apos;s collaborate and
          create something that truly stands out.
        </motion.p>
        <motion.div
          variants={slideUp}
          className="mt-12 flex items-center justify-center gap-x-8"
        >
          <Link
            href="mailto:mediocampistaa@gmail.com"
            className="rounded-full bg-[var(--color-primary)] px-8 py-4 text-base font-bold shadow-xl hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-[var(--primary-foreground)] transition-all hover:scale-105 active:scale-95"
          >
            Get in Touch
          </Link>
          <Link
            href="/about"
            className="text-base font-bold text-[var(--color-primary)] hover:underline underline-offset-8 transition-all"
          >
            Learn more <span aria-hidden="true" className="ml-1"></span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CTA;
