import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

async function getStats() {
    const supabase = await createClient();

    const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
    const { count: watchlogCount } = await supabase.from('watchlogs').select('*', { count: 'exact', head: true });
    const { count: guestbookCount } = await supabase.from('guestbook').select('*', { count: 'exact', head: true });

    return {
        projects: projectCount || 0,
        watchlogs: watchlogCount || 0,
        guestbook: guestbookCount || 0
    };
}

export default async function AdminOverview() {
  const stats = await getStats();

  return (
    <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold font-[var(--font-syne)] text-[var(--color-primary)]">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col gap-2 transition-all hover:bg-[var(--color-primary)]/10">
                <span className="text-sm uppercase tracking-wider opacity-60 font-semibold">Total Projects</span>
                <span className="text-4xl font-bold text-[var(--color-text-main)]">{stats.projects}</span>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col gap-2 transition-all hover:bg-[var(--color-primary)]/10">
                <span className="text-sm uppercase tracking-wider opacity-60 font-semibold">Watchlogs</span>
                <span className="text-4xl font-bold text-[var(--color-text-main)]">{stats.watchlogs}</span>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex flex-col gap-2 transition-all hover:bg-[var(--color-primary)]/10">
                <span className="text-sm uppercase tracking-wider opacity-60 font-semibold">Guestbook Entries</span>
                <span className="text-4xl font-bold text-[var(--color-text-main)]">{stats.guestbook}</span>
            </div>
        </div>

        <div className="p-8 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10">
            <h2 className="text-xl font-bold mb-2">Welcome back</h2>
            <p className="opacity-80 leading-relaxed max-w-2xl">
                This is your command center. Use the sidebar to manage your portfolio content.
                You can add new projects, update your watch history, or moderate guestbook entries.
            </p>
        </div>
    </div>
  );
}
