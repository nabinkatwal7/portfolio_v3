"use client";

import { addGuestbookEntry } from "@/app/actions/guestbook";



export function GuestbookForm() {
    // We'll wrapper the action to match the expected signature if needed
    // But let's try a standard onSubmit instead of formAction to avoid type mismatch issues with strict TS
    async function handleSubmit(formData: FormData) {
        const res = await addGuestbookEntry(formData);
        if (res?.error) {
            alert(res.error); // Simple alert for now, or state
        } else {
            // clear form
            const form = document.querySelector('form') as HTMLFormElement;
            form.reset();
        }
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-label">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Your name"
                    className="px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-[var(--color-primary)] outline-none transition-colors"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-label">Message</label>
                <textarea
                    name="message"
                    id="message"
                    required
                    placeholder="Your message..."
                    className="px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-[var(--color-primary)] outline-none transition-colors min-h-[120px]"
                />
            </div>
            <button type="submit" className="self-start mt-2 px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition-opacity">
                Sign Guestbook
            </button>
        </form>
    );
}
