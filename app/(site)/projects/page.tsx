import Hero from "@/app/(site)/projects/components/Hero";
import ProjectListing from "@/app/(site)/projects/components/ProjectListing";
import { getProjects } from "@/app/actions/common";
import CTA from "@/components/home/CTA";

export const dynamic = 'force-dynamic';

async function Page() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-12">
        <ProjectListing projects={projects} />
      </div>
      <CTA />
    </div>
  );
}

export default Page;
