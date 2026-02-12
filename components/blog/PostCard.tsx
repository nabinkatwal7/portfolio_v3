import { Author } from "@/components/blog/Author";
import { Categories } from "@/components/blog/Categories";
import { PublishedAt } from "@/components/blog/PublishedAt";
import Image from "next/image";
import Link from "next/link";

export function PostCard(props: any) {
  const { title, author, mainImage, mainImageAlt, publishedAt, categories, slug } = props;

  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <article className="h-full border-b border-[var(--border)] pb-8 hover:opacity-70 transition-opacity">
        {mainImage && (
          <div className="w-full h-48 mb-4 overflow-hidden bg-[var(--muted)]">
            <Image
              src={mainImage}
              width={600}
              height={400}
              alt={mainImageAlt || title || ""}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        )}
        <div className="flex flex-col gap-3">
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Categories categories={categories} />
            </div>
          )}
          <h2 className="heading-card line-clamp-2">
            {title}
          </h2>
          <div className="flex justify-between items-center text-small text-[var(--color-text-muted)]">
            <Author author={author} />
            <PublishedAt publishedAt={publishedAt} />
          </div>
        </div>
      </article>
    </Link>
  );
}
