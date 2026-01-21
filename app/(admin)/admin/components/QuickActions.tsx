import Link from "next/link";
import { HiPlus, HiNewspaper, HiTag, HiUserGroup, HiRectangleStack, HiFilm, HiUserCircle } from "react-icons/hi2";

const actions = [
  {
    title: "New Blog Post",
    description: "Create a new blog post",
    icon: HiNewspaper,
    href: "/admin/blog/new",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    title: "New Category",
    description: "Add a blog category",
    icon: HiTag,
    href: "/admin/blog/categories/new",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    title: "New Author",
    description: "Add a blog author",
    icon: HiUserGroup,
    href: "/admin/blog/authors/new",
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-400",
  },
  {
    title: "New Project",
    description: "Add a new project",
    icon: HiRectangleStack,
    href: "/admin/projects",
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-400",
  },
  {
    title: "Add Watchlog",
    description: "Add a show or book",
    icon: HiFilm,
    href: "/admin/watchlogs",
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-400",
  },
  {
    title: "View Guestbook",
    description: "Moderate entries",
    icon: HiUserCircle,
    href: "/admin/guestbook",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
      <div className="p-6 border-b border-[var(--color-primary)]/10">
        <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`group p-4 rounded-lg bg-gradient-to-br ${action.color} border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20 transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-[var(--color-primary)]/10 ${action.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {action.description}
                  </p>
                </div>
                <HiPlus className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
