import { Post } from "@/components/blog/Post";
import CTA from "@/components/home/CTA";
import { getBlogPostBySlug } from "@/app/actions/common";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { excerptFromMarkdown } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Revalidate every 10 minutes for blog posts
export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const description = excerptFromMarkdown(post.body);
  const ogImage = post.mainImage
    ? post.mainImage.startsWith("http")
      ? post.mainImage
      : `${SITE_URL}${post.mainImage.startsWith("/") ? "" : "/"}${post.mainImage}`
    : undefined;

  return {
    title: post.title,
    description: description || undefined,
    openGraph: {
      title: post.title,
      description: description || undefined,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author ? [post.author.name] : undefined,
      images: ogImage ? [{ url: ogImage, alt: post.mainImageAlt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: excerptFromMarkdown(post.body),
    image: post.mainImage
      ? post.mainImage.startsWith("http")
        ? post.mainImage
        : `${SITE_URL}${post.mainImage.startsWith("/") ? "" : "/"}${post.mainImage}`
      : undefined,
    datePublished: post.publishedAt ?? undefined,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section-padding">
        <Post {...post} />
      </section>
      <CTA />
    </>
  );
}
