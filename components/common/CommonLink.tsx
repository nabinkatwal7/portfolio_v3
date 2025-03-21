import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CommonLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="text-sm/6 font-semibold flex flex-row gap-2 items-center bg-primary px-3.5 py-2.5 rounded-md shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <p>{title}</p>
      <FaArrowRight />
    </Link>
  );
};

export default CommonLink;
