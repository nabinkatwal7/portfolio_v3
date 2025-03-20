import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className={"flex flex-col gap-12"}>
      <Hero />
      <CTA />
    </div>
  );
}
