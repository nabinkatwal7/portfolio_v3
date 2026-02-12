import Link from "next/link";
import { HiNewspaper, HiUserCircle, HiFilm, HiRectangleStack } from "react-icons/hi2";
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
      <div className="border border-[var(--border)] p-8 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)]">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <h3 className="text-sm font-medium text-[var(--color-text-main)]">Recent Activity</h3>
      </div>
      <div>
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });

          return (
            <Link
              key={activity.id}
              href={activity.href}
              className="block px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--background-alt)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <Icon className="w-4 h-4 text-[var(--color-text-muted)] mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text-main)] truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-subtle)] mt-0.5">
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
