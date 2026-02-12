"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    HiBars3,
    HiXMark,
} from "react-icons/hi2";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Watchlog", href: "/watchlogs" },
  { name: "Guestbook", href: "/guestbook" },
  { name: "Playground", href: "/playground" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 hidden lg:block bg-[var(--background)] border-b border-[var(--border)]">
        <div className="container-max px-5">
          <nav className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="text-xs font-normal text-[var(--color-text-main)] tracking-wide uppercase"
            >
              Nabin Katwal
            </Link>

            <div className="flex items-center gap-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-xs font-normal transition-colors ${
                      isActive
                        ? "text-[var(--color-text-main)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[var(--background)] border-b border-[var(--border)]">
        <nav className="container-max px-5 flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-xs font-normal text-[var(--color-text-main)] tracking-wide uppercase"
          >
            Nabin Katwal
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <HiBars3 aria-hidden="true" className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-50 bg-black/20"
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--background)] px-6 py-6 sm:max-w-sm border-l border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-text-main)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nabin Katwal
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <HiXMark aria-hidden="true" className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-xs font-normal transition-colors border-b border-[var(--border)] last:border-b-0 ${
                    isActive
                      ? "text-[var(--color-text-main)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Header;
