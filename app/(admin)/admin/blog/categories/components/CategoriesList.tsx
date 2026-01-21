"use client";

import { deleteBlogCategory } from "@/app/actions/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";

interface Category {
  id: string;
  title: string;
  slug: string;
  created_at?: string;
}

interface CategoriesListProps {
  categories: Category[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the category "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteBlogCategory(id);
        router.refresh();
      } catch (error: any) {
        alert(error.message || "Failed to delete category");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (categories.length === 0) {
    return (
      <div className="p-12 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
        <p className="text-[var(--color-text-muted)] mb-4">No categories found.</p>
        <Link
          href="/admin/blog/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
        >
          Create your first category
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--color-primary)]/10 border-b border-[var(--color-primary)]/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-main)]">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-main)]">
                Slug
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-[var(--color-text-main)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-primary)]/10">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-[var(--color-primary)]/5 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-[var(--color-text-main)] font-medium">
                  {category.title}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">
                  {category.slug}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/categories/${category.id}`}
                      className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
                      title="Edit category"
                    >
                      <HiPencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, category.title)}
                      disabled={isPending && deletingId === category.id}
                      className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete category"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
