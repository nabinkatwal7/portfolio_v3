"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Watchlog", href: "/watchlogs" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      exit={{ y: -200 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1, ease: "circInOut" }}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <Link href="/" className={`-m-1.5 p-1.5`}>
          <Image src="/images/logo.png" alt="logo" width={200} height={150} />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-semibold transition-colors duration-300 hover:text-gray-300  ${
                pathname === item.href &&
                "text-[#1B0AFD] border-b-2 border-[#1B0AFD]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#252525] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`-m-1.5 p-1.5 ${pathname === "/" && "text-red-500"}`}
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={200}
                height={150}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <HiXMark aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col gap-10 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-semibold leading-0 ${
                      pathname === item.href && "text-[#1B0AFD]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};

export default Header;
