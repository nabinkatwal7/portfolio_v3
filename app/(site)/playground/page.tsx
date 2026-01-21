"use client";

import { LanguageSelector } from "@/components/playground/LanguageSelector";
import { LivePreview } from "@/components/playground/LivePreview";
import { OutputTerminal } from "@/components/playground/OutputTerminal";
import {
  executeCode,
  getSupportedLanguages,
  PistonLanguage,
} from "@/services/piston";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HiPlay } from "react-icons/hi2";

const CodeEditor = dynamic(
  () =>
    import("@/components/playground/CodeEditor").then((mod) => mod.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#1e1e1e] animate-pulse rounded-xl" />
    ),
  }
);

const DEFAULT_CODE = {
  html: `<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff00cc, #333399);
">
  <h1 style="
    font-size: 4rem;
    color: white;
    text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
    font-family: sans-serif;
  ">
    Hello World 🌍
  </h1>
</div>`,
  python: `print("Hello from Python!")\n\n# Try writing some code here\nfor i in range(5):\n    print(f"Count: {i}")`,
  javascript: `console.log("Hello from JavaScript!");\n\n// Try writing some code here\nconst numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.map(n => n * 2));`,
  typescript: `console.log("Hello from TypeScript!");\n\ninterface User {\n  name: string;\n  id: number;\n}\n\nconst user: User = { name: "Nabin", id: 1 };\nconsole.log(user);`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
  rust: `fn main() {\n    println!("Hello from Rust!");\n}`,
};

export default function PlaygroundPage() {
  const [languages, setLanguages] = useState<PistonLanguage[]>([]);
  const [selectedLang, setSelectedLang] = useState("javascript");
  const [selectedVersion, setSelectedVersion] = useState("18.15.0");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSupportedLanguages()
      .then((langs) => {
        // Filter for common languages initially to avoid overwhelming list
        const common = [
          "python",
          "javascript",
          "typescript",
          "go",
          "rust",
          "java",
          "c++",
          "csharp",
          "php",
          "ruby",
        ];
        const filtered = langs.filter(
          (l) => common.includes(l.language) || common.includes(l.aliases[0])
        );
        // Sort alphabetically
        filtered.sort((a, b) => a.language.localeCompare(b.language));

        // Add HTML manually
        filtered.unshift({
          language: "html",
          version: "5",
          aliases: ["html5"],
        });

        setLanguages(filtered);

        // precise init
        const js = filtered.find((l) => l.language === "javascript");
        if (js) setSelectedVersion(js.version);
      })
      .catch(console.error);
  }, []);

  const handleLanguageChange = (lang: string, version: string) => {
    setSelectedLang(lang);
    setSelectedVersion(version);
    setCode(
      DEFAULT_CODE[lang as keyof typeof DEFAULT_CODE] ||
        `// Write your ${lang} code here\n`
    );

    // Clear output when switching
    setOutput("");
    setError("");
  };

  const handleRun = async () => {
    if (selectedLang === "html") return;

    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const result = await executeCode(selectedLang, selectedVersion, code);
      if (result.run.stderr) {
        setError(result.run.stderr);
      }
      setOutput(result.run.stdout || (result.run.stderr ? "" : "No output"));
    } catch (err) {
      setError("Failed to execute code. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-[85vh] flex flex-col gap-6">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-primary)]/5 p-4 rounded-2xl border border-[var(--color-primary)]/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl  font-[var(--font-syne)] text-[var(--color-primary)]">
              Playground
            </h1>
            <div className="h-8 w-px bg-[var(--color-primary)]/20 hidden md:block" />
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLang}
              onSelect={handleLanguageChange}
            />
          </div>

          {selectedLang !== "html" && (
            <button
              onClick={handleRun}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed  shadow-[var(--color-primary)]/20"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <HiPlay className="w-5 h-5" />
              )}
              Run Code
            </button>
          )}
        </div>

        {/* Editor & Terminal Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          <CodeEditor
            language={selectedLang}
            code={code}
            onChange={(val) => setCode(val || "")}
          />

          {selectedLang === "html" ? (
            <LivePreview code={code} />
          ) : (
            <OutputTerminal
              output={output}
              error={error}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
