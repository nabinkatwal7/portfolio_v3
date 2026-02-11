import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Syne } from "next/font/google"; // Import Syne
import React from "react";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne", // Define a variable
  weight: ["400", "500", "600", "700", "800"], // Include weights
});


export const metadata: Metadata = {
  title: "Nabin Katwal",
  description: "Hello!",
  icons: {
    icon: "/favicon.ico",
  },
};

import { DynamicFontProvider } from "@/components/common/DynamicFontProvider";

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable}`} suppressHydrationWarning>
      <head>
      <script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
  async
  defer
></script>
      </head>
      <body
        className={`antialiased relative font-body text-[var(--color-text-main)] background-gradient transition-colors duration-300`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Analytics />
          <DynamicFontProvider />
          {children}
        </ThemeProvider>
        <div
  class="cf-turnstile"
  data-sitekey="0x4AAAAAACaif-xi8CMpM_p1"
  data-theme="light"
  data-size="normal"
  data-callback="onSuccess"
></div>
      </body>
    </html>
  );
}
