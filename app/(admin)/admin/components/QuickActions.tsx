import Link from "next/link";
import { HiNewspaper, HiTag, HiUserGroup, HiRectangleStack, HiFilm, HiUserCircle } from "react-icons/hi2";

const actions = [
  { title: "New Blog Post", icon: HiNewspaper, href: "/admin/blog/new" },
  { title: "New Category", icon: HiTag, href: "/admin/blog/categories/new" },
  { title: "New Author", icon: HiUserGroup, href: "/admin/blog/authors/new" },
  { title: "New Project", icon: HiRectangleStack, href: "/admin/projects" },
  { title: "Add Watchlog", icon: HiFilm, href: "/admin/watchlogs" },
  { title: "View Guestbook", icon: HiUserCircle, href: "/admin/guestbook" },
];

export function QuickActions() {
  return (
    <div className="border border-[var(--border)]">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--background-alt)] transition-colors"
          >
            <Icon className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span className="text-sm text-[var(--color-text-main)]">{action.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
