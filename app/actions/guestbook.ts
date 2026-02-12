"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { validateName, validateMessage, checkRateLimit, getClientIp } from "@/lib/validation";
import { headers } from "next/headers";

export async function addGuestbookEntry(formData: FormData) {
  try {
    // Rate limiting
    const headersList = await headers();
    const clientIp = getClientIp(headersList);
    const rateLimit = checkRateLimit(`guestbook:${clientIp}`, 5, 60000); // 5 requests per minute
    
    if (!rateLimit.allowed) {
      return {
        error: `Too many requests. Please try again after ${Math.ceil((rateLimit.resetAt - Date.now()) / 1000)} seconds.`,
      };
    }

    // Validation
    const nameInput = formData.get("name");
    const messageInput = formData.get("message");

    const nameValidation = validateName(nameInput);
    if (!nameValidation.valid) {
      return { error: nameValidation.error };
    }

    const messageValidation = validateMessage(messageInput, 2000);
    if (!messageValidation.valid) {
      return { error: messageValidation.error };
    }

    const supabase = await createClient();
    const { error } = await supabase.from("guestbook").insert({
      name: nameValidation.value,
      message: messageValidation.value,
    });

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
