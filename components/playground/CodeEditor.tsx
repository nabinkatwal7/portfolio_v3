"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";

interface CodeEditorProps {
  language: string;
  code: string;
  theme?: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor = ({
  language,
  code,
  theme = "vs-dark",
  onChange,
}: CodeEditorProps) => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="w-full h-full border border-[var(--border)] bg-[#0a0a0a] flex items-center justify-center" style={{ minHeight: '600px' }}>
        <div className="text-xs text-red-500 text-center p-4">
          <p>Failed to load editor</p>
          <p className="mt-2 text-[var(--color-text-subtle)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden border border-[var(--border)]" style={{ minHeight: '600px' }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
        value={code}
        theme={theme}
        onChange={onChange}
        onMount={() => setError(null)}
        loading={<div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center text-[var(--color-text-muted)] text-xs">Loading editor...</div>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          lineNumbers: "on",
          lineHeight: 24,
        }}
      />
    </div>
  );
};
