/* eslint-disable @typescript-eslint/no-explicit-any */

type CategoriesProps = {
  categories: NonNullable<any>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  return categories.map((category: any) => (
    <p
      key={category._id}
      className=" leading-none flex w-full content-center justify-center whitespace-nowrap text-sm font-semibold text-cyan-700"
    >
      <span className="bg-cyan-50 px-2 py-1 rounded-full">
        {category.title}
      </span>
    </p>
  ));
}
