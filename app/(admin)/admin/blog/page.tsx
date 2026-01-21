import { deleteBlogPost } from "@/app/actions/blog";
import { getBlogPostsPaginated } from "@/app/actions/common";
import Link from "next/link";
import { Pagination } from "@/components/common/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminBlog({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { data: posts, totalPages, total } = await getBlogPostsPaginated(currentPage, 20);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Blog Posts</h1>
          <p className="text-[var(--color-text-muted)]">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity font-medium"
        >
          New Post
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--color-text-main)]">All Posts</h2>
          <span className="text-sm text-[var(--color-text-muted)]">
            {total} {total === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
            <p className="text-[var(--color-text-muted)] opacity-60 mb-4">No posts yet. Create your first blog post!</p>
            <Link
              href="/admin/blog/new"
              className="inline-block px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity font-medium"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="flex gap-5 p-5 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/10 transition-all"
              >
                {post.mainImage && (
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-black/20 shrink-0 border border-[var(--color-primary)]/10">
                    <img src={post.mainImage} alt={post.mainImageAlt || post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[var(--color-text-main)]">{post.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1">/{post.slug}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-xs text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        Edit
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteBlogPost(post.id)
                      }}>
                        <button className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs transition-colors font-medium">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    {post.publishedAt && (
                      <span>
                        Published: {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                    {!post.publishedAt && (
                      <span className="text-orange-400">Draft</span>
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2">
                        {post.categories.map((cat: any) => (
                          <span key={cat.id} className="text-xs bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full">
                            {cat.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/blog"
          />
        )}
      </div>
    </div>
  );
}
