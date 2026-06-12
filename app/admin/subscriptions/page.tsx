"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminSubscriptions } from "@/lib/admin-data";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(adminSubscriptions);
  const [managedUser, setManagedUser] = useState<string | null>(null);
  const rows = useMemo(() => subscriptions.map((subscription) => [
    subscription.user,
    subscription.plan,
    subscription.amount,
    <StatusBadge key={subscription.user} tone={subscription.status === "Active" ? "good" : subscription.status === "Past Due" ? "bad" : "neutral"}>{subscription.status}</StatusBadge>,
    subscription.renewal,
    <div key={`${subscription.user}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-purple px-3 py-2 text-xs font-bold" onClick={() => setManagedUser(subscription.user)}>Manage</button>
      <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold" onClick={() => setSubscriptions((current) => current.map((entry) => entry.user === subscription.user ? { ...entry, status: "Cancelled", renewal: "None" } : entry))}>Cancel</button>
    </div>
  ]), [subscriptions]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Subscriptions" description="Manage Premium and Premium Plus members, upgrades, downgrades, cancellations, and renewal risk." action={<AdminActionButton message="PayPal sync queued">Sync PayPal</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Premium users" value={String(subscriptions.filter((item) => item.plan === "Premium").length)} />
          <AdminMetricCard label="Premium Plus" value={String(subscriptions.filter((item) => item.plan === "Premium Plus").length)} />
          <AdminMetricCard label="Past due" value={String(subscriptions.filter((item) => item.status === "Past Due").length)} />
          <AdminMetricCard label="MRR" value="$42,180" detail="+18.3%" />
        </div>
        {managedUser && <div className="mt-6 rounded-2xl border border-purple/40 bg-purple/10 p-4 text-sm font-semibold">Managing subscription for {managedUser}. In production this connects to PayPal plan management.</div>}
        <AdminPanel title="Plan Management" className="mt-6">
          <AdminTable columns={["User", "Plan", "Amount", "Status", "Renewal", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
