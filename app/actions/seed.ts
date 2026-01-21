'use server'

import { projectData } from '@/data/projectData'
import { slideData, slideDataBook } from '@/data/showsData'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { checkAuth } from './auth'

// Create a service role client to bypass RLS
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function seedDatabase() {
  const isAuth = await checkAuth()
  if (!isAuth) return { error: 'Unauthorized' }

  // Use the admin client (or anon if service role missing, but warn user)
  const supabase = supabaseAdmin

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("SUPABASE_SERVICE_ROLE_KEY is missing. Seeding might fail due to RLS.")
  }

  // Seed Watchlogs (Shows)
  for (const item of slideData) {
     const { data } = await supabase.from('watchlogs').select('id').eq('title', item.title).single()
     if (!data) {
        const { error } = await supabase.from('watchlogs').insert({
            title: item.title,
            src: item.src,
            type: 'shows'
        })
        if (error) console.error("Error seeding show:", error)
     }
  }

  // Seed Watchlogs (Books)
  for (const item of slideDataBook) {
     const { data } = await supabase.from('watchlogs').select('id').eq('title', item.title).single()
     if (!data) {
        const { error } = await supabase.from('watchlogs').insert({
            title: item.title,
            src: item.src,
            type: 'books'
        })
        if (error) console.error("Error seeding book:", error)
     }
  }

  // Seed Projects
  for (const item of projectData) {
     const { data } = await supabase.from('projects').select('id').eq('title', item.title).single()
     if (!data) {
        const { error } = await supabase.from('projects').insert({
            title: item.title,
            description: item.description,
            image: item.image,
            link: item.link,
            tags: item.tags
        })
        if (error) console.error("Error seeding project:", error)
     }
  }

  return { success: 'Database seeded successfully' }
}
