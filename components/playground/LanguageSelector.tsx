"use client";

import { PistonLanguage } from "@/services/piston";

interface LanguageSelectorProps {
  languages: PistonLanguage[];
  selectedLanguage: string;
  onSelect: (language: string, version: string) => void;
}

export const LanguageSelector = ({
  languages,
  selectedLanguage,
  onSelect,
}: LanguageSelectorProps) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => {
        const lang = languages.find((l) => l.language === e.target.value);
        if (lang) {
          onSelect(lang.language, lang.version);
        }
      }}
      className="px-3 py-1.5 text-xs border border-[var(--border)] bg-[var(--background)] text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-text-main)] transition-colors cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.language} value={lang.language} className="bg-[var(--background)]">
          {lang.language} ({lang.version})
        </option>
      ))}
    </select>
  );
};
