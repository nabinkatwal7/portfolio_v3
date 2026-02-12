import { createServiceRoleClient } from "@/utils/supabase/server";
import { getBlogAuthors, getBlogCategories } from "@/app/actions/common";
import { redirect } from "next/navigation";
import BlogEditorForm from "../components/BlogEditorForm";

export const dynamic = 'force-dynamic';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceRoleClient();

  const [postResult, categories, authors] = await Promise.all([
    supabase
      .from("blog_posts")
      .select(`
        *,
        categories:blog_post_categories(
          category:blog_categories(*)
        )
      `)
      .eq("id", id)
      .single(),
    getBlogCategories(),
    getBlogAuthors(),
  ]);

  const { data: post } = postResult;

  if (!post) {
    redirect("/admin/blog");
  }

  const categoryIds = post.categories?.map((pc: any) => pc.category.id) || [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold  text-[var(--color-primary)]">Edit Blog Post</h1>
        <p className="text-[var(--color-text-muted)]">Update blog post details</p>
      </div>

      <BlogEditorForm
        postId={post.id}
        initialTitle={post.title}
        initialSlug={post.slug}
        initialBody={typeof post.body === 'string' ? post.body : ''}
        initialMainImage={post.main_image}
        initialMainImageAlt={post.main_image_alt}
        initialAuthorId={post.author_id}
        initialPublishedAt={post.published_at}
        initialCategoryIds={categoryIds}
        categories={categories}
        authors={authors}
      />
    </div>
  );
}
