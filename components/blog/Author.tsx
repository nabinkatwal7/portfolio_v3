
import Image from "next/image";

type AuthorProps = {
  author: {
    id?: string;
    name?: string;
    image?: string;
  } | null;
};

export function Author({ author }: AuthorProps) {
  return author?.image || author?.name ? (
    <div className="flex items-center gap-2">
      {author?.image ? (
        <Image
          src={author.image}
          width={80}
          height={80}
          alt={author.name || ""}
          className="bg-[var(--color-bg-light)] size-10 shadow-inner rounded-full object-cover"
        />
      ) : null}
      {author?.name ? <p className="font-medium">{author.name}</p> : null}
    </div>
  ) : null;
}
