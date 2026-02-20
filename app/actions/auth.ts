'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin-authenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return { success: true }
  }
  return { success: false, error: 'Invalid password' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-authenticated')
  redirect('/admin/login')
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-authenticated')
  return authCookie?.value === 'true'
}
