"use client";
import { scaleInBounce, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const stats = [
  { id: 1, name: "Projects", value: "20+" },
  { id: 2, name: "Hours of code", value: "3,840+" },
  { id: 3, name: "Languages", value: "7" },
];

const Statistics = () => {
  return (
    <div className="common-layout">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.dl
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={scaleInBounce}
              whileHover="hover"
              className="group mx-auto flex max-w-xs flex-col gap-y-4 p-10 rounded-2xl bg-[var(--color-primary)]/5 backdrop-blur-md border border-[var(--color-primary)]/10 shadow-sm w-full transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-2xl"
            >
              <dt className="text-label text-center opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">{stat.name}</dt>
              <dd className="order-first heading-card text-center text-[var(--color-primary)] text-5xl font-bold tracking-tight">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </div>
  );
};

export default Statistics;
