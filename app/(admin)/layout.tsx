import { isAuthenticated } from '@/app/actions/auth'
import { logout } from '@/app/actions/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  // Don't render nav if not authenticated (login page)
  if (!authenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container-main">
          <div className="flex justify-between items-center py-4">
            <div className="flex gap-6 text-sm">
              <Link 
                href="/admin" 
                className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/posts" 
                className="text-neutral-700 hover:text-accent-purple transition-colors duration-200 font-medium"
              >
                Posts
              </Link>
              <Link 
                href="/admin/posts/new" 
                className="text-neutral-700 hover:text-accent-cyan transition-colors duration-200 font-medium"
              >
                New Post
              </Link>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-neutral-700 hover:text-error transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="py-8">
        {children}
      </div>
    </div>
  )
}
