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
    <>
      <Hero />
      <section className="section-padding bg-alternate border-t border-[var(--border)]">
        <div className="container-max common-layout">
          <LibraryContent initialItems={data} />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/watchlogs"
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
};

export default Page;
