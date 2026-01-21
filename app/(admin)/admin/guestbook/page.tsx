
import { deleteGuestbookEntry } from "@/app/actions/admin";
import { getGuestbookEntries } from "@/app/actions/common";

export default async function AdminGuestbook() {
  const entries = await getGuestbookEntries();

  return (
    <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Guestbook</h1>

        <div className="border border-[var(--color-primary)]/10 rounded-xl overflow-hidden">
            <table className="w-full text-left bg-[var(--color-primary)]/5">
                <thead className="bg-[var(--color-primary)]/10 uppercase text-xs font-bold text-[var(--color-text-muted)] border-b border-[var(--color-primary)]/10">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-primary)]/10">
                    {entries.map((entry: any) => (
                        <tr key={entry.id} className="hover:bg-[var(--color-primary)]/5 transition-colors">
                            <td className="p-4 font-medium text-[var(--color-primary)]">{entry.name}</td>
                            <td className="p-4 opacity-80 max-w-md">{entry.message}</td>
                            <td className="p-4 text-xs opacity-50 whitespace-nowrap">{new Date(entry.created_at).toLocaleDateString()}</td>
                            <td className="p-4 text-right">
                                <form action={async () => {
                                    'use server'
                                    await deleteGuestbookEntry(entry.id)
                                }}>
                                    <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    {entries.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center opacity-50">No messages found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
