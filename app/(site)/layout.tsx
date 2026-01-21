
import Overlay from "@/components/common/animation/Overlay";
import { PageTransition } from "@/components/common/animation/PageTransition";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Overlay />
      <Header />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </>
  );
}
