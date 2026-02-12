import { getBlogSlugsForSitemap } from "@/app/actions/common";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guestbook`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/watchlogs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/playground`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const slugs = await getBlogSlugsForSitemap();
  const blogRoutes: MetadataRoute.Sitemap = slugs.map(({ slug, updated_at }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
