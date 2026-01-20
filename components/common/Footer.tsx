"use client";
import { slideUp, staggerContainer } from "@/utils/motion-variants";
import { motion } from "framer-motion";
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
    <footer className="py-12 border-t border-[var(--color-primary)]/10">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="common-layout max-w-7xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <motion.div variants={slideUp} className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-3xl font-[var(--font-Logo)] font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity mb-2">
              Nabin Katwal
            </Link>
            <p className="text-sm text-[var(--color-text-main)]/50 dark:text-[var(--color-text-main)]/30">
              © {new Date().getFullYear()} Built with passion.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            variants={slideUp}
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm"
          >
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-[var(--color-primary)] text-[var(--color-text-main)]/80 dark:text-[var(--color-text-main)]/60 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div variants={slideUp} className="flex justify-center gap-x-6">
            {navigation.social.map((item) => (
              <Link
                target="_blank"
                key={item.name}
                href={item.href}
                className="text-xl hover:text-[var(--color-primary)] text-[var(--color-text-main)]/70 dark:text-[var(--color-text-main)]/40 hover:scale-110 transition-all duration-300"
              >
                <span className="sr-only">{item.name}</span>
                {item.icon}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
