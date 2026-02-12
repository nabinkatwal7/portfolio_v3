import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Code playground — run snippets in multiple languages with live output.",
  openGraph: {
    title: "Playground | Nabin Katwal",
    description:
      "Code playground — run snippets in multiple languages with live output.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
