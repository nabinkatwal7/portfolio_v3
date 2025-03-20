import Overlay from "@/components/common/animation/Overlay";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabin Katwal",
  description: "Hello!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative font-body text-[#FAF5F6] bg-[#252525] background-gradient`}
      >
        <Overlay />
        <Header />
        <div className={""}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
