import Hero from "@/app/projects/components/Hero";
import ProjectListing from "@/app/projects/components/ProjectListing";
import CTA from "@/components/home/CTA";

function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <ProjectListing />
      <CTA />
    </div>
  );
}

export default Page;
