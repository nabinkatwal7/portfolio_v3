import Link from "next/link";
import { HiNewspaper, HiUserCircle, HiFilm, HiRectangleStack, HiClock } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: 'blog' | 'guestbook' | 'watchlog' | 'project';
  title: string;
  timestamp: string;
  href: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const typeConfig = {
  blog: { icon: HiNewspaper, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  guestbook: { icon: HiUserCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  watchlog: { icon: HiFilm, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  project: { icon: HiRectangleStack, color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
        <HiClock className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)] opacity-50" />
        <p className="text-[var(--color-text-muted)]">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
      <div className="p-6 border-b border-[var(--color-primary)]/10">
        <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Activity</h3>
      </div>
      <div className="divide-y divide-[var(--color-primary)]/10">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });

          return (
            <Link
              key={activity.id}
              href={activity.href}
              className="block p-4 hover:bg-[var(--color-primary)]/5 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {timeAgo}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
