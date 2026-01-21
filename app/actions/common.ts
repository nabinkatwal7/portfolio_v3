'use server'

import { createClient } from '@/utils/supabase/server'

export async function getGuestbookEntries() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching guestbook:', error)
      // If table doesn't exist, return empty array
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Guestbook table does not exist. Please run the database schema.')
        return []
      }
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching guestbook:', error)
    return []
  }
}

export async function getWatchlogs() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('watchlogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching watchlogs:', error)
      // If table doesn't exist, return empty array
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Watchlogs table does not exist. Please run the database schema.')
        return []
      }
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching watchlogs:', error)
    return []
  }
}

export async function getWatchlogsPaginated(page: number = 1, pageSize: number = 20) {
  try {
    const supabase = await createClient()
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('watchlogs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching watchlogs:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Watchlogs table does not exist. Please run the database schema.')
        return { data: [], total: 0, totalPages: 0 }
      }
      return { data: [], total: 0, totalPages: 0 }
    }

    const totalPages = Math.ceil((count || 0) / pageSize)
    return {
      data: data || [],
      total: count || 0,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Unexpected error fetching watchlogs:', error)
    return { data: [], total: 0, totalPages: 0 }
  }
}

export async function getProjects() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Projects table does not exist. Please run the database schema.')
        return []
      }
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching projects:', error)
    return []
  }
}

export async function getProjectsPaginated(page: number = 1, pageSize: number = 12) {
  try {
    const supabase = await createClient()
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching projects:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Projects table does not exist. Please run the database schema.')
        return { data: [], total: 0, totalPages: 0 }
      }
      return { data: [], total: 0, totalPages: 0 }
    }

    const totalPages = Math.ceil((count || 0) / pageSize)
    return {
      data: data || [],
      total: count || 0,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Unexpected error fetching projects:', error)
    return { data: [], total: 0, totalPages: 0 }
  }
}

export async function getContent() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('content')
      .select('*')

    if (error) {
      console.error('Error fetching content:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Content table does not exist. Please run the database schema.')
        return {}
      }
      return {}
    }

    // Transform array to object for easier consumption
    return (data || []).reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    console.error('Unexpected error fetching content:', error)
    return {}
  }
}

export async function getBlogPosts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*),
        categories:blog_post_categories(
          category:blog_categories(*)
        )
      `)
      .order('published_at', { ascending: false, nullsFirst: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Blog posts table does not exist. Please run the database schema.')
        return []
      }
      return []
    }

    // Transform the data to match expected format
    return (data || []).map(post => {
      const author = post.author ? {
        id: post.author.id,
        name: post.author.name,
        image: post.author.image,
      } : null

      const categories = (post.categories || [])
        .map((pc: any) => pc.category)
        .filter(Boolean)
        .map((cat: any) => ({
          id: cat.id,
          title: cat.title,
          slug: cat.slug,
        }))

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        body: typeof post.body === 'string' ? post.body : '', // Handle both string (markdown) and old JSON format
        mainImage: post.main_image,
        mainImageAlt: post.main_image_alt,
        publishedAt: post.published_at,
        author,
        categories,
      }
    })
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostsPaginated(page: number = 1, pageSize: number = 12) {
  try {
    const supabase = await createClient()
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*),
        categories:blog_post_categories(
          category:blog_categories(*)
        )
      `, { count: 'exact' })
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching blog posts:', error)
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        console.warn('Blog posts table does not exist. Please run the database schema.')
        return { data: [], total: 0, totalPages: 0 }
      }
      return { data: [], total: 0, totalPages: 0 }
    }

    // Transform the data to match expected format
    const transformedData = (data || []).map(post => {
      const author = post.author ? {
        id: post.author.id,
        name: post.author.name,
        image: post.author.image,
      } : null

      const categories = (post.categories || [])
        .map((pc: any) => pc.category)
        .filter(Boolean)
        .map((cat: any) => ({
          id: cat.id,
          title: cat.title,
          slug: cat.slug,
        }))

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        body: typeof post.body === 'string' ? post.body : '',
        mainImage: post.main_image,
        mainImageAlt: post.main_image_alt,
        publishedAt: post.published_at,
        author,
        categories,
      }
    })

    const totalPages = Math.ceil((count || 0) / pageSize)
    return {
      data: transformedData,
      total: count || 0,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error)
    return { data: [], total: 0, totalPages: 0 }
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*),
        categories:blog_post_categories(
          category:blog_categories(*)
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    if (!data) return null

    // Transform author data
    const author = data.author ? {
      id: data.author.id,
      name: data.author.name,
      image: data.author.image,
    } : null

    // Transform categories data
    const categories = (data.categories || [])
      .map((pc: any) => pc.category)
      .filter(Boolean)
      .map((cat: any) => ({
        id: cat.id,
        title: cat.title,
        slug: cat.slug,
      }))

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      body: typeof data.body === 'string' ? data.body : '', // Handle both string (markdown) and old JSON format
      mainImage: data.main_image,
      mainImageAlt: data.main_image_alt,
      publishedAt: data.published_at,
      author,
      categories,
    }
  } catch (error) {
    console.error('Unexpected error fetching blog post:', error)
    return null
  }
}

export async function getBlogCategories() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching blog categories:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching blog categories:', error)
    return []
  }
}

export async function getBlogAuthors() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching blog authors:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching blog authors:', error)
    return []
  }
}
