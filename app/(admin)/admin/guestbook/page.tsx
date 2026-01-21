
import { deleteGuestbookEntry } from "@/app/actions/admin";
import { getGuestbookEntries } from "@/app/actions/common";

export default async function AdminGuestbook() {
  const entries = await getGuestbookEntries();

  return (
    <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Guestbook</h1>
          <p className="text-[var(--color-text-muted)]">Manage guestbook entries</p>
        </div>

        <div className="border border-[var(--color-primary)]/10 rounded-xl overflow-hidden bg-background/30">
            <table className="w-full text-left">
                <thead className="bg-[var(--color-primary)]/10 uppercase text-xs font-bold text-[var(--color-text-muted)] border-b border-[var(--color-primary)]/10">
                    <tr>
                        <th className="p-5">Name</th>
                        <th className="p-5">Message</th>
                        <th className="p-5">Date</th>
                        <th className="p-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-primary)]/10">
                    {entries.map((entry: any) => (
                        <tr key={entry.id} className="hover:bg-[var(--color-primary)]/5 transition-colors">
                            <td className="p-5 font-medium text-[var(--color-primary)]">{entry.name}</td>
                            <td className="p-5 opacity-80 max-w-md text-[var(--color-text-main)]">{entry.message}</td>
                            <td className="p-5 text-xs opacity-50 whitespace-nowrap text-[var(--color-text-muted)]">
                              {new Date(entry.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="p-5 text-right">
                                <form action={async () => {
                                    'use server'
                                    await deleteGuestbookEntry(entry.id)
                                }}>
                                    <button className="text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                                      Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    {entries.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-12 text-center opacity-50 text-[var(--color-text-muted)]">
                              No messages found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
