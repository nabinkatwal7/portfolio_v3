import { getBlogCategories } from "@/app/actions/common";
import { CategoryForm } from "../components/CategoryForm";

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categories = await getBlogCategories();
  const category = categories.find((cat) => cat.id === id);

  if (!category) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">
          Category Not Found
        </h1>
        <p className="text-[var(--color-text-muted)]">
          The category you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">
          Edit Category
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Update category details
        </p>
      </div>

      <CategoryForm
        categoryId={category.id}
        initialTitle={category.title}
        initialSlug={category.slug}
      />
    </div>
  );
}
