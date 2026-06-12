"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/lib/notifications";

export function NotificationBell({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const count = notifications.length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`relative grid h-11 w-11 place-items-center rounded-xl border shadow-sm ${
          light ? "border-white/10 bg-white/10 text-white" : "border-navy/10 bg-white text-navy dark:border-white/10 dark:bg-white/10 dark:text-white"
        }`}
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft dark:border-white/10 dark:bg-[#0f172a]">
          <div className="border-b border-navy/10 p-4 dark:border-white/10">
            <p className="font-[Poppins] font-bold text-navy dark:text-white">Notifications</p>
            <p className="text-xs text-navy/55 dark:text-white/55">{count} new updates</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <Link key={`${notification.type}-${index}`} href={notification.href} onClick={() => setOpen(false)} className="block border-b border-navy/10 p-4 hover:bg-cloud dark:border-white/10 dark:hover:bg-white/10">
                <span className="rounded-full bg-purple/10 px-2 py-1 text-xs font-bold text-purple">{notification.type}</span>
                <p className="mt-2 text-sm font-semibold text-navy dark:text-white">{notification.text}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
