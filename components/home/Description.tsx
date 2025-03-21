import CommonWrapper from "@/components/common/animation/CommonWrapper";

const Description = () => {
  return (
    <CommonWrapper>
      <div className="common-layout max-w-[1350px]">
        <div className="mx-auto text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Pixels, Code & a Little Bit of Magic ✨
          </h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            I build fast, beautiful, and user-friendly web apps with Next.js,
            React, and Tailwind—because the internet deserves better. When
            I&apos;m not crafting sleek interfaces, I&apos;m off exploring Go,
            TypeScript, and Rust, probably breaking things just to fix them
            again.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            If you need a dev who writes clean code and questionable commit
            messages, you&apos;re in the right place. Let&apos;s build something
            legendary!
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Description;
