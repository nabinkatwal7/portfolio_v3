
import { updateContent } from "@/app/actions/admin";
import { getContent } from "@/app/actions/common";
import { seedDatabase } from "@/app/actions/seed";

export default async function AdminSettings() {
  const content = await getContent();

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
        <h1 className="text-3xl font-bold">Settings & Content</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content Management */}
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold border-b border-[var(--color-primary)]/10 pb-2">Homepage Content</h2>

                <div className="flex flex-col gap-6 p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
                    <form action={updateContent} className="flex flex-col gap-2">
                        <label className="text-sm opacity-60">Hero Title</label>
                        <input type="hidden" name="key" value="hero_title" />
                        <input type="hidden" name="section" value="hero" />
                        <input
                            name="value"
                            defaultValue={content['hero_title']}
                            placeholder="Default Header..."
                            className="px-4 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 w-full text-[var(--color-text-main)]"
                        />
                        <button className="self-end text-xs bg-[var(--color-primary)] px-3 py-1 rounded mt-2 hover:opacity-80 text-white">Update</button>
                    </form>

                    <div className="h-px bg-[var(--color-primary)]/10" />

                    <form action={updateContent} className="flex flex-col gap-2">
                        <label className="text-sm opacity-60">Hero Bio</label>
                        <input type="hidden" name="key" value="hero_bio" />
                        <input type="hidden" name="section" value="hero" />
                        <textarea
                            name="value"
                            defaultValue={content['hero_bio']}
                            className="px-4 py-2 rounded bg-background/50 border border-[var(--color-primary)]/10 w-full h-32 text-[var(--color-text-main)]"
                            placeholder="About me..."
                        />
                        <button className="self-end text-xs bg-[var(--color-primary)] px-3 py-1 rounded mt-2 hover:opacity-80 text-white">Update</button>
                    </form>
                </div>
            </div>

            {/* System Actions */}
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold border-b border-[var(--color-primary)]/10 pb-2">System Actions</h2>

                <div className="p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col gap-4">
                    <h3 className="font-bold">Data Migration</h3>
                    <p className="text-sm opacity-60">
                        Populate the database with the initial static data for Projects and Watchlogs.
                        Safe to run multiple times (skips duplicates).
                    </p>
                    <form action={async () => {
                        'use server'
                        await seedDatabase()
                    }}>
                        <button className="bg-emerald-600/20 text-emerald-600 border border-emerald-600/20 px-4 py-2 rounded hover:bg-emerald-600/30 transition-colors">
                            Seed Database
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
