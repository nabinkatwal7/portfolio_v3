/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author } from "@/components/blog/Author";
import { Categories } from "@/components/blog/Categories";
import { PublishedAt } from "@/components/blog/PublishedAt";
import { Title } from "@/components/blog/Title";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponents";
import { PortableText } from "next-sanity";
import Image from "next/image";

export function Post(props: NonNullable<any>) {
  const { title, author, mainImage, body, publishedAt, categories } = props;

  return (
    <article className="mx-auto px-4 md:px-6 lg:px-8 space-y-8">
      {mainImage && (
        <figure className="w-full">
          <Image
            src={urlFor(mainImage).width(800).height(400).url()}
            width={800}
            height={400}
            alt={title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </figure>
      )}

      <header className="text-center space-y-4">
        <Categories categories={categories} />
        <Title>{title}</Title>
        <div className="flex justify-center gap-4 text-gray-500 text-sm">
          <PublishedAt publishedAt={publishedAt} />
          <Author author={author} />
        </div>
      </header>

      {body && (
        <div className="prose lg:prose-lg prose-invert mx-auto">
          <PortableText value={body} components={components} />
        </div>
      )}
    </article>
  );
}
