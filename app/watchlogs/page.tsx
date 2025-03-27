import Hero, { HeroBooks } from "@/app/watchlogs/components/Hero";
import Shows, { Books } from "@/app/watchlogs/components/Shows";

const Page = () => {
  return (
    <div>
      <HeroBooks />
      <Books />
      <Hero />
      <Shows />
    </div>
  );
};

export default Page;
