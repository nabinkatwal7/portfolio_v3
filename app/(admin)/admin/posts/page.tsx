import { getBlogPosts, deleteBlogPost } from '@/app/actions/blog'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from '@/components/DeleteButton'

export default async function AdminPostsPage() {
  const posts = await getBlogPosts(false)

  async function handleDelete(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const result = await deleteBlogPost(id)
    if (result.success) {
      revalidatePath('/admin/posts')
      redirect('/admin/posts')
    }
  }

  return (
    <div className="container-main">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-normal text-neutral-900">All Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg font-medium shadow-sm"
        >
          New Post
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-lg sm:text-xl font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                  {post.excerpt && (
                    <p className="text-sm text-neutral-600 mt-2">{post.excerpt}</p>
                  )}
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
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.published 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <time className="text-xs text-neutral-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                  {post.reading_time && (
                    <span className="text-xs text-neutral-500">
                      {post.reading_time} min read
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg text-sm font-medium"
                >
                  Edit
                </Link>
                <DeleteButton
                  id={post.id}
                  title={post.title}
                  deleteAction={handleDelete}
                  className="px-4 py-2 bg-error text-white hover:bg-error/90 transition-colors duration-200 rounded-lg text-sm font-medium"
                >
                  Delete
                </DeleteButton>
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors duration-200 rounded-lg text-sm font-medium"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
