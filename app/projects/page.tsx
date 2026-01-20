import Hero from "@/app/projects/components/Hero";
import ProjectListing from "@/app/projects/components/ProjectListing";
import CTA from "@/components/home/CTA";

function Page() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-12">
        <ProjectListing />
      </div>
      <CTA />
    </div>
  );
}

export default Page;
