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
    <>
      <Hero />
      <section className="section-padding bg-alternate border-t border-subtle">
        <Story />
      </section>
      <section className="section-padding">
        <TechStack />
      </section>
      <section className="section-padding bg-alternate border-t border-subtle">
        <Experience />
      </section>
      <section className="section-padding">
        <Summary />
      </section>
      <section className="section-padding bg-alternate border-t border-subtle">
        <Education />
      </section>
      <section className="section-padding">
        <Hobbies />
      </section>
      <CTA />
    </>
  );
}

export default Page;
