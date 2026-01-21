import { GuestbookForm } from '@/app/(site)/guestbook/components/GuestbookForm';
import { getGuestbookEntries } from '@/app/actions/common';
import { AuroraBackground } from '@/components/common/animation/AuroraBackground';
import CTA from '@/components/home/CTA';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="relative overflow-hidden min-h-[50vh] flex flex-col items-center justify-center">
        <AuroraBackground />
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="heading-display">Guestbook</h1>
          <p className="text-body max-w-2xl opacity-80">
            Leave a mark. Say hello, drop a suggestion, or just let me know you were here.
          </p>
          <div className="mt-4">
            <GuestbookForm />
          </div>
        </div>
      </div>

      <div className="bg-alternate py-24 min-h-[50vh]">
        <div className="common-layout max-w-4xl flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="heading-section text-3xl">Recent Messages</h2>
              <span className="text-sm text-[var(--color-text-muted)]">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>

            {entries.length === 0 ? (
              <div className="p-12 rounded-2xl bg-background/30 border border-[var(--color-primary)]/10 text-center">
                <p className="text-body opacity-60 italic text-lg">No messages yet. Be the first to sign!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {entries.map((entry: any) => (
                  <div
                    key={entry.id}
                    className="group p-6 rounded-xl bg-background/30 border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/20 hover:bg-background/40 transition-all duration-200 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-bold text-[var(--color-primary)] text-lg">{entry.name}</span>
                      <span className="text-xs opacity-50 whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-body opacity-80 whitespace-pre-wrap leading-relaxed">{entry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CTA />
    </div>
  );
}
