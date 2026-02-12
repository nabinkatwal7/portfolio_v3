import Hero from "@/app/(site)/watchlogs/components/Hero";
import LibraryContent from "@/app/(site)/watchlogs/components/Shows";
import { getWatchlogsPaginated } from "@/app/actions/common";
import { Pagination } from "@/components/common/Pagination";
import CTA from "@/components/home/CTA";
import type { Metadata } from "next";

// Revalidate every hour for watchlogs
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Watchlogs",
  description:
    "Shows and books I've watched and read — TV, anime, movies, and reading list.",
  openGraph: {
    title: "Watchlogs | Nabin Katwal",
    description:
      "Shows and books I've watched and read — TV, anime, movies, and reading list.",
  },
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const { data, totalPages } = await getWatchlogsPaginated(currentPage, 20);

  return (
    <div className="flex flex-col relative min-h-screen">
      <Hero />
      <div className="bg-alternate py-20">
        <div className="common-layout max-w-[1350px]">
          <LibraryContent initialItems={data} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/watchlogs"
          />
        </div>
      </div>
      <div className="py-20">
        <CTA />
      </div>
    </div>
  );
};

export default Page;
