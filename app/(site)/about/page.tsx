import Education from "@/app/(site)/about/components/Education";
import Experience from "@/app/(site)/about/components/Experience";
import Hero from "@/app/(site)/about/components/Hero";
import Hobbies from "@/app/(site)/about/components/Hobbies";
import Story from "@/app/(site)/about/components/Story";
import Summary from "@/app/(site)/about/components/Summary";
import TechStack from "@/app/(site)/about/components/TechStack";
import CTA from "@/components/home/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Nabin Katwal — background, experience, tech stack, education, and interests.",
  openGraph: {
    title: "About | Nabin Katwal",
    description:
      "Learn about Nabin Katwal — background, experience, tech stack, education, and interests.",
  },
};

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
