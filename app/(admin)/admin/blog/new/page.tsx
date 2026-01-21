import { getBlogAuthors, getBlogCategories } from "@/app/actions/common";
import BlogEditorForm from "../components/BlogEditorForm";

export const dynamic = 'force-dynamic';

export default async function NewBlogPostPage() {
  const [categories, authors] = await Promise.all([
    getBlogCategories(),
    getBlogAuthors(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">New Blog Post</h1>
        <p className="text-[var(--color-text-muted)]">Create a new blog post</p>
      </div>

      <BlogEditorForm categories={categories} authors={authors} />
    </div>
  );
}
