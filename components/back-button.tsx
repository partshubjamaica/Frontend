"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({
  fallbackHref = "/dashboard",
  light = false,
  className = ""
}: {
  fallbackHref?: string;
  light?: boolean;
  className?: string;
}) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold shadow-sm ${
        light ? "bg-white/10 text-white hover:bg-white/15" : "bg-white text-navy ring-1 ring-navy/10 hover:bg-cloud"
      } ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back
    </button>
  );
}
