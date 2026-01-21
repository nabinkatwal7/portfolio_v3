"use client";
import ProjectCard from "@/app/(site)/projects/components/ProjectCard";
import { CircuitBoardBackground } from "@/components/common/animation/CircuitBoardBackground";
import { staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";

const ProjectListing = ({ projects = [] }: { projects: any[] }) => {
  return (
    <div className="relative overflow-hidden min-h-[50vh]">
      <CircuitBoardBackground />
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 common-layout max-w-[1350px]"
      >
        {projects.length > 0 ? (
            projects.map((project) => (
            <ProjectCard
                key={project.id}
                description={project.description}
                name={project.title}
                image={project.image}
                href={project.link}
                tags={project.tags || []}
            />
            ))
        ) : (
            <div className="col-span-full text-center text-body opacity-60">
                No projects found.
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectListing;
