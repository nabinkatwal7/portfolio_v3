"use client";
import { slideInUp } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  name,
  image,
  description,
  href,
  tags,
}: {
  name: string;
  image: string;
  description: string;
  href: string;
  tags: string[];
}) => {
  return (
    <motion.div
      variants={slideInUp}
      whileHover="hover"
      className="h-full"
    >
      <Link
        target="_blank"
        href={href}
        className="group block h-full p-6 rounded-2xl bg-[var(--color-primary)]/5 backdrop-blur-md text-[var(--color-text-main)] shadow-sm hover:shadow-2xl duration-500 ease-in-out transition-all border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 overflow-hidden"
      >
        {/* Image */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden transition-all duration-500">
          <Image
            fill
            src={image}
            alt={name}
            className="object-cover group-hover:scale-110 duration-700 transition-all ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <h2 className="heading-card group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {name}
          </h2>
          <p className="text-body text-sm line-clamp-3 text-[var(--color-text-main)]/70">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-[var(--color-primary)]/10 backdrop-blur-md border border-[var(--color-primary)]/20 text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
