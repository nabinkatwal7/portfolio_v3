import Link from 'next/link'
import RecentPosts from '@/components/RecentPosts'

export default function Home() {
  return (
    <div className="container-content">
      <div className="mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-normal mb-3 text-neutral-900">
          Nabin Katwal
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mb-8">
          Software Engineer in Kathmandu, Nepal
        </p>
        
        <div className="space-y-6 mb-12">
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
            Hi! I'm Nabin, and I like to build stuffs with{' '}
            <span className="text-gradient font-medium">colorful texts</span>.
          </p>
          
          <p className="text-base sm:text-lg leading-relaxed text-neutral-700">
            I'm focused on <span className="text-accent-cyan font-medium">GoLang</span> development. 
            Outside of that, I'm an open source contributor, 
            and enjoy building web applications, working with modern frameworks, and exploring new technologies 
            in my free time.
          </p>
        </div>
      </div>

      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-normal mb-6 text-neutral-900">
          Here's my most recent posts or read a random one!
        </h2>
        <RecentPosts />
      </div>

      <div className="text-sm sm:text-base text-neutral-600">
        <p className="mb-3 font-medium text-neutral-700">View posts by tag</p>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">#advice</span>
          <span className="px-2 py-1 bg-accent-purple/10 text-accent-purple rounded">#design</span>
          <span className="px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded">#learning</span>
          <span className="px-2 py-1 bg-accent-green/10 text-accent-green rounded">#project</span>
          <span className="px-2 py-1 bg-accent-pink/10 text-accent-pink rounded">#personal</span>
          <span className="px-2 py-1 bg-accent-blue/10 text-accent-blue rounded">#technical</span>
          <span className="px-2 py-1 bg-accent-orange/10 text-accent-orange rounded">#meta</span>
        </div>
      </div>
    </div>
  )
}
