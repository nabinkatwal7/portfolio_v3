/* eslint-disable @typescript-eslint/no-explicit-any */

type CategoriesProps = {
  categories: NonNullable<any>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category: any) => (
    <p
      key={category._id}
      className="leading-none flex items-center justify-center whitespace-nowrap text-xs font-bold tracking-wider uppercase text-[var(--color-primary)]"
    >
      <span className="bg-[var(--color-primary)]/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20">
        {category.title}
      </span>
    </p>
  ));
}
