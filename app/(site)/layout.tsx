import Navigation from "@/components/Navigation";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200">
        <Navigation />
      </header>
      <main className="flex-1 py-8 sm:py-12 lg:py-16">
        {children}
      </main>
      <footer className="border-t border-neutral-200 bg-neutral-50 mt-auto">
        <div className="container-content py-8">
          <p className="text-xs text-neutral-500 text-center">
            © {new Date().getFullYear()} Nabin Katwal. This site is open source!
          </p>
        </div>
      </footer>
    </div>
  );
}
