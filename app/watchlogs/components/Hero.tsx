"use client";
import { TextReveal } from "@/components/common/animation/TextReveal";
import { WaveBackground } from "@/components/common/animation/WaveBackground";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
      <WaveBackground />
      <BackgroundRippleEffect className="-z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative common-layout"
        >
          <div className="mx-auto max-w-4xl text-center py-20 px-6">
            <TextReveal
              text="Library & Watchlist"
              className="heading-display"
            />
            <motion.p variants={slideUp} className="mt-10 text-body text-xl md:text-2xl max-w-2xl mx-auto text-[var(--color-text-main)]/70 leading-relaxed">
              A curated collection of stories that have shaped my perspective.
              From epic sagas to insightful non-fiction, this is where I track
              my journey through literature and cinema.
            </motion.p>
          </div>
        </motion.div>
      </BackgroundRippleEffect>
    </div>
  );
};

export default Hero;
