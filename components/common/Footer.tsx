import Link from "next/link";
import {
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Watchlog", href: "/watchlogs" },
  ],
  social: [
    {
      name: "X",
      href: "https://x.com/tim_fringe",
      icon: <FaXTwitter />,
    },
    {
      name: "GitHub",
      href: "https://github.com/nabinkatwal7",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nabin-katwal-1b4a94182/",
      icon: <FaLinkedin />,
    },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-alternate">
      <div className="container-max common-layout py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <Link href="/" className="text-xs font-normal text-[var(--color-text-main)] tracking-wide uppercase mb-2 block">
              Nabin Katwal
            </Link>
            <p className="text-xs text-[var(--color-text-subtle)]">
              © {new Date().getFullYear()}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            {navigation.social.map((item) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                key={item.name}
                href={item.href}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                aria-label={item.name}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
