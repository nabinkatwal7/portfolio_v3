import { getBlogAuthors } from "@/app/actions/common";
import { AuthorForm } from "../components/AuthorForm";

export const dynamic = 'force-dynamic';

export default async function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authors = await getBlogAuthors();
  const author = authors.find((auth) => auth.id === id);

  if (!author) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
          Author Not Found
        </h1>
        <p className="text-[var(--color-text-muted)]">
          The author you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
          Edit Author
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Update author details
        </p>
      </div>

      <AuthorForm
        authorId={author.id}
        initialName={author.name}
        initialImage={author.image || ""}
        initialBio={author.bio || ""}
      />
    </div>
  );
}
