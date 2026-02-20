import { getBaseUrl } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nabin Katwal",
    template: "%s | Nabin Katwal",
  },
  description:
    "Building stuffs with colorful texts. Software Engineer in Kathmandu, Nepal focused on GoLang development.",
  keywords: [
    "software engineer",
    "golang",
    "web development",
    "blog",
    "Nepal",
    "Kathmandu",
  ],
  authors: [{ name: "Nabin Katwal" }],
  creator: "Nabin Katwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Nabin Katwal",
    title: "Nabin Katwal",
    description:
      "Building stuffs with colorful texts. Software Engineer in Kathmandu, Nepal.",
    images: [
      {
        url: `${baseUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Nabin Katwal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabin Katwal",
    description:
      "Building stuffs with colorful texts. Software Engineer in Kathmandu, Nepal.",
    creator: "@tim_fringe", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    types: {
      "application/rss+xml": [{ url: `${baseUrl}/feed.xml` }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
