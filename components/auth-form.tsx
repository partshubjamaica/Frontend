"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { BackButton } from "@/components/back-button";
import { CountrySelect } from "@/components/country-select";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { setDemoAuthenticated } from "@/lib/auth-state";
import { setOnboardingPending } from "@/lib/onboarding";
import { defaultEditableProfile, profileStorageKey, type EditableProfile } from "@/lib/profile";

export function AuthForm({ mode }: { mode: "login" | "register" | "forgot" }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isForgot) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (isRegister) {
      const name = String(formData.get("fullName") ?? "").trim();
      const country = String(formData.get("country") ?? "").trim();
      const stored = window.localStorage.getItem(profileStorageKey);
      let existingProfile: Partial<EditableProfile> = {};
      try {
        existingProfile = stored ? JSON.parse(stored) as Partial<EditableProfile> : {};
      } catch {
        window.localStorage.removeItem(profileStorageKey);
      }
      window.localStorage.setItem(profileStorageKey, JSON.stringify({
        ...defaultEditableProfile,
        ...existingProfile,
        ...(name ? { name } : {}),
        ...(country ? { country } : {})
      }));
      setOnboardingPending();
    }

    setDemoAuthenticated(true, email);
    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen bg-cloud lg:grid-cols-[1fr_0.9fr]">
      <div className="fixed left-5 top-5 z-20">
        <BackButton fallbackHref="/" />
      </div>
      <div className="fixed right-5 top-5 z-20">
        <ThemeToggle />
      </div>
      <section className="flex items-center justify-center p-6">
        <form onSubmit={submitForm} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
          <Logo />
          <h1 className="mt-8 font-[Poppins] text-3xl font-bold">
            {isRegister ? "Create your account" : isForgot ? "Reset password" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-navy/60">Use email or Google to continue to Konnected.</p>
          {isRegister && <input name="fullName" className="mt-6 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Full name" aria-label="Full name" />}
          {isRegister && <CountrySelect />}
          {!isForgot && <input name="email" className="mt-4 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Email address" aria-label="Email address" type="email" />}
          {isForgot && <input name="email" className="mt-6 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Email address" aria-label="Email address" type="email" />}
          {!isForgot && <input className="mt-4 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Password" aria-label="Password" type="password" />}
          <Button type="submit" className="mt-5 w-full">{isRegister ? "Sign up" : isForgot ? "Send reset link" : "Log in"}</Button>
          {!isForgot && <Button variant="secondary" className="mt-3 w-full">Continue with Google</Button>}
          <div className="mt-6 flex justify-between text-sm font-semibold text-purple">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <a href="/forgot-password">Forgot password</a>
          </div>
        </form>
      </section>
      <section className="hidden bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center lg:block" aria-hidden="true" />
    </main>
  );
}
