"use client";
import { Author } from "@/components/blog/Author";
import { Categories } from "@/components/blog/Categories";
import { PublishedAt } from "@/components/blog/PublishedAt";
import { urlFor } from "@/sanity/lib/image";
import { slideInUp } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function PostCard(props: any) {
  const { title, author, mainImage, publishedAt, categories } = props;

  return (
    <motion.div
      variants={slideInUp}
      whileHover="hover"
      className="h-full"
    >
      <Link className="group block h-full" href={`/blog/${props.slug!.current}`}>
        <article className="h-full bg-[var(--color-primary)]/5 backdrop-blur-md rounded-2xl shadow-sm border border-[var(--color-primary)]/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[var(--color-primary)]/30">
          {mainImage && (
            <div className="w-full h-64 overflow-hidden relative">
              <Image
                src={urlFor(mainImage).width(600).height(400).url()}
                width={600}
                height={400}
                alt={mainImage.alt || title || ""}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
          <div className="p-8 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Categories categories={categories} />
            </div>
            <h2 className="heading-card group-hover:text-[var(--color-primary)] transition-colors duration-300 leading-tight">
              {title}
            </h2>
            <div className="flex justify-between items-center text-[var(--color-small)] opacity-60 mt-auto pt-6 border-t border-[var(--color-primary)]/10">
              <Author author={author} />
              <PublishedAt publishedAt={publishedAt} />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
