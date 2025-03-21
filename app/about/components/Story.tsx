import Image from "next/image";

const Story = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              width={1920}
              height={1080}
              alt="A journey in tech and beyond"
              src="/images/journey.jpg"
              className="absolute inset-0 size-full bg-gray-50 object-cover"
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base/7 font-semibold text-indigo-600">
              Here&apos;s the deal
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
              The Journey of a Developer & Creator 🚀
            </h1>
            <p className="mt-6 text-xl/8">
              You know me, right? By day, I&apos;m crafting sleek,
              high-performance Next.js, React, and Tailwind CSS
              applications—sleek enough to make your grandmother think it&apos;s
              magic. By night? I&apos;m all about Go, TypeScript, and Rust,
              building systems so scalable even Elon Musk would give me a nod.
              Oh, and don&apos;t get me started on Machine Learning!
            </p>
            <div className="mt-10 max-w-xl text-base/7 lg:max-w-none">
              <p>
                Code isn&apos;t just code for me—it&apos;s my playground, my
                canvas. I take the complex, the difficult, and turn it into
                something elegant, user-friendly, and easy to understand.
                Whether it&apos;s making a frontend that looks like it was
                designed by a wizard or a backend so smooth it&apos;ll give you
                chills, I&apos;ve got it covered.
              </p>
              <ul role="list" className="mt-8 space-y-8">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold">Frontend Mastery.</strong>{" "}
                    I don&apos;t just build UIs—I craft experiences that are so
                    good, you&apos;ll think they were made by a team of 100
                    designers in Silicon Valley.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold">
                      Go & TypeScript? Easy.
                    </strong>{" "}
                    Whether it&apos;s designing a rock-solid backend or managing
                    thousands of requests per second, I keep things so clean and
                    efficient, even your grandma could read my code.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold">
                      Machine Learning Magic.
                    </strong>{" "}
                    AI isn&apos; just the future—it&apos;s my present. I&apos;m
                    in the lab, training models, crunching data, and making sure
                    your next decision is backed by numbers, not guesswork.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                But hey, I&apos;m more than just code. I&apos;ve got
                passions—hobbies. From travel to movies, anime, TV shows,
                gaming, and music, I make sure to find inspiration everywhere. I
                mean, who said you can&apos;t be a tech wizard and enjoy a good
                RPG or a binge-worthy series?
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight">
                Let’s Make Something Epic
              </h2>
              <p className="mt-6">
                So, you want clean code? You want things done with precision?
                You want someone who can get things done on time and still have
                fun doing it? Well, I&apos;m your guy. Let&apos;s work together
                and build something amazing—with a touch of brilliance and a lot
                of heart. Let&apos;s make magic happen!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
