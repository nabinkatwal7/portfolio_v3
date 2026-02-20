import { createBlogPost } from '@/app/actions/blog'
import { redirect } from 'next/navigation'
import BlogPostForm from '@/components/BlogPostForm'

export default function NewPostPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const result = await createBlogPost(formData)
    if (result.success) {
      redirect('/admin/posts')
    } else {
      // Handle error - in a real app, you'd want to show this to the user
      console.error('Error creating post:', result.error)
    }
  }

  return (
    <div className="container-main">
      <h1 className="text-3xl sm:text-4xl font-normal mb-8 text-neutral-900">New Post</h1>
      <BlogPostForm action={handleSubmit} submitLabel="Create Post" />
    </div>
  )
}
