
import { updateContent } from "@/app/actions/admin";
import { getContent } from "@/app/actions/common";
import { seedDatabase } from "@/app/actions/seed";

export default async function AdminSettings() {
  const content = await getContent();

  return (
    <div className="flex flex-col gap-10 max-w-4xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold  text-[var(--color-primary)]">Settings & Content</h1>
          <p className="text-[var(--color-text-muted)]">Manage your site content and system settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content Management */}
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold border-b border-[var(--color-primary)]/10 pb-3 text-[var(--color-text-main)]">Homepage Content</h2>

                <div className="flex flex-col gap-6 p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
                    <form action={updateContent} className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-[var(--color-text-main)]">Hero Title</label>
                        <input type="hidden" name="key" value="hero_title" />
                        <input type="hidden" name="section" value="hero" />
                        <input
                            name="value"
                            defaultValue={content['hero_title']}
                            placeholder="Default Header..."
                            className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 w-full text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors"
                        />
                        <button className="self-end text-sm bg-[var(--color-primary)] px-4 py-2 rounded-lg mt-1 hover:opacity-90 text-white transition-opacity font-medium">
                          Update
                        </button>
                    </form>

                    <div className="h-px bg-[var(--color-primary)]/10" />

                    <form action={updateContent} className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-[var(--color-text-main)]">Hero Bio</label>
                        <input type="hidden" name="key" value="hero_bio" />
                        <input type="hidden" name="section" value="hero" />
                        <textarea
                            name="value"
                            defaultValue={content['hero_bio']}
                            className="px-4 py-3 rounded-lg bg-background/50 border border-[var(--color-primary)]/10 w-full h-32 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]/30 transition-colors resize-none"
                            placeholder="About me..."
                        />
                        <button className="self-end text-sm bg-[var(--color-primary)] px-4 py-2 rounded-lg mt-1 hover:opacity-90 text-white transition-opacity font-medium">
                          Update
                        </button>
                    </form>
                </div>
            </div>

            {/* System Actions */}
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold border-b border-[var(--color-primary)]/10 pb-3 text-[var(--color-text-main)]">System Actions</h2>

                <div className="p-6 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col gap-4">
                    <h3 className="font-bold text-[var(--color-text-main)]">Data Migration</h3>
                    <p className="text-sm opacity-70 text-[var(--color-text-muted)] leading-relaxed">
                        Populate the database with the initial static data for Projects and Watchlogs.
                        Safe to run multiple times (skips duplicates).
                    </p>
                    <form action={async () => {
                        'use server'
                        await seedDatabase()
                    }}>
                        <button className="bg-emerald-600/20 text-emerald-600 border border-emerald-600/20 px-5 py-2.5 rounded-lg hover:bg-emerald-600/30 transition-colors font-medium">
                            Seed Database
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
