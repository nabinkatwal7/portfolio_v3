'use server'

import { createClient } from '@/utils/supabase/server'

export async function getGuestbookEntries() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching guestbook:', error)
    return []
  }
  return data
}

export async function getWatchlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('watchlogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching watchlogs:', error)
    return []
  }
  return data
}

export async function getProjects() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data
}

export async function getContent() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('content')
    .select('*')

  if (error) {
    console.error('Error fetching content:', error)
    return {}
  }

  // Transform array to object for easier consumption
  return data.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, string>)
}
