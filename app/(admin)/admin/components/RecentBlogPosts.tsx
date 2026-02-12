import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  createdAt?: string;
}

interface RecentBlogPostsProps {
  posts: BlogPost[];
}

export function RecentBlogPosts({ posts }: RecentBlogPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="border border-[var(--border)]">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-main)]">Recent Blog Posts</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)] mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="inline-block px-4 py-2 text-sm bg-[var(--color-primary)] text-[var(--primary-foreground)] hover:opacity-80 transition-opacity"
          >
            Create your first post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)]">
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-text-main)]">Recent Blog Posts</h3>
        <Link
          href="/admin/blog"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
        >
          View all →
        </Link>
      </div>
      <div>
        {posts.slice(0, 5).map((post) => {
          const timestamp = post.createdAt || post.publishedAt || new Date().toISOString();
          const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
          const isPublished = post.publishedAt && new Date(post.publishedAt) <= new Date();

          return (
            <Link
              key={post.id}
              href={`/admin/blog/${post.id}`}
              className="block px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--background-alt)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-[var(--color-text-main)] truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs ${
                      isPublished ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-subtle)]'
                    }`}>
                      {isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-[var(--color-text-subtle)]">
                      {timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
