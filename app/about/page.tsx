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
    <div>
      <Hero />
      <Story />
      <TechStack />
      <Experience />
      <Summary />
      <Education />
      <Hobbies />
      <CTA />
    </div>
  );
}

export default Page;
