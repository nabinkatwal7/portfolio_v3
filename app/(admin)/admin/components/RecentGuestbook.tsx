import Link from "next/link";
import { HiUserCircle, HiArrowRight, HiClock } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface RecentGuestbookProps {
  entries: GuestbookEntry[];
}

export function RecentGuestbook({ entries }: RecentGuestbookProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--color-primary)]/10">
          <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Guestbook Entries</h3>
        </div>
        <div className="p-8 text-center">
          <HiUserCircle className="w-12 h-12 mx-auto mb-4 text-[var(--color-text-muted)] opacity-50" />
          <p className="text-[var(--color-text-muted)]">No guestbook entries yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 overflow-hidden">
      <div className="p-6 border-b border-[var(--color-primary)]/10 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-main)]">Recent Guestbook Entries</h3>
        <Link
          href="/admin/guestbook"
          className="text-sm text-[var(--color-primary)] hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          View all
          <HiArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="divide-y divide-[var(--color-primary)]/10">
        {entries.slice(0, 5).map((entry) => {
          const timeAgo = formatDistanceToNow(new Date(entry.created_at), { addSuffix: true });
          const truncatedMessage = entry.message.length > 100
            ? entry.message.substring(0, 100) + '...'
            : entry.message;

          return (
            <div
              key={entry.id}
              className="p-4 hover:bg-[var(--color-primary)]/5 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-green-500/10 flex-shrink-0">
                  <HiUserCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[var(--color-text-main)]">
                      {entry.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                      <HiClock className="w-3 h-3" />
                      {timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                    {truncatedMessage}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
