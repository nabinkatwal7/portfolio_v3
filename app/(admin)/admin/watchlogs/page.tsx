
import { addWatchlog, deleteWatchlog } from "@/app/actions/admin";
import { getWatchlogsPaginated } from "@/app/actions/common";
import { Pagination } from "@/components/common/Pagination";

export const dynamic = 'force-dynamic';

export default async function AdminWatchlogs({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { data: items, totalPages, total } = await getWatchlogsPaginated(currentPage, 30);

  return (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Watchlogs</h1>
          <p className="text-[var(--color-text-muted)]">Manage your watch history and book collection</p>
        </div>

        <div className="p-8 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <h3 className="font-bold mb-6 text-lg text-[var(--color-text-main)]">Add New Entry</h3>
            <form action={addWatchlog} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  name="title"
                  placeholder="Title"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                />
                <input
                  name="src"
                  placeholder="Image URL"
                  required
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                />
                <select
                  name="type"
                  className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                >
                    <option value="shows">Show/Cinema</option>
                    <option value="books">Book</option>
                </select>
                <button
                  type="submit"
                  className="bg-[var(--color-primary)] text-white rounded-lg px-4 py-3 hover:opacity-90 transition-opacity font-medium"
                >
                  Add Entry
                </button>
            </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-text-main)]">All Entries</h2>
            <span className="text-sm text-[var(--color-text-muted)]">
              {total} {total === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.length === 0 ? (
                <div className="col-span-full p-12 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-center">
                  <p className="text-[var(--color-text-muted)] opacity-60">No entries yet. Add your first watchlog!</p>
                </div>
              ) : (
                items.map((item: any) => (
                  <div key={item.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all">
                     <img src={item.src} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="font-bold text-sm truncate text-white mb-1">{item.title}</p>
                        <p className="text-xs opacity-70 capitalize mb-3 text-white">{item.type}</p>
                        <div className="flex gap-2">
                            <a
                              href={`/admin/watchlogs/${item.id}`}
                              className="flex-1 text-[var(--color-primary)] text-xs bg-black/60 px-2 py-1.5 rounded-lg hover:bg-black/80 text-center backdrop-blur-sm transition-colors font-medium"
                            >
                              Edit
                            </a>
                            <form action={async () => {
                                 'use server'
                                 await deleteWatchlog(item.id)
                            }} className="flex-1">
                                 <button className="text-red-400 text-xs bg-black/60 px-2 py-1.5 rounded-lg hover:bg-red-500/20 w-full text-center backdrop-blur-sm transition-colors font-medium">
                                   Delete
                                 </button>
                            </form>
                        </div>
                     </div>
                  </div>
                ))
              )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/watchlogs"
            />
          )}
        </div>
    </div>
  );
}
