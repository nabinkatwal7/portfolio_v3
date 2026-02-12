import { Author } from "@/components/blog/Author";
import { Categories } from "@/components/blog/Categories";
import { PublishedAt } from "@/components/blog/PublishedAt";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import Image from "next/image";

export function Post(props: NonNullable<any>) {
  const { title, author, mainImage, mainImageAlt, body, publishedAt, categories } = props;

  return (
    <article className="container-max common-layout max-w-4xl mx-auto py-12 lg:py-16">
      <header className="text-center space-y-6 mb-12">
        {categories && categories.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            <Categories categories={categories} />
          </div>
        )}
        <h1 className="heading-section">{title}</h1>
        <div className="flex items-center justify-center gap-4 text-small text-[var(--color-text-muted)]">
          <Author author={author} />
          <span className="w-1 h-1 bg-[var(--color-text-subtle)] rounded-full" />
          <PublishedAt publishedAt={publishedAt} />
        </div>
      </header>

      {mainImage && (
        <figure className="w-full mb-12 overflow-hidden">
          <Image
            src={mainImage}
            width={1200}
            height={600}
            alt={mainImageAlt || title}
            className="w-full h-auto object-cover"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </figure>
      )}

      {body && (
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={body} />
        </div>
      )}
    </article>
  );
}
