import { CategoryForm } from "../components/CategoryForm";

export const dynamic = 'force-dynamic';

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold  text-[var(--color-primary)]">
          New Category
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Create a new blog category
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}
