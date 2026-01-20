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
    <article className="mx-auto px-4 md:px-6 lg:px-8 space-y-12 max-w-4xl py-12">
      <header className="text-center space-y-6">
        <div className="flex justify-center flex-wrap gap-2">
           <Categories categories={categories} />
        </div>
        <div className="flex flex-col items-center gap-4">
           <Title>{title}</Title>
           <div className="flex items-center justify-center gap-6 text-[var(--color-text-muted)] text-sm font-medium">
             <Author author={author} />
             <div className="w-1 h-1 bg-[var(--color-primary)]/40 rounded-full" />
             <PublishedAt publishedAt={publishedAt} />
           </div>
        </div>
      </header>

      {mainImage && (
        <figure className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-primary)]/10">
          <Image
            src={urlFor(mainImage).width(1200).height(600).url()}
            width={1200}
            height={600}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </figure>
      )}

      {body && (
        <div className="prose prose-zinc dark:prose-invert mx-auto max-w-none
          prose-headings:text-[var(--color-text-main)]
          prose-p:text-[var(--color-text-muted)]
          prose-strong:text-[var(--color-text-main)]
          prose-a:text-[var(--color-primary)] hover:prose-a:opacity-80
          text-lg/8">
          <PortableText value={body} components={components} />
        </div>
      )}
    </article>
  );
}
