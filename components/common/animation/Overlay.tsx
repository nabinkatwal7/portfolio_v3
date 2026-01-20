"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Overlay = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const pathname = usePathname();

  // Reset animation only on home page if we want it global
  // For now keeping it home exclusive as per original logic
  useEffect(() => {
    if (pathname !== "/") {
      setIsAnimating(false);
    }
  }, [pathname]);

  if (pathname !== "/" || !isAnimating) return null;

  return (
    <MultiStepLoader
      loading={isAnimating}
      onFinished={() => setIsAnimating(false)}
    />
  );
};

export default Overlay;
