import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-16 sm:py-24 text-center">
      <h1 className="text-5xl sm:text-6xl font-normal mb-4 text-neutral-900">404</h1>
      <p className="text-base sm:text-lg mb-8 text-neutral-600">Page not found.</p>
      <Link 
        href="/" 
        className="inline-block text-sm sm:text-base text-primary-600 hover:text-primary-700 transition-colors duration-200"
      >
        ← home
      </Link>
    </div>
  );
}
