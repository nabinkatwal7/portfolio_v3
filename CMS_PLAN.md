# CMS Plan & Implementation

## Overview
This document outlines the CMS architecture, SEO implementation, and RSS feed functionality for the portfolio blog.

## Database Schema

### Blog Posts Table
- **id**: UUID (Primary Key)
- **title**: TEXT (Required)
- **slug**: TEXT (Unique, Required)
- **excerpt**: TEXT (Optional, max 300 chars)
- **content**: TEXT (Required)
- **tags**: TEXT[] (Array of tags)
- **published**: BOOLEAN (Default: false)
- **created_at**: TIMESTAMP
- **updated_at**: TIMESTAMP
- **meta_title**: TEXT (SEO title, max 60 chars)
- **meta_description**: TEXT (SEO description, max 160 chars)
- **og_image**: TEXT (Open Graph image URL)
- **featured_image**: TEXT (Featured image URL)
- **author**: TEXT (Default: "Nabin Katwal")
- **reading_time**: INTEGER (Calculated automatically)
- **published_at**: TIMESTAMP (Set when published)

## SEO Implementation

### 1. Meta Tags
- **Title**: Uses `meta_title` or falls back to `title`
- **Description**: Uses `meta_description` or falls back to `excerpt` or truncated content
- **Keywords**: Uses post tags
- **Author**: Uses post author field

### 2. Open Graph Tags
- **og:title**: SEO optimized title
- **og:description**: SEO description
- **og:image**: Custom OG image or featured image
- **og:url**: Canonical URL
- **og:type**: "article"
- **og:published_time**: Publication date
- **og:modified_time**: Last update date
- **og:author**: Post author

### 3. Twitter Card Tags
- **twitter:card**: "summary_large_image"
- **twitter:title**: Post title
- **twitter:description**: Post description
- **twitter:image**: OG image
- **twitter:creator**: Twitter handle

### 4. Structured Data (JSON-LD)
- BlogPosting schema with:
  - Headline, description, image
  - Publication and modification dates
  - Author information
  - Keywords and article section
  - Word count

### 5. Sitemap
- Dynamic XML sitemap at `/sitemap.xml`
- Includes all published posts
- Updates automatically when posts are published/updated

### 6. Robots.txt
- Allows all crawlers
- Disallows `/admin/` and `/api/` routes
- References sitemap location

## RSS Feed

### Implementation
- **Route**: `/feed.xml`
- **Format**: RSS 2.0 compliant
- **Content**: All published posts
- **Fields Included**:
  - Title, description, link, GUID
  - Publication date
  - Author
  - Categories (tags)
  - Full content (CDATA wrapped)

### Features
- Auto-updates when posts are published
- Proper CDATA encoding for HTML content
- RFC 822 date formatting
- Atom self-link for feed discovery

## CMS Features

### Admin Interface
1. **Post Management**
   - Create, edit, delete posts
   - Draft/publish toggle
   - Slug generation and validation

2. **SEO Fields**
   - Meta title (60 char limit)
   - Meta description (160 char limit)
   - Open Graph image URL
   - Featured image URL
   - Author field

3. **Content Management**
   - Rich text content (currently plain text)
   - Tags management
   - Excerpt field
   - Reading time calculation (automatic)

### Reading Time Calculation
- Based on 200 words per minute
- Calculated automatically on save
- Displayed in post metadata

## Utilities

### `lib/utils.ts`
- `calculateReadingTime()`: Calculate reading time from content
- `generateSlug()`: Generate URL-friendly slug from title
- `getBaseUrl()`: Get site base URL (supports Vercel, custom domain, localhost)
- `formatRSSDate()`: Format date for RSS (RFC 822)
- `formatISO8601()`: Format date for sitemap (ISO 8601)
- `truncateText()`: Truncate text to specific length
- `stripHtml()`: Remove HTML tags from text

## Migration

Run the migration file to add SEO fields:
```sql
-- File: supabase/migrations/001_add_seo_fields.sql
```

This migration:
1. Adds SEO fields to blog_posts table
2. Creates indexes for performance
3. Sets published_at for existing posts
4. Creates trigger for automatic published_at setting
5. Adds reading time calculation function

## Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

If not set, defaults to:
- Vercel URL (if deployed)
- localhost:3000 (development)

## Next Steps

1. **Run Migration**: Execute the SQL migration in Supabase
2. **Set Site URL**: Add `NEXT_PUBLIC_SITE_URL` to environment variables
3. **Create OG Image**: Add default OG image at `/public/og-default.png` (1200x630px)
4. **Update Twitter Handle**: Update Twitter handle in `app/layout.tsx` and `app/blog/[id]/page.tsx`
5. **Test RSS Feed**: Visit `/feed.xml` to verify RSS feed
6. **Test Sitemap**: Visit `/sitemap.xml` to verify sitemap
7. **Submit to Search Engines**: Submit sitemap to Google Search Console

## Best Practices

1. **Meta Titles**: Keep under 60 characters
2. **Meta Descriptions**: Keep under 160 characters
3. **OG Images**: Use 1200x630px images for best results
4. **Slugs**: Use lowercase, hyphens, no special characters
5. **Tags**: Use consistent, lowercase tags
6. **Content**: Write clear, descriptive excerpts

## Performance

- RSS feed and sitemap are cached with `s-maxage=3600`
- Revalidation happens on post create/update/delete
- Reading time calculated server-side
- All SEO metadata generated at build time
