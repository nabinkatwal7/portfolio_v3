'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { calculateReadingTime } from '@/lib/utils'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
  meta_title?: string | null
  meta_description?: string | null
  og_image?: string | null
  featured_image?: string | null
  author?: string | null
  reading_time?: number | null
  published_at?: string | null
}

export async function getBlogPosts(publishedOnly: boolean = true) {
  const supabase = await createServerClient()
  
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (publishedOnly) {
    query = query.eq('published', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  // Calculate reading time if not set
  return (data as BlogPost[]).map(post => ({
    ...post,
    reading_time: post.reading_time || calculateReadingTime(post.content)
  }))
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  const post = data as BlogPost
  return {
    ...post,
    reading_time: post.reading_time || calculateReadingTime(post.content)
  }
}

export async function getBlogPostById(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createServerClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []
  const published = formData.get('published') === 'on'
  const metaTitle = formData.get('meta_title') as string
  const metaDescription = formData.get('meta_description') as string
  const ogImage = formData.get('og_image') as string
  const featuredImage = formData.get('featured_image') as string
  const author = formData.get('author') as string

  const readingTime = calculateReadingTime(content)

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      tags,
      published,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      featured_image: featuredImage || null,
      author: author || 'Nabin Katwal',
      reading_time: readingTime,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/feed.xml')
  revalidatePath('/sitemap.xml')
  return { success: true, data }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createServerClient()
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []
  const published = formData.get('published') === 'on'
  const metaTitle = formData.get('meta_title') as string
  const metaDescription = formData.get('meta_description') as string
  const ogImage = formData.get('og_image') as string
  const featuredImage = formData.get('featured_image') as string
  const author = formData.get('author') as string

  const readingTime = calculateReadingTime(content)

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      tags,
      published,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      featured_image: featuredImage || null,
      author: author || 'Nabin Katwal',
      reading_time: readingTime,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/feed.xml')
  revalidatePath('/sitemap.xml')
  return { success: true, data }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createServerClient()
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  revalidatePath('/feed.xml')
  revalidatePath('/sitemap.xml')
  return { success: true }
}
