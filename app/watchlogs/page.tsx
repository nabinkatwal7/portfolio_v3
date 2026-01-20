import Hero from "@/app/watchlogs/components/Hero";
import LibraryContent from "@/app/watchlogs/components/Shows";
import CTA from "@/components/home/CTA";

const Page = () => {
  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-20">
        <LibraryContent />
      </div>
      <div className="py-20">
        <CTA />
      </div>
    </div>
  );
};

export default Page;
