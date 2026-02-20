import { getBlogPosts } from '@/app/actions/blog'
import { getBaseUrl, formatRSSDate, stripHtml } from '@/lib/utils'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const posts = await getBlogPosts(true)
  const baseUrl = getBaseUrl()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nabin Katwal - Blog</title>
    <description>Building stuffs with colorful texts. Software Engineer in Kathmandu, Nepal.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${formatRSSDate(new Date())}</lastBuildDate>
    <generator>Next.js RSS Feed</generator>
    ${posts
      .map(
        (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || stripHtml(post.content).substring(0, 200)}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${formatRSSDate(new Date(post.published_at || post.created_at))}</pubDate>
      <author>${post.author || 'Nabin Katwal'}</author>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
