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
        </div>
      </div>

      <div className="bg-alternate py-20 min-h-[50vh]">
        <div className="common-layout max-w-3xl flex flex-col gap-16">
          <div className="p-8 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 backdrop-blur-md">
             <h2 className="heading-section text-2xl mb-6">Sign the Guestbook</h2>
             <GuestbookForm />
          </div>

          <div className="flex flex-col gap-6">
             <h2 className="heading-section text-2xl">Recent Messages</h2>
             {entries.length === 0 ? (
                <p className="text-body opacity-60 italic">No messages yet. Be the first!</p>
             ) : (
                <div className="grid gap-6">
                   {entries.map((entry: any) => (
                      <div key={entry.id} className="p-6 rounded-xl bg-background/30 border border-white/5 flex flex-col gap-2">
                         <div className="flex justify-between items-start">
                            <span className="font-bold text-[var(--color-primary)]">{entry.name}</span>
                            <span className="text-xs opacity-40">{new Date(entry.created_at).toLocaleDateString()}</span>
                         </div>
                         <p className="text-body opacity-80 whitespace-pre-wrap">{entry.message}</p>
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
