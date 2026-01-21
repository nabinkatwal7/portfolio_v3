'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGuestbookEntry(formData: FormData) {
  try {
    const supabase = await createClient()
    const name = formData.get('name') as string
    const message = formData.get('message') as string

    if (!name || !message) {
      return { error: 'Name and message are required' }
    }

    const { error } = await supabase.from('guestbook').insert({
      name: name.trim(),
      message: message.trim(),
    })

    if (error) {
      console.error('Error adding guestbook entry:', error)
      // Check if table doesn't exist
      if (error.code === 'PGRST116' || error.code === 'PGRST205') {
        return { error: 'Database table not found. Please ensure the database schema is set up correctly.' }
      }
      // Check for RLS policy violation
      if (error.code === '42501') {
        return { error: 'Permission denied. Please check Row Level Security policies.' }
      }
      return { error: 'Failed to add entry. Please try again.' }
    }

    revalidatePath('/guestbook')
    return { success: true }
  } catch (error) {
    console.error('Unexpected error adding guestbook entry:', error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
