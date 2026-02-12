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
    <div className="h-full w-full overflow-hidden border border-[var(--border)] bg-[var(--background)] relative" style={{ minHeight: '600px' }}>
       <div className="absolute top-0 left-0 right-0 h-8 bg-[var(--background-alt)] flex items-center px-3 border-b border-[var(--border)] z-10">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">Live Preview</span>
        </div>
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts"
        className="w-full h-full pt-8 bg-[var(--background)]"
        style={{ height: 'calc(100% - 32px)' }}
      />
    </div>
  );
};
