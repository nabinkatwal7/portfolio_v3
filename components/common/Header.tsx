"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dialog, DialogPanel } from "@headlessui/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  HiBars3,
  HiFilm,
  HiHome,
  HiNewspaper,
  HiRectangleStack,
  HiUserCircle,
  HiXMark,
} from "react-icons/hi2";

const navigation = [
  { name: "Home", href: "/", icon: HiHome },
  { name: "About", href: "/about", icon: HiUserCircle },
  { name: "Projects", href: "/projects", icon: HiRectangleStack },
  { name: "Blog", href: "/blog", icon: HiNewspaper },
  { name: "Watchlog", href: "/watchlogs", icon: HiFilm },
];

function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: (typeof navigation)[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseX: any;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 65, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link
      ref={ref}
      href={item.href}
      className="group relative flex items-center justify-center"
    >
      <motion.div
        style={{ width }}
        className={`aspect-square flex items-center justify-center rounded-2xl transition-colors duration-300 ${
          isActive
            ? "bg-[var(--color-primary)] text-[var(--primary-foreground)]"
            : "bg-[var(--color-primary)]/10 text-[var(--color-text-main)] hover:bg-[var(--color-primary)]/20"
        }`}
      >
        <item.icon className="w-1/2 h-1/2" />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-[var(--color-text-main)] text-[var(--background)] px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap">
          {item.name}
        </div>
      </div>
    </Link>
  );
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-center gap-4 px-4 py-3 rounded-full bg-background/80 backdrop-blur-xl border border-[var(--color-primary)]/10 shadow-2xl"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-[var(--font-Logo)] font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity px-3"
          >
            NK
          </Link>

          {/* Divider */}
          <div className="h-8 w-px bg-[var(--color-primary)]/20" />

          {/* Dock Icons */}
          <div className="flex items-center gap-2">
            {navigation.map((item) => (
              <DockIcon
                key={item.name}
                item={item}
                mouseX={mouseX}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-[var(--color-primary)]/20" />

          {/* Theme Toggle */}
          <div className="px-2">
            <ThemeToggle />
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-xl border-b border-[var(--color-primary)]/5"
      >
        <nav className="mx-auto flex items-center justify-between p-4">
          <Link
            href="/"
            className="text-2xl font-[var(--font-Logo)] font-bold text-[var(--color-primary)]"
          >
            Nabin Katwal
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            >
              <span className="sr-only">Open main menu</span>
              <HiBars3 aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--background)] px-6 py-6 sm:max-w-sm border-l border-[var(--color-primary)]/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-[var(--font-Logo)] font-bold text-[var(--color-primary)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nabin Katwal
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-[var(--color-text-main)]"
            >
              <span className="sr-only">Close menu</span>
              <HiXMark aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--color-primary)]/10">
              <div className="space-y-2 py-6 flex flex-col gap-6 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 text-lg font-semibold transition-colors ${
                      pathname === item.href
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text-main)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    <item.icon className="size-6" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Header;
