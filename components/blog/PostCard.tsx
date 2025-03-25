/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author } from "@/components/blog/Author";
import { Categories } from "@/components/blog/Categories";
import { PublishedAt } from "@/components/blog/PublishedAt";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export function PostCard(props: any) {
  const { title, author, mainImage, publishedAt, categories } = props;

  return (
    <Link className="group block" href={`/blog/${props.slug!.current}`}>
      <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        {mainImage && (
          <div className="w-full h-48 overflow-hidden">
            <Image
              src={urlFor(mainImage).width(600).height(300).url()}
              width={600}
              height={300}
              alt={mainImage.alt || title || ""}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 space-y-4">
          <Categories categories={categories} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
            {title}
          </h2>
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>
      </article>
    </Link>
  );
}
