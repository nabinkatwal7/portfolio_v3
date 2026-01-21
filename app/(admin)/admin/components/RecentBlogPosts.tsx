import Link from "next/link";
import { HiNewspaper, HiArrowRight, HiCalendar } from "react-icons/hi2";
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
      <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--color-primary)]/10">
          <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Blog Posts</h3>
        </div>
        <div className="p-8 text-center">
          <HiNewspaper className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)] opacity-50" />
          <p className="text-[var(--color-text-muted)] mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity text-sm"
          >
            Create your first post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
      <div className="p-6 border-b border-[var(--color-primary)]/10 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Blog Posts</h3>
        <Link
          href="/admin/blog"
          className="text-sm text-[var(--color-primary)] hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          View all
          <HiArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="divide-y divide-[var(--color-primary)]/10">
        {posts.slice(0, 5).map((post) => {
          const timestamp = post.createdAt || post.publishedAt || new Date().toISOString();
          const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
          const isPublished = post.publishedAt && new Date(post.publishedAt) <= new Date();

          return (
            <Link
              key={post.id}
              href={`/admin/blog/${post.id}`}
              className="block p-4 hover:bg-[var(--color-primary)]/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isPublished
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                      <HiCalendar className="w-3 h-3" />
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
