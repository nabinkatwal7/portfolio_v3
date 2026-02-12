function Hero({
  title = "Digital Architect & Full-Stack Engineer",
  bio = "I build high-performance, scalable web applications with a focus on precision engineering and editorial design. Transforming complex technical challenges into seamless, user-centric digital experiences."
}: {
  title?: string;
  bio?: string;
}) {
  return (
    <section className="section-padding pt-14 lg:pt-16">
      <div className="container-max common-layout">
        <div className="max-w-2xl mx-auto">
          <h1 className="heading-display mb-6">
            {title}
          </h1>
          <p className="text-body mb-10">
            {bio}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <a
              href="mailto:mediocampistaa@gmail.com"
              className="text-xs font-normal text-[var(--color-text-main)] border-b border-[var(--color-text-main)] hover:opacity-60 transition-opacity pb-1"
            >
              Get in Touch
            </a>
            <a
              href="/about"
              className="text-xs font-normal text-[var(--color-text-muted)] border-b border-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-text-main)] transition-colors pb-1"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
