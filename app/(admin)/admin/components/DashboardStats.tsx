import Link from "next/link";
import { HiNewspaper, HiTag, HiUserGroup, HiRectangleStack, HiFilm, HiUserCircle } from "react-icons/hi2";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

function StatCard({ title, value, icon: Icon, href }: StatCardProps) {
  const content = (
    <div className="p-4 border-b border-[var(--border)] hover:bg-[var(--background-alt)] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-[var(--color-text-muted)]" />
          <span className="text-sm text-[var(--color-text-muted)]">{title}</span>
        </div>
        <span className="text-lg font-medium text-[var(--color-text-main)]">
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

interface DashboardStatsProps {
  stats: {
    blogPosts: number;
    categories: number;
    authors: number;
    projects: number;
    watchlogs: number;
    guestbook: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="border border-[var(--border)]">
      <StatCard
        title="Blog Posts"
        value={stats.blogPosts}
        icon={HiNewspaper}
        href="/admin/blog"
      />
      <StatCard
        title="Categories"
        value={stats.categories}
        icon={HiTag}
        href="/admin/blog/categories"
      />
      <StatCard
        title="Authors"
        value={stats.authors}
        icon={HiUserGroup}
        href="/admin/blog/authors"
      />
      <StatCard
        title="Projects"
        value={stats.projects}
        icon={HiRectangleStack}
        href="/admin/projects"
      />
      <StatCard
        title="Watchlogs"
        value={stats.watchlogs}
        icon={HiFilm}
        href="/admin/watchlogs"
      />
      <StatCard
        title="Guestbook"
        value={stats.guestbook}
        icon={HiUserCircle}
        href="/admin/guestbook"
      />
    </div>
  );
}
