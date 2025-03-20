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
        className={`antialiased font-body text-[#FAF5F6] bg-[#252525] background-gradient`}
      >
        <Header />
        <div
          className={
            "max-w-[1300px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 "
          }
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
