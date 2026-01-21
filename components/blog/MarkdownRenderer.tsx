"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) {
    return <div className="text-[var(--color-text-muted)]">No content available.</div>;
  }

  return (
    <div className="prose prose-zinc dark:prose-invert mx-auto max-w-none
      prose-headings:text-[var(--color-text-main)]
      prose-p:text-[var(--color-text-muted)]
      prose-strong:text-[var(--color-text-main)]
      prose-a:text-[var(--color-primary)] hover:prose-a:opacity-80
      prose-code:text-[var(--color-primary)]
      prose-pre:bg-[var(--color-primary)]/5
      prose-pre:border prose-pre:border-[var(--color-primary)]/10
      text-lg/8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <span className="block my-4">
                <img
                  src={src}
                  alt={alt || ""}
                  className="rounded-lg w-full h-auto"
                  loading="lazy"
                />
              </span>
            );
          },
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-lg"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
