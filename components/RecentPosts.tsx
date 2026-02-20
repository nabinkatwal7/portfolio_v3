import Link from 'next/link'
import { getBlogPosts } from '@/app/actions/blog'

export default async function RecentPosts() {
  const posts = await getBlogPosts(true)

  if (posts.length === 0) {
    return <p className="text-sm text-neutral-500">No posts yet.</p>
  }

  return (
    <ul className="space-y-6">
      {posts.slice(0, 5).map((post, index) => {
        const accentColors = [
          'text-primary-600 hover:text-primary-700',
          'text-accent-purple hover:text-accent-pink',
          'text-accent-cyan hover:text-accent-blue',
          'text-accent-green hover:text-accent-cyan',
          'text-accent-pink hover:text-accent-purple',
        ]
        const accentColor = accentColors[index % accentColors.length]
        
        return (
          <li key={post.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <Link 
                href={`/blog/${post.slug}`} 
                className={`text-lg sm:text-xl font-medium ${accentColor} transition-colors duration-200`}
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
              <div className="flex flex-wrap gap-2 mt-3">
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
  )
}
