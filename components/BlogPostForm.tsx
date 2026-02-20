'use client'

import { useState } from 'react'
import RichTextEditor from './RichTextEditor'

interface BlogPostFormProps {
  action: (formData: FormData) => Promise<void>
  initialData?: {
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    tags?: string[]
    published?: boolean
    meta_title?: string
    meta_description?: string
    og_image?: string
    featured_image?: string
    author?: string
  }
  submitLabel?: string
  cancelHref?: string
}

export default function BlogPostForm({
  action,
  initialData,
  submitLabel = 'Create Post',
  cancelHref = '/admin/posts',
}: BlogPostFormProps) {
  const [content, setContent] = useState(initialData?.content || '')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('content', content)
    await action(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialData?.title}
              required
              className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              required
              pattern="[a-z0-9-]+"
              className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              placeholder="my-blog-post"
            />
            <p className="text-xs text-neutral-500 mt-1">Lowercase letters, numbers, and hyphens only</p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              maxLength={300}
              defaultValue={initialData?.excerpt || ''}
              className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="A brief summary of the post (max 300 characters)"
            />
            <p className="text-xs text-neutral-500 mt-1">Used in blog listings and meta descriptions</p>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your post..."
              name="content"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              defaultValue={initialData?.tags?.join(', ')}
              className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="technical, learning, project"
            />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-neutral-900">Publishing</h2>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                defaultChecked={initialData?.published}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="published" className="ml-2 text-sm text-neutral-700">
                {initialData ? 'Published' : 'Publish immediately'}
              </label>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                defaultValue={initialData?.author || 'Nabin Katwal'}
                className="w-full px-3 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-sm font-medium text-neutral-900 mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="meta_title" className="block text-xs font-medium text-neutral-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="meta_title"
                    name="meta_title"
                    defaultValue={initialData?.meta_title || ''}
                    maxLength={60}
                    className="w-full px-3 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="SEO optimized title (max 60 chars)"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave empty to use post title</p>
                </div>

                <div>
                  <label htmlFor="meta_description" className="block text-xs font-medium text-neutral-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    id="meta_description"
                    name="meta_description"
                    rows={3}
                    maxLength={160}
                    defaultValue={initialData?.meta_description || ''}
                    className="w-full px-3 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="SEO description (max 160 chars)"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave empty to use excerpt</p>
                </div>

                <div>
                  <label htmlFor="og_image" className="block text-xs font-medium text-neutral-700 mb-1">
                    Open Graph Image URL
                  </label>
                  <input
                    type="url"
                    id="og_image"
                    name="og_image"
                    defaultValue={initialData?.og_image || ''}
                    className="w-full px-3 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Recommended: 1200x630px</p>
                </div>

                <div>
                  <label htmlFor="featured_image" className="block text-xs font-medium text-neutral-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    id="featured_image"
                    name="featured_image"
                    defaultValue={initialData?.featured_image || ''}
                    className="w-full px-3 py-2 border border-neutral-300 bg-white text-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Displayed at top of post</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-neutral-200">
        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg font-medium shadow-sm"
        >
          {submitLabel}
        </button>
        <a
          href={cancelHref}
          className="px-6 py-3 border border-neutral-300 hover:bg-neutral-50 transition-colors duration-200 rounded-lg inline-block text-neutral-700"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
