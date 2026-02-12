import Link from "next/link";
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
      <div className="border border-[var(--border)]">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-main)]">Recent Guestbook Entries</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">No guestbook entries yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)]">
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-text-main)]">Recent Guestbook Entries</h3>
        <Link
          href="/admin/guestbook"
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
        >
          View all →
        </Link>
      </div>
      <div>
        {entries.slice(0, 5).map((entry) => {
          const timeAgo = formatDistanceToNow(new Date(entry.created_at), { addSuffix: true });
          const truncatedMessage = entry.message.length > 80
            ? entry.message.substring(0, 80) + '...'
            : entry.message;

          return (
            <div
              key={entry.id}
              className="px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--background-alt)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[var(--color-text-main)]">
                      {entry.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-subtle)]">
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
