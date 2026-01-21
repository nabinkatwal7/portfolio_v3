"use client";

import { logout } from "@/app/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft, HiArrowRightOnRectangle, HiCog, HiFilm, HiHome, HiNewspaper, HiRectangleStack, HiUserCircle, HiTag, HiUserGroup } from "react-icons/hi2";

const navigation = [
  { name: "Overview", href: "/admin", icon: HiHome },
  { name: "Blog", href: "/admin/blog", icon: HiNewspaper },
  { name: "Categories", href: "/admin/blog/categories", icon: HiTag },
  { name: "Authors", href: "/admin/blog/authors", icon: HiUserGroup },
  { name: "Guestbook", href: "/admin/guestbook", icon: HiUserCircle },
  { name: "Watchlogs", href: "/admin/watchlogs", icon: HiFilm },
  { name: "Projects", href: "/admin/projects", icon: HiRectangleStack },
  { name: "Settings", href: "/admin/settings", icon: HiCog },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-alternate border-r border-[var(--color-primary)]/10 h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-[var(--color-primary)]/10 flex items-center gap-2">
        <Link href="/" className="font-bold text-xl tracking-tight text-[var(--color-primary)]">
           Admin Panel
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navigation.map((item) => {
           const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
           return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                   isActive
                   ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                   : 'text-[var(--color-text-muted)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-text-main)]'
                }`}
              >
                 <item.icon className="w-5 h-5" />
                 {item.name}
              </Link>
           )
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-primary)]/10 flex flex-col gap-2">
         <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all w-full text-left"
         >
            <HiArrowRightOnRectangle className="w-5 h-5" />
            Logout
         </button>
         <Link href="/" className="flex items-center gap-3 px-4 py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-primary)]/5 rounded-xl transition-all">
            <HiArrowLeft className="w-5 h-5" />
            Back to Site
         </Link>
      </div>
    </div>
  );
}
