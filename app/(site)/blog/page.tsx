import { BlogListing } from "@/components/blog/BlogListing";
import CTA from "@/components/home/CTA";
import { getBlogPostsPaginated } from "@/app/actions/common";
import { Pagination } from "@/components/common/Pagination";
import type { Metadata } from "next";

// Revalidate every 5 minutes for blog listing
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering and design blog — thoughts on development, design, and tech.",
  openGraph: {
    title: "Blog | Nabin Katwal",
    description:
      "Engineering and design blog — thoughts on development, design, and tech.",
  },
};

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { data: posts, totalPages } = await getBlogPostsPaginated(currentPage, 12);

  return (
    <>
      <section className="section-padding pt-14 lg:pt-16">
        <div className="container-max common-layout">
          <div className="max-w-2xl mb-16">
            <p className="text-label mb-4">Insights & Stories</p>
            <h1 className="heading-section mb-6">
              Engineering & Design Blog
            </h1>
            <p className="text-body">
              Thoughts on development, design, and the occasional deep dive into tech.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-t border-[var(--border)]">
        <div className="container-max common-layout">
          <BlogListing posts={posts} />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
            />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default Page;
