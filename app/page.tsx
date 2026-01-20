import CTA from "@/components/home/CTA";
import Description from "@/components/home/Description";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";

export default function Home() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
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
