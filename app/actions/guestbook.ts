'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGuestbookEntry(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const message = formData.get('message') as string

  if (!name || !message) {
    return { error: 'Name and message are required' }
  }

  const { error } = await supabase.from('guestbook').insert({
    name,
    message,
  })

  if (error) {
    console.error('Error adding guestbook entry:', error)
    return { error: 'Failed to add entry' }
  }

  revalidatePath('/guestbook')
  return { success: true }
}
