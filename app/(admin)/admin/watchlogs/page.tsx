
import { addWatchlog, deleteWatchlog } from "@/app/actions/admin";
import { getWatchlogs } from "@/app/actions/common";

export default async function AdminWatchlogs() {
  const items = await getWatchlogs();

  return (
    <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
             <h1 className="text-3xl font-bold">Watchlogs</h1>
        </div>

        <div className="p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <h3 className="font-bold mb-4 text-lg">Add New Entry</h3>
            <form action={addWatchlog} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input name="title" placeholder="Title" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                <input name="src" placeholder="Image URL" required className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]" />
                <select name="type" className="px-3 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 text-[var(--color-text-main)]">
                    <option value="shows">Show/Cinema</option>
                    <option value="books">Book</option>
                </select>
                <button type="submit" className="bg-[var(--color-primary)] text-white rounded px-4 py-2 hover:opacity-90">Add Entry</button>
            </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {items.map((item: any) => (
                <div key={item.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/5">
                     <img src={item.src} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="font-bold text-sm truncate text-white">{item.title}</p>
                        <p className="text-xs opacity-60 capitalize mb-2 text-white">{item.type}</p>
                        <div className="flex gap-2">
                            <a href={`/admin/watchlogs/${item.id}`} className="flex-1 text-[var(--color-primary)] text-xs bg-black/40 px-2 py-1 rounded hover:bg-black/60 text-center backdrop-blur-sm">Edit</a>
                            <form action={async () => {
                                 'use server'
                                 await deleteWatchlog(item.id)
                            }} className="flex-1">
                                 <button className="text-red-400 text-xs bg-black/40 px-2 py-1 rounded hover:bg-red-500/20 w-full text-center backdrop-blur-sm">Delete</button>
                            </form>
                        </div>
                     </div>
                </div>
            ))}
        </div>
    </div>
  );
}
