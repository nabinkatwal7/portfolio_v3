"use client";
import { GeometricBackground } from "@/components/common/animation/GeometricBackground";
import { TextReveal } from "@/components/common/animation/TextReveal";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

function Hero({
  title = "Digital Architect & Full-Stack Engineer",
  bio = "I build high-performance, scalable web applications with a focus on precision engineering and editorial design. Transforming complex technical challenges into seamless, user-centric digital experiences."
}: {
  title?: string;
  bio?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
      <GeometricBackground />
      <BackgroundRippleEffect className="-z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col max-sm:w-full max-w-[1350px] gap-8 justify-center items-center common-layout h-full"
        >
          <div className="flex flex-col gap-10 items-center w-full justify-center max-w-5xl px-6">
            <motion.div variants={slideUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 text-label backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
              </span>
              Available for new projects
            </motion.div>

            <TextReveal
              text={title}
              className="heading-display text-center leading-[1.1]"
            />

            <motion.p variants={slideUp} className="text-center text-body max-w-3xl text-[var(--color-text-main)]/60 text-xl md:text-2xl leading-relaxed">
              {bio}
            </motion.p>
          </div>
        </motion.div>
      </BackgroundRippleEffect>
    </div>
  );
}

export default Hero;
