import Link from "next/link";
import { HiNewspaper, HiTag, HiUserGroup, HiRectangleStack, HiFilm, HiUserCircle } from "react-icons/hi2";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon: Icon, href, trend }: StatCardProps) {
  const content = (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-primary)]/5 to-transparent border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors">
          <Icon className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.isPositive
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          {title}
        </span>
        <span className="text-4xl font-bold text-[var(--color-text-main)]">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
