/**
 * Site-wide config for SEO and metadata.
 * Set NEXT_PUBLIC_SITE_URL in .env.local for production (e.g. https://nabinkatwal.com).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Nabin Katwal";
export const SITE_DESCRIPTION =
  "Portfolio and blog of Nabin Katwal — software engineer. Projects, writing on development and design, and more.";
export const SITE_IMAGE = "/images/hero.jpg";
export const TWITTER_HANDLE = ""; // e.g. @nabinkatwal
export const LOCALE = "en_US";
