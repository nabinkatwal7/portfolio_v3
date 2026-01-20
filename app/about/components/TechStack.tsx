"use client";
import TechComponent from "@/app/about/components/TechComponent";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { Code, Tools, Web } from "@/data/TechStack";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const TechStack = () => {
    // Select specific impactful web technologies for the orbit to prevent overcrowding
    // We want Next.js (index 14), React (20), Tailwind (28), TypeScript (31), Node (15), etc.
    // Let's filter by name for better control, or just take a curated slice.

    // Curated list for the outer orbit
    const orbitWeb = Web.filter(item =>
        ["Next JS", "React", "TailwindCSS", "TypeScript", "Node JS", "Framer", "Vite", "Docker", "AWS", "Three js"].includes(item.name)
    );
    // If not enough matches, fallback to slice
    const finalOrbitWeb = orbitWeb.length > 5 ? orbitWeb : Web.slice(0, 10);

  return (
    <CommonWrapper className="common-layout flex flex-col justify-center max-w-[1350px] gap-8 relative overflow-hidden">

      <div className="mx-auto px-4 md:px-8 flex justify-center flex-col gap-4 text-center lg:px-10 z-10">
        <p className="text-label">
          My Tech Stack
        </p>
        <h2 className="heading-section">
          Building the Future, One Line at a Time
        </h2>
        <p className="text-body max-w-3xl mx-auto">
          A developer is only as good as their tools. From frontend
          wizardry with React and Tailwind to backend muscle with Go and Rust,
          I leverage the best technology to build robust, scalable applications.
        </p>
      </div>

      {/* Solar System for Desktop */}
      <div className="hidden lg:flex items-center justify-center min-h-[850px] -my-20 scale-90 xl:scale-100">
         <TechOrbit code={Code} tools={Tools} web={finalOrbitWeb} />
      </div>

      {/* Grid/List for Mobile (Full View) */}
      <div className="flex flex-col gap-8 justify-center lg:hidden">

        <div className="flex flex-col gap-4 justify-center">
            <h3 className="text-2xl font-semibold text-center text-[var(--color-text-main)]">Web Technologies</h3>
            <div className="mx-auto w-full px-6 relative">
              <motion.div
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {Web.slice(0, 12).map((item) => (
                  <TechComponent
                    key={item.name}
                    name={item.name}
                    image={item.image}
                  />
                ))}
                 {/* Show a "View All" or just limit it on mobile to save space? User didn't specify. */}
              </motion.div>
            </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
            <h3 className="text-2xl font-semibold text-center text-[var(--color-text-main)]">Programming & Tools</h3>
            <div className="mx-auto w-full px-6 relative">
                <motion.div
                    className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {[...Code, ...Tools].slice(0, 12).map((item) => (
                    <TechComponent
                        key={item.name}
                        name={item.name}
                        image={item.image}
                    />
                    ))}
                </motion.div>
            </div>
        </div>

      </div>
    </CommonWrapper>
  );
};

export default TechStack;
