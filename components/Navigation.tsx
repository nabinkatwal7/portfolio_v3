import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="container-content py-4 sm:py-6">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
        <Link 
          href="/" 
          className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
        >
          home
        </Link>
        <Link 
          href="/blog" 
          className="text-neutral-700 hover:text-accent-purple transition-colors duration-200 font-medium"
        >
          blog
        </Link>
        <a 
          href="https://github.com/nabinkatwal7" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-neutral-700 hover:text-accent-cyan transition-colors duration-200 font-medium"
        >
          github
        </a>
        <a 
          href="https://www.linkedin.com/in/nabin-katwal-1b4a94182/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-neutral-700 hover:text-accent-blue transition-colors duration-200 font-medium"
        >
          linkedin
        </a>
      </div>
    </nav>
  )
}
