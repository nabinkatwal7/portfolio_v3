import CommonWrapper from "@/components/common/animation/CommonWrapper";
import CommonLink from "@/components/common/CommonLink";
import Image from "next/image";

const hobbies = [
  {
    name: "Travel.",
    description:
      "Exploring new places, trying local foods, and collecting memories (and maybe a few lost luggage stories). ✈️",
    image: "/hobbies/travel.jpg",
  },
  {
    name: "Movies.",
    description:
      "Big screen, small screen, doesn't matter—if it’s got a great story, I’m in. Bonus points for plot twists! 🍿",
    image: "/hobbies/movies.jpg",
  },
  {
    name: "TV Shows.",
    description:
      "One more episode? Always. From thrillers to sitcoms, my watchlist is longer than my to-do list. 📺",
    image: "/hobbies/tv.jpg",
  },
  {
    name: "Animes.",
    description:
      "From action-packed shonen to mind-bending psychological thrillers—anime is a whole different vibe. 🎌",
    image: "/hobbies/anime.jpg",
  },
  {
    name: "Games and Sport.",
    description:
      "Whether it's an open-world RPG or a weekend soccer match, I’m always up for a challenge. 🎮⚽",
    image: "/hobbies/games.jpg",
  },
  {
    name: "Music.",
    description:
      "A playlist for every mood—coding, gaming, or just vibing. Good music makes everything better! 🎵",
    image: "/hobbies/music.jpg",
  },
];

const Hobbies = () => {
  return (
    <CommonWrapper className="common-layout max-w-[1350px]">
      <div className="mx-auto flex flex-col gap-8 justify-center">
        <div className="mx-auto lg:mx-0 text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Hobbies</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            🎭 More Than Just Code
          </p>
          <div className="flex flex-col gap-1 justify-center">
            <p className="mt-6 text-lg/8 ">
              When I&apos;m not busy wrangling pixels and debugging the
              universe, you&apos;ll find me diving into new tech, leveling up my
              skills, and maybe breaking things just for fun. But hey, life
              isn&apos;t all about semicolons and pull requests!
            </p>
          </div>
        </div>
        <dl className="mx-auto mt-16 grid  grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          {hobbies.map((feature) => (
            <div key={feature.name} className="relative ">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div>
                  <Image
                    src={feature.image}
                    alt=""
                    width={300}
                    height={300}
                    className="rounded-lg w-full max-h-[180px] object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 text-center">
                  <dt className="inline text-xl font-semibold ">
                    {feature.name}
                  </dt>
                  <dd className="inline">{feature.description}</dd>
                </div>
              </div>
            </div>
          ))}
        </dl>
        <div className="flex flex-row justify-center">
          <CommonLink href="/watchlogs" title="Explore My Watchlog" />
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Hobbies;
