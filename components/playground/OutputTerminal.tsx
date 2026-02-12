"use client";


interface OutputTerminalProps {
  output: string;
  error?: string;
  isLoading?: boolean;
}

export const OutputTerminal = ({ output, error, isLoading }: OutputTerminalProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden border border-[var(--border)] bg-[#0a0a0a] font-mono text-sm" style={{ minHeight: '600px' }}>
      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--background-alt)] border-b border-[var(--border)]">
        <span className="text-xs text-[var(--color-text-muted)]">Terminal</span>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <span className="animate-spin">⟳</span> Running code...
          </div>
        ) : error ? (
          <pre className="text-red-500 font-mono whitespace-pre-wrap text-xs">{error}</pre>
        ) : output ? (
          <pre className="text-[var(--color-text-main)] font-mono whitespace-pre-wrap text-xs">{output}</pre>
        ) : (
          <div className="text-[var(--color-text-subtle)] italic text-xs">Output will appear here...</div>
        )}
      </div>
    </div>
  );
};
