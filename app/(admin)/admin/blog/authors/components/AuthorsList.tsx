"use client";

import { deleteBlogAuthor } from "@/app/actions/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Image from "next/image";

interface Author {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  created_at?: string;
}

interface AuthorsListProps {
  authors: Author[];
}

export function AuthorsList({ authors }: AuthorsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the author "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteBlogAuthor(id);
        router.refresh();
      } catch (error: any) {
        alert(error.message || "Failed to delete author");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (authors.length === 0) {
    return (
      <div className="p-12 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
        <p className="text-[var(--color-text-muted)] mb-4">No authors found.</p>
        <Link
          href="/admin/blog/authors/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
        >
          Create your first author
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {authors.map((author) => (
        <div
          key={author.id}
          className="p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/10 transition-colors"
        >
          <div className="flex items-start gap-4 mb-4">
            {author.image ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--color-primary)]/20">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl flex-shrink-0">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[var(--color-text-main)] truncate">
                {author.name}
              </h3>
            </div>
          </div>

          {author.bio && (
            <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
              {author.bio}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--color-primary)]/10">
            <Link
              href={`/admin/blog/authors/${author.id}`}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
              title="Edit author"
            >
              <HiPencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(author.id, author.name)}
              disabled={isPending && deletingId === author.id}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete author"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
