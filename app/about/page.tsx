import Education from "@/app/about/components/Education";
import Experience from "@/app/about/components/Experience";
import Hero from "@/app/about/components/Hero";
import Hobbies from "@/app/about/components/Hobbies";
import Story from "@/app/about/components/Story";
import Summary from "@/app/about/components/Summary";
import TechStack from "@/app/about/components/TechStack";
import CTA from "@/components/home/CTA";

function Page() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-10">
        <Story />
      </div>
      <TechStack />
      <div className="bg-alternate py-10">
        <Experience />
      </div>
      <Summary />
      <div className="bg-alternate py-10">
        <Education />
      </div>
      <Hobbies />
      <div className="bg-alternate/50 py-10">
        <CTA />
      </div>
    </div>
  );
}

export default Page;
