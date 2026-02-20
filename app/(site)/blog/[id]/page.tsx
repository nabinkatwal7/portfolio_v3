import { isAuthenticated } from "@/app/actions/auth";
import { deleteBlogPost, getBlogPostBySlug } from "@/app/actions/blog";
import DeleteButton from "@/components/DeleteButton";
import { getBaseUrl, stripHtml } from "@/lib/utils";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = getBaseUrl();
  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content).substring(0, 160);
  const ogImage =
    post.og_image || post.featured_image || `${baseUrl}/og-default.png`;
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    authors: [{ name: post.author || "Nabin Katwal" }],
    keywords: post.tags,
    openGraph: {
      title,
      description,
      url,
      siteName: "Nabin Katwal",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author || "Nabin Katwal"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@nabinkatwal7", // Update with your Twitter handle
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getBlogPostBySlug(params.id);
  const authenticated = await isAuthenticated();

  if (!post) {
    notFound();
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const result = await deleteBlogPost(id);
    if (result.success) {
      revalidatePath("/blog");
      revalidatePath("/");
      redirect("/blog");
    }
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/blog/${post.slug}`;
  const publishedDate = post.published_at || post.created_at;

  // Structured data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || stripHtml(post.content).substring(0, 200),
    image: post.featured_image || post.og_image || `${baseUrl}/og-default.png`,
    datePublished: publishedDate,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author || "Nabin Katwal",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Nabin Katwal",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.tags[0] || "General",
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container-content">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/blog"
            className="text-sm sm:text-base inline-block text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            ← back
          </Link>
          {authenticated && (
            <div className="flex gap-2">
              <Link
                href={`/admin/posts/${post.id}`}
                className="px-3 py-1.5 bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 rounded text-xs font-medium"
              >
                Edit
              </Link>
              <DeleteButton
                id={post.id}
                title={post.title}
                deleteAction={handleDelete}
                className="px-3 py-1.5 bg-error text-white hover:bg-error/90 transition-colors duration-200 rounded text-xs font-medium"
              >
                Delete
              </DeleteButton>
            </div>
          )}
        </div>
        <article className="prose prose-neutral max-w-none">
          <h1 className="text-3xl sm:text-4xl font-normal mb-3 text-neutral-900">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-neutral-500">
            <time dateTime={publishedDate}>
              {new Date(publishedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            {post.reading_time && <span>• {post.reading_time} min read</span>}
            {post.author && <span>• {post.author}</span>}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {post.featured_image && (
            <div className="mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-lg"
              />
            </div>
          )}
          <div
            className="text-base sm:text-lg leading-relaxed prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
}
