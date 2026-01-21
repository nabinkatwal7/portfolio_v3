'use server'

import { createServiceRoleClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { checkAuth } from './auth'

// Helper to ensure admin access
async function requireAdmin() {
  const isAuth = await checkAuth()
  if (!isAuth) {
    throw new Error('Unauthorized')
  }
}

// Guestbook Actions
export async function deleteGuestbookEntry(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const { error } = await supabase.from('guestbook').delete().eq('id', id)

  if (error) {
    console.error('Error deleting guestbook entry:', error)
    throw new Error('Failed to delete guestbook entry')
  }

  revalidatePath('/guestbook')
  revalidatePath('/admin')
}

// Watchlogs Actions
export async function addWatchlog(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const title = formData.get('title') as string
  const src = formData.get('src') as string
  const type = formData.get('type') as 'shows' | 'books'

  if (!title || !src || !type) {
    throw new Error('Title, src, and type are required')
  }

  const { error } = await supabase.from('watchlogs').insert({ title, src, type })

  if (error) {
    console.error('Error adding watchlog:', error)
    throw new Error('Failed to add watchlog')
  }

  revalidatePath('/watchlogs')
  revalidatePath('/admin')
}

export async function deleteWatchlog(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const { error } = await supabase.from('watchlogs').delete().eq('id', id)

  if (error) {
    console.error('Error deleting watchlog:', error)
    throw new Error('Failed to delete watchlog')
  }

  revalidatePath('/watchlogs')
  revalidatePath('/admin')
}

// Projects Actions
export async function addProject(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as string
  const link = formData.get('link') as string
  const tagsStr = formData.get('tags') as string
  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean)

  if (!title || !description || !image || !link) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase.from('projects').insert({ title, description, image, link, tags })

  if (error) {
    console.error('Error adding project:', error)
    throw new Error('Failed to add project')
  }

  revalidatePath('/projects')
  revalidatePath('/admin')
}

export async function deleteProject(id: string) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    throw new Error('Failed to delete project')
  }

  revalidatePath('/projects')
  revalidatePath('/admin')
}

// Content Actions
export async function updateContent(formData: FormData) {
    await requireAdmin()
    const supabase = createServiceRoleClient()
    const key = formData.get('key') as string
    const value = formData.get('value') as string
    // section is optional if we assume key is unique enough or we fetch by key
    // For upsert, we need all non-nullable fields if it's a new row.
    // Here we assume row exists or we provide section.
    // Let's rely on upsert for simplicity

    // We need to know which section it belongs to if creating new.
    // For now, let's assume we are editing existing keys primarily.
    // Or we pass section in formData.
    const section = formData.get('section') as string || 'general'

    if (!key || !value) {
        throw new Error('Key and value are required')
    }

    const { error } = await supabase.from('content').upsert({ key, value, section }, { onConflict: 'key' })

    if (error) {
        console.error("Update content error", error)
        throw new Error("Failed to update content")
    }

    revalidatePath('/')
    revalidatePath('/admin')
}

// Update Actions
export async function updateProject(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const image = formData.get('image') as string
  const link = formData.get('link') as string
  const tagsStr = formData.get('tags') as string
  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean)

  if (!id || !title || !description || !image || !link) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase.from('projects').update({ title, description, image, link, tags }).eq('id', id)

  if (error) {
    console.error('Error updating project:', error)
    throw new Error('Failed to update project')
  }

  revalidatePath('/projects')
  revalidatePath('/admin')
}

export async function updateWatchlog(formData: FormData) {
  await requireAdmin()
  const supabase = createServiceRoleClient()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const src = formData.get('src') as string
  const type = formData.get('type') as 'shows' | 'books'

  if (!id || !title || !src || !type) {
    throw new Error('All fields are required')
  }

  const { error } = await supabase.from('watchlogs').update({ title, src, type }).eq('id', id)

  if (error) {
    console.error('Error updating watchlog:', error)
    throw new Error('Failed to update watchlog')
  }

  revalidatePath('/watchlogs')
  revalidatePath('/admin')
}
