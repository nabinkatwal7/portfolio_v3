import CommonWrapper from "@/components/common/animation/CommonWrapper";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
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
      name: "Facebook",
      href: "#",
      icon: <FaFacebookSquare />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: <FaInstagram />,
    },
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
    <CommonWrapper>
      <footer className="pb-6">
        <div className=" w-full flex flex-col items-center justify-center content-center overflow-hidden common-layout">
          <div className="flex flex-col items-center justify-center p-6">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={800}
              height={350}
              className="w-full"
            />
          </div>
          <nav
            aria-label="Footer"
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
          >
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-16 flex justify-center gap-x-10">
            {navigation.social.map((item) => (
              <Link
                target="_blank"
                key={item.name}
                href={item.href}
                className=" hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                {item.icon}
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            &copy; {new Date().getFullYear()} Nabin Katwal. All rights reserved.
          </p>
        </div>
      </footer>
    </CommonWrapper>
  );
};

export default Footer;
