import { GuestbookForm } from "@/app/(site)/guestbook/components/GuestbookForm";
import { getGuestbookEntries } from "@/app/actions/common";
import CTA from "@/components/home/CTA";
import type { Metadata } from "next";

// Revalidate every 30 seconds for guestbook (frequent updates)
export const revalidate = 30;

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Leave a message in the guestbook — say hello, drop a suggestion, or let me know you were here.",
  openGraph: {
    title: "Guestbook | Nabin Katwal",
    description:
      "Leave a message in the guestbook — say hello, drop a suggestion, or let me know you were here.",
  },
};

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <>
      <section className="section-padding pt-14 lg:pt-16">
        <div className="container-max common-layout flex flex-col gap-6">
          <h1 className="heading-display">Guestbook</h1>
          <p className="text-body max-w-2xl">
            Leave a mark. Say hello, drop a suggestion, or just let me know you
            were here.
          </p>
          <div className="mt-2">
            <GuestbookForm />
          </div>
        </div>
      </section>

      <section className="section-padding bg-alternate border-t border-[var(--border)]">
        <div className="container-max common-layout max-w-3xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="heading-section">Recent Messages</h2>
            <span className="text-sm text-[var(--color-text-muted)]">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="p-12 border border-[var(--border)] text-center">
              <p className="text-body text-[var(--color-text-muted)]">
                No messages yet. Be the first to sign!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {entries.map((entry: any) => (
                <div
                  key={entry.id}
                  className="pb-6 border-b border-[var(--border)] last:border-b-0 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-medium text-[var(--color-text-main)]">
                      {entry.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-subtle)] whitespace-nowrap">
                      {new Date(entry.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-body whitespace-pre-wrap">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
