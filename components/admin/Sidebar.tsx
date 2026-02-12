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
    <div className="w-56 bg-[var(--background-alt)] border-r border-[var(--border)] h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/" className="text-sm font-medium text-[var(--color-text-main)]">
          Admin
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navigation.map((item) => {
           const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
           return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                   isActive
                   ? 'text-[var(--color-text-main)]'
                   : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`}
              >
                 <item.icon className="w-4 h-4" />
                 {item.name}
              </Link>
           )
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] flex flex-col gap-1">
         <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors w-full text-left"
         >
            <HiArrowRightOnRectangle className="w-4 h-4" />
            Logout
         </button>
         <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
            <HiArrowLeft className="w-4 h-4" />
            Back to Site
         </Link>
      </div>
    </div>
  );
}
