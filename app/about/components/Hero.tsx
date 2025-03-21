import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative common-layout">
      <div className="mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="pt-10 pb-10 sm:pb-32 lg:col-span-7  xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <div className="hidden  sm:flex ">
              <div className="relative rounded-full px-3 py-1 text-sm/6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Coding, creating, and occasionally debugging my own mistakes.
              </div>
            </div>
            <h1 className=" text-5xl font-semibold tracking-tight text-pretty sm:mt-10 sm:text-7xl">
              Crafting Code & Building Dreams 🚀
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Web developer by day, tech explorer by night. I bring ideas to
              life with Next.js, React, and Tailwind, creating sleek,
              high-performance apps that don&apos;t just work—they impress.
              Ready to build something awesome?
            </p>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            alt="Hero image"
            width={1920}
            height={1080}
            src="/images/hero.jpg"
            className="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
