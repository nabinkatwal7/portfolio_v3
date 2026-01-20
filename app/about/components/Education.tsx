"use client";
import { BlueprintBackground } from "@/components/common/animation/BlueprintBackground";
import { scaleIn, slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const features = [
  {
    name: "Deerwalk Institute of Technology",
    description:
      "Bachelors in Science, Computer Science and Information Technology. (2018-2022)",
    href: "https://deerwalk.edu.np/DWIT/",
  },
  {
    name: "Sainik Awasiya Mahavidyalaya. Bhaktapur, Nepal",
    description: "Higher Secondary School. (2016-2018)",
    href: "https://bsamv.edu.np/",
  },
  {
    name: "Peace Zone RHSS, Sunsari, Nepal",
    description: "Secondary School.",
    href: "https://www.facebook.com/peacezoneschool/",
  },
];

const Education = () => {
  return (
    <div className="relative overflow-hidden">
      <BlueprintBackground />
      <div className="common-layout max-w-[1350px] py-24">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto px-6 lg:px-8"
        >
          <motion.div variants={slideUp} className="mx-auto max-w-2xl lg:text-center flex flex-col items-center mb-16">
            <p className="text-label mb-2 opacity-50 uppercase tracking-[0.2em]">My Background</p>
            <h2 className="heading-section text-4xl md:text-5xl">Educational Summary</h2>
          </motion.div>

          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.dl
              variants={staggerContainer}
              className="grid max-w-xl grid-cols-1 gap-y-12 lg:max-w-none lg:grid-cols-3 gap-x-12"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  variants={scaleIn}
                  whileHover="hover"
                  className="group flex flex-col p-10 rounded-2xl bg-[var(--color-primary)]/5 backdrop-blur-md border border-[var(--color-primary)]/10 hover:shadow-2xl transition-all duration-500 hover:border-[var(--color-primary)]/30"
                >
                  <dt className="heading-card mb-6 min-h-[3rem] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {feature.name}
                  </dt>
                  <dd className="flex flex-auto flex-col">
                    <p className="text-body text-lg text-[var(--color-text-main)]/70 flex-auto leading-relaxed">{feature.description}</p>
                    <p className="mt-8">
                      <Link
                        target="_blank"
                        href={feature.href}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-all active:scale-95"
                      >
                        Visit Institution <HiArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </p>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
