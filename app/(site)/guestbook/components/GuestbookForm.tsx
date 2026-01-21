"use client";

import { addGuestbookEntry } from "@/app/actions/guestbook";
import { Modal } from "@/components/ui/modal";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function GuestbookForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await addGuestbookEntry(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setIsOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl hover:scale-105 transform transition-all"
      >
        Sign Guestbook
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Sign the Guestbook" size="md">
        <form action={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-main)]">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your name"
              className="px-4 py-3 rounded-xl bg-background/50 border border-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none transition-colors text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-[var(--color-text-main)]">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Your message..."
              className="px-4 py-3 rounded-xl bg-background/50 border border-[var(--color-primary)]/10 focus:border-[var(--color-primary)] outline-none transition-colors min-h-[120px] resize-none text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]"
              disabled={isPending}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-lg border border-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/5 transition-colors text-[var(--color-text-main)]"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
