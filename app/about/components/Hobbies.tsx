"use client";
import CommonLink from "@/components/common/CommonLink";
import { rotateIn, slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Image from "next/image";

const hobbies = [
  {
    name: "Travel.",
    description:
      "Exploring new places, trying local foods, and collecting memories. ✈️",
    image: "/hobbies/travel.jpg",
  },
  {
    name: "Movies.",
    description:
      "Big screen, small screen, doesn't matter—if it’s got a great story, I’m in. 🍿",
    image: "/hobbies/movies.jpg",
  },
  {
    name: "TV Shows.",
    description:
      "One more episode? Always. From thrillers to sitcoms, my watchlist is long. 📺",
    image: "/hobbies/tv.jpg",
  },
  {
    name: "Animes.",
    description:
      "From action-packed shonen to mind-bending psychological thrillers. 🎌",
    image: "/hobbies/anime.jpg",
  },
  {
    name: "Games and Sport.",
    description:
      "Whether it's an open-world RPG or a weekend soccer match. 🎮⚽",
    image: "/hobbies/games.jpg",
  },
  {
    name: "Music.",
    description:
      "A playlist for every mood—coding, gaming, or just vibing. 🎵",
    image: "/hobbies/music.jpg",
  },
];

const Hobbies = () => {
  return (
    <div className="common-layout max-w-[1350px] py-24">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex flex-col gap-12 justify-center"
      >
        <motion.div variants={slideUp} className="mx-auto text-center flex flex-col items-center mb-8">
          <p className="text-label mb-2 opacity-50 uppercase tracking-[0.2em]">My Passions</p>
          <h2 className="heading-section text-4xl md:text-5xl">
            🎭 More Than Just Code
          </h2>
          <p className="mt-8 text-body text-lg md:text-xl max-w-3xl text-[var(--color-text-main)]/70">
            When I&apos;m not busy wrangling pixels and debugging the
            universe, you&apos;ll find me diving into new tech and exploring my passions.
            Because life isn&apos;t all about semicolons and pull requests!
          </p>
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          className="mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16"
        >
          {hobbies.map((feature) => (
            <motion.div
              key={feature.name}
              variants={rotateIn}
              whileHover="hover"
              className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-[var(--color-primary)]/5 backdrop-blur-md border border-[var(--color-primary)]/10 hover:shadow-2xl transition-all duration-500 hover:border-[var(--color-primary)]/30"
            >
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col gap-4">
                <dt className="heading-card text-2xl group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {feature.name}
                </dt>
                <dd className="text-body text-base text-[var(--color-text-main)]/70 leading-relaxed">{feature.description}</dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div variants={slideUp} className="flex flex-row justify-center mt-8">
          <CommonLink href="/watchlogs" title="Explore My Watchlog" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hobbies;
