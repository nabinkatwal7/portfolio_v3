"use client";

import { login } from "@/app/actions/auth";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
    } else {
        // Force refresh to trigger server logic (redirect or render dashboard)
        window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col gap-6 p-8 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-center">Admin Access</h1>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-[var(--color-primary)] outline-none"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="px-4 py-3 rounded-full bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
