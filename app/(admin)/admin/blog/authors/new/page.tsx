import { AuthorForm } from "../components/AuthorForm";

export const dynamic = 'force-dynamic';

export default function NewAuthorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
          New Author
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Create a new blog author
        </p>
      </div>

      <AuthorForm />
    </div>
  );
}
