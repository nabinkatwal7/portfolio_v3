/* eslint-disable @typescript-eslint/no-explicit-any */

type CategoriesProps = {
  categories: NonNullable<any>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category: any) => (
    <span
      key={category._id}
      className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700"
    >
      {category.title}
    </span>
  ));
}
