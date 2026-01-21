"use client";


interface OutputTerminalProps {
  output: string;
  error?: string;
  isLoading?: boolean;
}

export const OutputTerminal = ({ output, error, isLoading }: OutputTerminalProps) => {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[#1e1e1e] shadow-2xl font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs text-white/40">Terminal</span>
      </div>
      <div className="flex-1 p-4 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex items-center gap-2 text-blue-400">
            <span className="animate-spin">⟳</span> Running code...
          </div>
        ) : error ? (
          <pre className="text-red-400 font-mono whitespace-pre-wrap">{error}</pre>
        ) : output ? (
          <pre className="text-gray-300 font-mono whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-white/20 italic">Output will appear here...</div>
        )}
      </div>
    </div>
  );
};
