/**
 * Strip markdown to plain text and truncate for meta description.
 */
export function excerptFromMarkdown(markdown: string, maxLength: number = 155): string {
  if (!markdown || typeof markdown !== "string") return "";
  const plain = markdown
    .replace(/#{1,6}\s+/g, " ")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/__?([^_]+)__?/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength - 3).trim() + "...";
}
