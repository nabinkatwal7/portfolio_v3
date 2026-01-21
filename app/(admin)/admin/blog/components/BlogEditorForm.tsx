"use client";

import { createBlogPost, updateBlogPost } from "@/app/actions/blog";
import { MarkdownEditor } from "./MarkdownEditor";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogEditorFormProps {
  postId?: string;
  initialTitle?: string;
  initialSlug?: string;
  initialBody?: any;
  initialMainImage?: string;
  initialMainImageAlt?: string;
  initialAuthorId?: string;
  initialPublishedAt?: string;
  initialCategoryIds?: string[];
  categories?: any[];
  authors?: any[];
}

export default function BlogEditorForm({
  postId,
  initialTitle = "",
  initialSlug = "",
  initialBody,
  initialMainImage = "",
  initialMainImageAlt = "",
  initialAuthorId = "",
  initialPublishedAt = "",
  initialCategoryIds = [],
  categories = [],
  authors = [],
}: BlogEditorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [body, setBody] = useState<string>(initialBody || "");
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [mainImageAlt, setMainImageAlt] = useState(initialMainImageAlt);
  const [authorId, setAuthorId] = useState(initialAuthorId);
  const [publishedAt, setPublishedAt] = useState(initialPublishedAt);
  const [categoryIds, setCategoryIds] = useState<string[]>(initialCategoryIds);

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
    if (!postId && !slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !slug) {
      setError("Title and slug are required");
      return;
    }

    if (!body || body.trim().length === 0) {
      setError("Please add some content to your blog post.");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("slug", slug.trim());
        formData.append("body", body.trim());
        formData.append("mainImage", mainImage.trim());
        formData.append("mainImageAlt", mainImageAlt.trim());
        formData.append("authorId", authorId);
        formData.append("publishedAt", publishedAt);
        formData.append("categoryIds", categoryIds.join(","));

        if (postId) {
          formData.append("id", postId);
          await updateBlogPost(formData);
        } else {
          await createBlogPost(formData);
        }

        router.push("/admin/blog");
        router.refresh();
      } catch (err: any) {
        console.error("Error saving blog post:", err);
        setError(err.message || "Failed to save post. Please check the console for details.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Title *</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Blog post title"
                required
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="blog-post-slug"
                required
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-main)]">Content *</label>
            <MarkdownEditor
              value={body}
              onChange={(value) => setBody(value || "")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Main Image URL</label>
              <input
                type="url"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Image Alt Text</label>
              <input
                type="text"
                value={mainImageAlt}
                onChange={(e) => setMainImageAlt(e.target.value)}
                placeholder="Image description"
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Author</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              >
                <option value="">Select author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Published At</label>
              <input
                type="datetime-local"
                value={publishedAt ? new Date(publishedAt).toISOString().slice(0, 16) : ""}
                onChange={(e) => setPublishedAt(e.target.value ? new Date(e.target.value).toISOString() : "")}
                className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-main)]">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 cursor-pointer hover:bg-[var(--color-primary)]/10 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={categoryIds.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryIds([...categoryIds, category.id]);
                      } else {
                        setCategoryIds(categoryIds.filter((id) => id !== category.id));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm text-[var(--color-text-main)]">{category.title}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/admin/blog"
              className="px-6 py-2.5 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors text-[var(--color-text-main)]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : postId ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
