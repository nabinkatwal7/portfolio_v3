"use client";
import { GridBackground } from "@/components/common/animation/GridBackground";
import { TextReveal } from "@/components/common/animation/TextReveal";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
      <GridBackground />
      <BackgroundRippleEffect className="-z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative common-layout"
        >
          <div className="mx-auto max-w-4xl text-center py-20 px-6">
            <TextReveal
              text="Crafted with Code Built to Last"
              className="heading-display"
            />
            <motion.p variants={slideUp} className="mt-10 text-body text-xl md:text-2xl max-w-2xl mx-auto text-[var(--color-text-main)]/70 leading-relaxed">
              Every project tells a story—of precision, performance, and a touch
              of ingenuity. From intuitive interfaces to scalable backends, I
              build with purpose, ensuring seamless experiences and lasting
              impact.
            </motion.p>
          </div>
        </motion.div>
      </BackgroundRippleEffect>
    </div>
  );
};

export default Hero;
