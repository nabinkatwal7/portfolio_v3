import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const CommonLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-[var(--primary-foreground)] shadow-xl hover:opacity-90 active:scale-95 transition-all duration-300"
    >
      <span>{title}</span>
      <HiArrowRight aria-hidden="true" className="size-5" />
    </Link>
  );
};

export default CommonLink;
