import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authCookie = request.cookies.get('admin-authenticated')
  const isAuthenticated = authCookie?.value === 'true'
  
  // If on login page and already authenticated, redirect to dashboard
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Allow access to login page without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check authentication for all other admin routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
