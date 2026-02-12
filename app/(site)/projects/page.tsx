import Hero from "@/app/(site)/projects/components/Hero";
import ProjectListing from "@/app/(site)/projects/components/ProjectListing";
import { getProjectsPaginated } from "@/app/actions/common";
import CTA from "@/components/home/CTA";
import { Pagination } from "@/components/common/Pagination";
import type { Metadata } from "next";

// Revalidate every hour for projects
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects by Nabin Katwal — web apps, tools, and experiments.",
  openGraph: {
    title: "Projects | Nabin Katwal",
    description:
      "Selected software projects by Nabin Katwal — web apps, tools, and experiments.",
  },
};

async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { data: projects, totalPages } = await getProjectsPaginated(currentPage, 12);

  return (
    <>
      <Hero />
      <section className="section-padding bg-alternate border-t border-[var(--border)]">
        <div className="container-max common-layout">
          <ProjectListing projects={projects} />
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/projects"
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export default Page;
