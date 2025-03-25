"use client";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import Link from "next/link";

const CTA = () => {
  return (
    <CommonWrapper>
      <div className="common-layout">
        <div className="relative isolate overflow-hidden text-center sm:rounded-3xl sm:px-16">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
            I&apos;m always open to new opportunities. If you have a project or
            idea that you want to bring to life, let&apos;s talk.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="mailto:mediocampistaa@gmail.com"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white"
            >
              Contact me
            </Link>
            <Link
              href="/about"
              className="text-sm/6 font-semibold text-primary"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default CTA;
