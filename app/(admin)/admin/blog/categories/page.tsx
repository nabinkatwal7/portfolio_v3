import { getBlogCategories } from "@/app/actions/common";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { CategoriesList } from "./components/CategoriesList";

export const dynamic = 'force-dynamic';

export default async function BlogCategoriesPage() {
  const categories = await getBlogCategories();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
            Blog Categories
          </h1>
          <p className="text-[var(--color-text-muted)]">
            Manage blog post categories
          </p>
        </div>
        <Link
          href="/admin/blog/categories/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
        >
          <HiPlus className="w-5 h-5" />
          New Category
        </Link>
      </div>

      <CategoriesList categories={categories} />
    </div>
  );
}
