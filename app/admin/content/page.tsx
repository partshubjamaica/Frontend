"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminContent } from "@/lib/admin-data";

export default function AdminContentPage() {
  const [items, setItems] = useState(adminContent);
  const rows = useMemo(() => items.map((item) => [
    item.item,
    item.owner,
    item.queue,
    <StatusBadge key={item.owner} tone={item.status === "Approved" ? "good" : item.status === "Blocked" ? "bad" : "warn"}>{item.status}</StatusBadge>,
    item.reason,
    <div key={`${item.owner}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-green-500/20 px-3 py-2 text-xs font-bold text-green-300" onClick={() => setItems((current) => current.map((entry) => entry.owner === item.owner ? { ...entry, status: "Approved", reason: "Approved by admin" } : entry))}>Approve</button>
      <button className="rounded-lg bg-pink/20 px-3 py-2 text-xs font-bold text-pink" onClick={() => setItems((current) => current.map((entry) => entry.owner === item.owner ? { ...entry, status: "Blocked", reason: "Removed by admin" } : entry))}>Remove</button>
    </div>
  ]), [items]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Content" description="Moderate profile photos, bios, event listings, messages, media uploads, and AI flagged items." action={<AdminActionButton message="Review queue refreshed">Run Review</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Pending review" value={String(items.filter((item) => item.status === "Needs Review" || item.status === "Pending").length)} />
          <AdminMetricCard label="Blocked today" value={String(items.filter((item) => item.status === "Blocked").length)} />
          <AdminMetricCard label="Approved today" value={String(items.filter((item) => item.status === "Approved").length)} />
          <AdminMetricCard label="AI flags" value={String(items.length)} />
        </div>
        <AdminPanel title="Content Moderation Queue" className="mt-6">
          <AdminTable columns={["Item", "Owner", "Queue", "Status", "Reason", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
