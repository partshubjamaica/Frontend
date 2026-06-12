"use client";

import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isDemoAdmin, isDemoAuthenticated, setDemoAuthenticated } from "@/lib/auth-state";
import { Button } from "@/components/button";

export function NavAuthActions() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

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

  function logOut() {
    setDemoAuthenticated(false);
    setAuthenticated(false);
    router.push("/");
  }

  if (authenticated) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {admin && (
          <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple px-4 text-sm font-bold text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#6d38c6]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Admin
          </Link>
        )}
        <button
          type="button"
          onClick={logOut}
          className="inline-flex min-h-11 overflow-hidden rounded-xl bg-navy text-sm font-bold text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#111d35]"
        >
          <span className="px-5 py-3">Log out</span>
          <span className="grid min-w-12 place-items-center border-l border-white/15 bg-white/10">
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Button href="/login" variant="secondary">Log in</Button>
      <Button href="/register">Sign up</Button>
    </div>
  );
}
