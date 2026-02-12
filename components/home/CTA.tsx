import Link from "next/link";

const CTA = () => {
  return (
    <section className="section-padding bg-alternate border-t border-[var(--border)]">
      <div className="container-max common-layout max-w-2xl mx-auto">
        <h2 className="heading-section mb-6">
          Ready to Build Something Exceptional?
        </h2>
        <p className="text-body mb-10">
          Whether you have a fully-fledged idea or just a spark of inspiration,
          I&apos;m here to help you bring it to life. Let&apos;s collaborate and
          create something that truly stands out.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link
            href="mailto:mediocampistaa@gmail.com"
            className="text-xs font-normal text-[var(--color-text-main)] border-b border-[var(--color-text-main)] hover:opacity-60 transition-opacity pb-1"
          >
            Get in Touch
          </Link>
          <Link
            href="/about"
            className="text-xs font-normal text-[var(--color-text-muted)] border-b border-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:border-[var(--color-text-main)] transition-colors pb-1"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
