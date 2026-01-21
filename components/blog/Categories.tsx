

type CategoriesProps = {
  categories: Array<{
    id?: string;
    title?: string;
    slug?: string;
  }> | null | undefined;
};

export function Categories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <>
      {categories.map((category: any) => (
        <p
          key={category.id || category.slug}
          className="leading-none flex items-center justify-center whitespace-nowrap text-xs font-bold tracking-wider uppercase text-[var(--color-primary)]"
        >
          <span className="bg-[var(--color-primary)]/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20">
            {category.title}
          </span>
        </p>
      ))}
    </>
  );
}
