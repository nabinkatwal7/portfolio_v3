"use client";
import Editor from "@monaco-editor/react";

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
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[var(--color-primary)]/10 shadow-2xl">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
        value={code}
        theme={theme}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "var(--font-mono)",
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
