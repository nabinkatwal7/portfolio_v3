import { getContent } from "@/app/actions/common";
import CTA from "@/components/home/CTA";
import Description from "@/components/home/Description";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";

// Revalidate every hour for fresh content
export const revalidate = 3600;

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero
        title={content['hero_title']}
        bio={content['hero_bio']}
      />
      <Description />
      <Statistics />
      <CTA />
    </>
  );
}
