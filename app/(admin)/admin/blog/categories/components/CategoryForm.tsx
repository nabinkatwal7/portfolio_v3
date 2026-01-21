"use client";

import { createBlogCategory, updateBlogCategory } from "@/app/actions/blog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryFormProps {
  categoryId?: string;
  initialTitle?: string;
  initialSlug?: string;
}

export function CategoryForm({
  categoryId,
  initialTitle = "",
  initialSlug = "",
}: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!categoryId || slug === generateSlug(initialTitle)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(generateSlug(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !slug) {
      setError("Title and slug are required");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("slug", slug.trim());

        if (categoryId) {
          formData.append("id", categoryId);
          await updateBlogCategory(formData);
        } else {
          await createBlogCategory(formData);
        }

        router.push("/admin/blog/categories");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save category");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Category title"
                required
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">
                Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="category-slug"
                required
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/blog/categories"
          className="px-6 py-2 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          disabled={isPending}
        >
          {isPending ? "Saving..." : categoryId ? "Save Changes" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
