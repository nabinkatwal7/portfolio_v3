"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export function MarkdownEditor({ value = "", onChange }: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState(value);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (val: string | undefined) => {
    const newValue = val || "";
    setContent(newValue);
    onChange?.(newValue);
  };

  if (!mounted) {
    return (
      <div className="min-h-[500px] border border-[var(--color-primary)]/10 rounded-lg overflow-hidden bg-background flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] border border-[var(--color-primary)]/10 rounded-lg overflow-hidden bg-background" data-color-mode="light">
      <MDEditor
        value={content}
        onChange={handleChange}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={true}
        height={500}
      />
      <style jsx global>{`
        .w-md-editor {
          background-color: var(--color-background) !important;
          color: var(--color-text-main) !important;
        }
        .w-md-editor-text-pre {
          color: var(--color-text-main) !important;
        }
        .w-md-editor-text-input {
          color: var(--color-text-main) !important;
          background-color: transparent !important;
        }
        .w-md-editor-bar {
          background-color: var(--color-primary)/5 !important;
          border-bottom: 1px solid var(--color-primary)/10 !important;
        }
        .w-md-editor-bar svg {
          color: var(--color-text-main) !important;
        }
        .w-md-editor-preview {
          background-color: var(--color-background) !important;
          color: var(--color-text-main) !important;
        }
        .w-md-editor-preview pre {
          background-color: var(--color-primary)/5 !important;
        }
      `}</style>
    </div>
  );
}
