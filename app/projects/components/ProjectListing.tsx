"use client";
import ProjectCard from "@/app/projects/components/ProjectCard";
import { CircuitBoardBackground } from "@/components/common/animation/CircuitBoardBackground";
import { projectData } from "@/data/projectData";
import { staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const ProjectListing = () => {
  return (
    <div className="relative overflow-hidden">
      <CircuitBoardBackground />
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 common-layout max-w-[1350px]"
      >
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            description={project.description}
            name={project.title}
            image={project.image}
            href={project.link}
            tags={project.tags}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectListing;
