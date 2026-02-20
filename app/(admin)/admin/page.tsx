import { getBlogPosts } from '@/app/actions/blog'
import Link from 'next/link'

export default async function AdminDashboard() {
  const posts = await getBlogPosts(false)

  const publishedCount = posts.filter(p => p.published).length
  const draftCount = posts.filter(p => !p.published).length

  return (
    <div className="container-main">
      <h1 className="text-3xl sm:text-4xl font-normal mb-8 text-neutral-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="border border-neutral-200 bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-neutral-600 mb-2">Total Posts</p>
          <p className="text-3xl font-medium text-neutral-900">{posts.length}</p>
        </div>
        <div className="border border-neutral-200 bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-neutral-600 mb-2">Published</p>
          <p className="text-3xl font-medium text-success">{publishedCount}</p>
        </div>
        <div className="border border-neutral-200 bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-neutral-600 mb-2">Drafts</p>
          <p className="text-3xl font-medium text-warning">{draftCount}</p>
        </div>
      </div>

      <div className="mb-8">
        <Link
          href="/admin/posts/new"
          className="inline-block px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg font-medium shadow-sm"
        >
          Create New Post
        </Link>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-normal mb-6 text-neutral-900">Recent Posts</h2>
        <ul className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="border-b border-neutral-200 pb-4 last:border-b-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium"
                >
                  {post.title}
                </Link>
                <span className={`text-sm px-2 py-1 rounded ${
                  post.published 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
