"use client";
import { ParticleBackground } from "@/components/common/animation/ParticleBackground";
import { TextReveal } from "@/components/common/animation/TextReveal";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
      <ParticleBackground />
      <BackgroundRippleEffect className="-z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative common-layout"
        >
          <div className="mx-auto max-w-4xl text-center py-20 px-6">
              <motion.div variants={slideUp} className="flex justify-center mb-10">
                <div className="relative rounded-full px-6 py-2 text-label ring-1 ring-[var(--color-primary)]/20 hover:ring-[var(--color-primary)]/50 transition-all bg-[var(--color-primary)]/5 backdrop-blur-md">
                  Coding, creating, and occasionally debugging.
                </div>
              </motion.div>

              <TextReveal
                text="Crafting Code & Building Dreams"
                className="heading-display"
              />

              <motion.p variants={slideUp} className="mt-10 text-body text-xl md:text-2xl max-w-2xl mx-auto text-[var(--color-text-main)]/70 leading-relaxed">
                Web developer by day, tech explorer by night. I bring ideas to
                life with Next.js, React, and Tailwind, creating sleek,
                high-performance apps that don&apos;t just work—they impress.
              </motion.p>
          </div>
        </motion.div>
      </BackgroundRippleEffect>
    </div>
  );
};

export default Hero;
