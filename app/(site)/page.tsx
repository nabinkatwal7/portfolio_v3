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
    <div className="flex flex-col relative min-h-screen">
      <Hero
        title={content['hero_title']}
        bio={content['hero_bio']}
      />
      <div className="bg-alternate py-10">
        <Description />
      </div>
      <Statistics />
      <div className="bg-alternate py-10">
        <CTA />
      </div>
    </div>
  );
}
