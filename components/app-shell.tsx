"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/back-button";
import { Logo } from "@/components/logo";
import { NotificationBell } from "@/components/notification-bell";
import { ThemeToggle } from "@/components/theme-toggle";
import { adminNav } from "@/lib/admin-data";
import { isDemoAdmin } from "@/lib/auth-state";
import { nav } from "@/lib/data";

export function AppShell({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const pathname = usePathname();
  const items = admin ? adminNav : nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const sync = () => setShowAdminLink(!admin && isDemoAdmin());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("konnected-auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("konnected-auth-change", sync);
    };
  }, [admin]);

  function renderNav(onNavigate?: () => void) {
    return items.map((item) => {
      const Icon = item.icon;
      const active = item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(`${item.href}/`);
      return (
        <Link key={item.href} href={item.href} onClick={onNavigate} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${active ? "bg-purple text-white" : admin ? "text-white/75 hover:bg-white/10" : "text-navy/70 hover:bg-purple/10 dark:text-white/75"}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
          {item.label}
        </Link>
      );
    });
  }

  function renderAdminLink(onNavigate?: () => void) {
    if (!showAdminLink) return null;
    const active = pathname === "/admin" || pathname.startsWith("/admin/");
    return (
      <Link href="/admin" onClick={onNavigate} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${active ? "bg-purple text-white" : "text-navy/70 hover:bg-purple/10 dark:text-white/75"}`}>
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Admin
      </Link>
    );
  }

  return (
    <div className={admin ? "min-h-screen bg-navy text-white" : "min-h-screen bg-cloud text-navy"}>
      <aside className={`fixed inset-y-0 left-0 z-20 hidden w-64 border-r p-6 lg:block ${admin ? "border-white/10 bg-[#0b1428]" : "border-navy/10 bg-white/80 backdrop-blur"}`}>
        <div className="flex items-center justify-between gap-3">
          <Logo light={admin} />
          <ThemeToggle compact />
        </div>
        <nav className="mt-10 space-y-2">
          {renderNav()}
          {renderAdminLink()}
        </nav>
        <Link href="/" className={`absolute bottom-8 flex items-center gap-3 text-sm ${admin ? "text-white/70" : "text-navy/60"}`}>
          <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
        </Link>
      </aside>
      <div className="lg:pl-64">
        <header className={`sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] items-center border-b px-4 py-4 backdrop-blur lg:hidden ${admin ? "border-white/10 bg-navy/85" : "border-navy/10 bg-white/85"}`}>
          <button type="button" onClick={() => setMobileMenuOpen(true)} className={`grid h-11 w-11 place-items-center rounded-xl border shadow-sm ${admin ? "border-white/10 bg-white/10 text-white" : "border-navy/10 bg-white text-navy dark:border-white/10 dark:bg-white/10 dark:text-white"}`} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="justify-self-center"><Logo light={admin} /></div>
          <NotificationBell light={admin} />
        </header>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm lg:hidden">
            <aside className={`h-full w-80 max-w-[86vw] p-5 shadow-soft ${admin ? "bg-[#0b1428] text-white" : "bg-white text-navy dark:bg-[#0f172a] dark:text-white"}`}>
              <div className="flex items-center justify-between">
                <Logo light={admin} />
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-xl bg-white/10 p-2" aria-label="Close menu"><X /></button>
              </div>
              <div className="mt-5"><ThemeToggle /></div>
              <nav className="mt-6 space-y-2">
                {renderNav(() => setMobileMenuOpen(false))}
                {renderAdminLink(() => setMobileMenuOpen(false))}
              </nav>
              <Link href="/" className={`mt-8 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${admin ? "text-white/70 hover:bg-white/10" : "text-navy/70 hover:bg-purple/10 dark:text-white/70"}`}>
                <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
              </Link>
            </aside>
          </div>
        )}
        <main className="p-4 sm:p-6 lg:p-8">
          {pathname !== "/dashboard" && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <BackButton light={admin} />
              <div className="lg:hidden" />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
