"use client";
import TechComponent from "@/app/about/components/TechComponent";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { Code, Tools, Web } from "@/data/TechStack";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const TechStack = () => {
  return (
    <CommonWrapper className="common-layout flex flex-col justify-center max-w-[1350px] gap-8 relative">
      {/* Floating Water Effect */}
      <div className="absolute inset-0 bg-blue-900/50 blur-3xl opacity-40 rounded-2xl"></div>

      <div className="mx-auto px-4 md:px-8 flex justify-center flex-col gap-4 text-center lg:px-10">
        <p className="text-base/7 font-semibold text-indigo-400 text-center">
          My Tech Stack
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-pretty sm:text-5xl text-center">
          Building the Future, One Line of Code at a Time
        </h2>
        <p>
          Listen, a developer is only as good as their tools. You wouldn&apos;t
          trust a lawyer without a briefcase, and you sure as hell
          shouldn&apos;t trust a coder without a solid tech stack. From frontend
          wizardry with React and Tailwind to backend muscle with Go and Rust,
          I&apos;ve got the whole package. Need scalable apps? Boom—Next.js.
          Need slick animations? Framer Motion&apos;s got it covered. Need
          speed? Vite, baby. And let&apos;s not forget the essentials—Git,
          Docker, AWS—because even the best code needs a rock-solid foundation.
          So, if you&apos;re looking for top-tier tech, you just found it.
          Let&apos;s build something legendary.
        </p>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <p className="text-3xl font-semibold tracking-tight text-pretty text-center">
          Web Technologies
        </p>
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <motion.div
            className="-mx-6 grid grid-cols-2 gap-0.5 sm:mx-0 sm:rounded-2xl md:grid-cols-3 relative"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Web.map((item) => (
              <TechComponent
                key={item.name}
                name={item.name}
                image={item.image}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <p className="text-3xl font-semibold tracking-tight text-pretty text-center">
          Programming
        </p>
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <motion.div
            className="-mx-6 grid grid-cols-2 gap-0.5 sm:mx-0 sm:rounded-2xl md:grid-cols-3 relative"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Code.map((item) => (
              <TechComponent
                key={item.name}
                name={item.name}
                image={item.image}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <p className="text-3xl font-semibold tracking-tight text-pretty text-center">
          Tools
        </p>
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <motion.div
            className="-mx-6 grid grid-cols-2 gap-0.5 sm:mx-0 sm:rounded-2xl md:grid-cols-3 relative"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {Tools.map((item) => (
              <TechComponent
                key={item.name}
                name={item.name}
                image={item.image}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default TechStack;
