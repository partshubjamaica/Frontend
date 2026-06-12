"use client";

import { useState } from "react";

export function AdminActionButton({ children, message, tone = "purple" }: { children: React.ReactNode; message: string; tone?: "purple" | "pink" }) {
  const [active, setActive] = useState(false);
  const color = tone === "pink" ? "bg-pink" : "bg-purple";

  return (
    <button
      type="button"
      onClick={() => {
        setActive(true);
        window.setTimeout(() => setActive(false), 2200);
      }}
      className={`rounded-xl ${color} px-5 py-3 text-sm font-bold`}
      title={active ? message : undefined}
    >
      {active ? message : children}
    </button>
  );
}
