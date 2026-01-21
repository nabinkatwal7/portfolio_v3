import Hero from "@/app/(site)/watchlogs/components/Hero";
import LibraryContent from "@/app/(site)/watchlogs/components/Shows";
import { getWatchlogs } from "@/app/actions/common";
import CTA from "@/components/home/CTA";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const data = await getWatchlogs();

  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-20">
        <LibraryContent initialItems={data} />
      </div>
      <div className="py-20">
        <CTA />
      </div>
    </div>
  );
};

export default Page;
