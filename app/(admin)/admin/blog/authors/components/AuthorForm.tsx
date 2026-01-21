"use client";

import { createBlogAuthor, updateBlogAuthor } from "@/app/actions/blog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface AuthorFormProps {
  authorId?: string;
  initialName?: string;
  initialImage?: string;
  initialBio?: string;
}

export function AuthorForm({
  authorId,
  initialName = "",
  initialImage = "",
  initialBio = "",
}: AuthorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [bio, setBio] = useState(initialBio);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("image", image.trim());
        formData.append("bio", bio.trim());

        if (authorId) {
          formData.append("id", authorId);
          await updateBlogAuthor(formData);
        } else {
          await createBlogAuthor(formData);
        }

        router.push("/admin/blog/authors");
        router.refresh();
      } catch (err: any) {
        setError(err.message || "Failed to save author");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-main)]">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Author name"
              required
              className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-main)]">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/author-image.jpg"
              className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
            />
            {image && (
              <div className="mt-2 relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-primary)]/20">
                <Image
                  src={image}
                  alt="Author preview"
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => setImage("")}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-main)]">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Author biography"
              rows={4}
              className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <Link
          href="/admin/blog/authors"
          className="px-6 py-2 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          disabled={isPending}
        >
          {isPending ? "Saving..." : authorId ? "Save Changes" : "Create Author"}
        </button>
      </div>
    </form>
  );
}
