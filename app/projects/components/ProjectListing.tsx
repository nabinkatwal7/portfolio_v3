import ProjectCard from "@/app/projects/components/ProjectCard";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { projectData } from "@/data/projectData";

const ProjectListing = () => {
  return (
    <CommonWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 common-layout max-w-[1350px]">
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
    </CommonWrapper>
  );
};

export default ProjectListing;
