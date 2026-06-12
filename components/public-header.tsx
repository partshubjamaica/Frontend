"use client";

import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { isDemoAdmin, isDemoAuthenticated } from "@/lib/auth-state";
import { nav } from "@/lib/data";
import { Logo } from "@/components/logo";
import { NavAuthActions } from "@/components/nav-auth-actions";
import { NotificationBell } from "@/components/notification-bell";
import { ThemeToggle } from "@/components/theme-toggle";

export function PublicHeader() {
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAuthenticated(isDemoAuthenticated());
      setAdmin(isDemoAdmin());
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("konnected-auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("konnected-auth-change", sync);
    };
  }, []);

  if (authenticated) {
    return (
      <header className="mx-auto max-w-7xl px-5 py-4 md:py-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center md:flex md:justify-between">
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-xl border border-navy/10 bg-white text-navy shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="justify-self-center md:justify-self-auto"><Logo /></div>
          <nav className="hidden gap-8 text-sm font-semibold md:flex">
            <a href="/">Home</a>
            <a href="/#features">Features</a>
            <a href="/events">Events</a>
            <a href="/pricing">Pricing</a>
            <a href="/dashboard">Dashboard</a>
            {admin && <a href="/admin">Admin</a>}
          </nav>
          <div className="flex items-center gap-3 justify-self-end">
            <div className="hidden md:block"><ThemeToggle compact /></div>
            <NotificationBell />
          </div>
        </div>
        {open && (
          <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm md:hidden">
            <aside className="h-full w-80 max-w-[86vw] bg-white p-5 shadow-soft dark:bg-[#0f172a]">
              <div className="flex items-center justify-between">
                <Logo />
                <button type="button" onClick={() => setOpen(false)} className="rounded-xl bg-cloud p-2 dark:bg-white/10" aria-label="Close menu"><X /></button>
              </div>
              <div className="mt-5"><ThemeToggle /></div>
              <nav className="mt-6 space-y-2">
                {nav.map((item) => {
                  const Icon = item.icon;
                  return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-navy/75 hover:bg-purple/10 dark:text-white/75"><Icon className="h-4 w-4" />{item.label}</Link>;
                })}
                <Link href="/pricing" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-navy/75 hover:bg-purple/10 dark:text-white/75">Pricing</Link>
                {admin && <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-purple hover:bg-purple/10"><ShieldCheck className="h-4 w-4" />Admin</Link>}
              </nav>
              <div className="mt-6"><NavAuthActions /></div>
            </aside>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:py-6">
      <Logo />
      <nav className="hidden gap-8 text-sm font-semibold md:flex">
        <a href="/">Home</a>
        <a href="/#features">Features</a>
        <a href="/events">Events</a>
        <a href="/pricing">Pricing</a>
      </nav>
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <ThemeToggle compact />
        <NavAuthActions />
      </div>
    </header>
  );
}
