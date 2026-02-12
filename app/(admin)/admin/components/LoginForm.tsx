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
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-xl font-medium text-center text-[var(--color-text-main)]">Admin Access</h1>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="px-4 py-2.5 border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--color-text-main)] text-sm"
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2.5 bg-[var(--color-primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
