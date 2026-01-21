"use client";

import { useEffect, useState } from "react";

interface LivePreviewProps {
  code: string;
}

export const LivePreview = ({ code }: LivePreviewProps) => {
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    // Basic debounce to avoid flashing on every keystroke
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: sans-serif; margin: 0; padding: 1rem; color: #fff; }
              /* Add some basic scrollbar styling for the iframe */
              ::-webkit-scrollbar { width: 8px; height: 8px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
            </style>
          </head>
          <body>
            ${code}
          </body>
        </html>
      `);
    }, 600);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-white shadow-2xl relative">
       <div className="absolute top-0 left-0 right-0 h-8 bg-[#2d2d2d] flex items-center px-4 border-b border-white/10 z-10">
          <span className="text-xs text-white/50 font-mono">Live Preview</span>
        </div>
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts"
        className="w-full h-full pt-8 bg-[#1e1e1e]" // Dark bg by default to match theme, but user can override in CSS
      />
    </div>
  );
};
