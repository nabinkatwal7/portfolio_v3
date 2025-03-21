import CTA from "@/components/home/CTA";
import Description from "@/components/home/Description";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";

export default function Home() {
  return (
    <div className={"flex flex-col gap-12 relative"}>
      <Hero />
      <Description />
      <Statistics />
      <CTA />
    </div>
  );
}
