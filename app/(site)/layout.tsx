import Overlay from "@/components/common/animation/Overlay";
import { PageTransition } from "@/components/common/animation/PageTransition";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingFallback } from "@/components/common/LoadingFallback";
import { Suspense } from "react";
import React from "react";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary>
      <Overlay />
      <Header />
      <PageTransition>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </PageTransition>
      <Footer />
    </ErrorBoundary>
  );
}
