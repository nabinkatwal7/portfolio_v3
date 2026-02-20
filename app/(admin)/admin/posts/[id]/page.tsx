import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/app/actions/blog'
import { redirect, notFound } from 'next/navigation'
import DeleteButton from '@/components/DeleteButton'
import BlogPostForm from '@/components/BlogPostForm'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id)

  if (!post) {
    notFound()
  }

  async function handleUpdate(formData: FormData) {
    'use server'
    const result = await updateBlogPost(params.id, formData)
    if (result.success) {
      redirect('/admin/posts')
    } else {
      console.error('Error updating post:', result.error)
    }
  }

  async function handleDelete(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const result = await deleteBlogPost(id)
    if (result.success) {
      redirect('/admin/posts')
    }
  }

  return (
    <div className="container-main">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-normal text-neutral-900">Edit Post</h1>
        <DeleteButton
          id={post.id}
          title={post.title}
          deleteAction={handleDelete}
          className="px-4 py-2 bg-error text-white hover:bg-error/90 transition-colors duration-200 rounded-lg text-sm font-medium"
        >
          Delete Post
        </DeleteButton>
      </div>
      
      <BlogPostForm
        action={handleUpdate}
        initialData={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content,
          tags: post.tags,
          published: post.published,
          meta_title: post.meta_title || '',
          meta_description: post.meta_description || '',
          og_image: post.og_image || '',
          featured_image: post.featured_image || '',
          author: post.author || 'Nabin Katwal',
        }}
        submitLabel="Update Post"
      />
    </div>
  )
}
