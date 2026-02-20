import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/app/actions/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest posts about software development, GoLang, web development, and more.",
  openGraph: {
    title: "Blog | Nabin Katwal",
    description: "Read my latest posts about software development, GoLang, web development, and more.",
  },
};

export default async function Blog() {
  const posts = await getBlogPosts(true);

  return (
    <div className="container-content">
      <h1 className="text-4xl sm:text-5xl font-normal mb-8 sm:mb-12 text-neutral-900">
        Blog
      </h1>
      {posts.length === 0 ? (
        <p className="text-sm sm:text-base text-neutral-500">No posts yet.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post, index) => {
            const accentColors = [
              'text-primary-600 hover:text-primary-700',
              'text-accent-purple hover:text-accent-pink',
              'text-accent-cyan hover:text-accent-blue',
              'text-accent-green hover:text-accent-cyan',
              'text-accent-pink hover:text-accent-purple',
            ]
            const accentColor = accentColors[index % accentColors.length]
            
            return (
              <li key={post.id} className="border-b border-neutral-200 pb-8 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className={`text-xl sm:text-2xl font-medium ${accentColor} transition-colors duration-200`}
                  >
                    {post.title}
                  </Link>
                  <time className="text-sm text-neutral-500 whitespace-nowrap">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
