import { getBlogAuthors } from "@/app/actions/common";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { AuthorsList } from "./components/AuthorsList";

export const dynamic = 'force-dynamic';

export default async function BlogAuthorsPage() {
  const authors = await getBlogAuthors();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
            Blog Authors
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Manage blog post authors
          </p>
        </div>
        <Link
          href="/admin/blog/authors/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
        >
          <HiPlus className="w-5 h-5" />
          New Author
        </Link>
      </div>

      <AuthorsList authors={authors} />
    </div>
  );
}
