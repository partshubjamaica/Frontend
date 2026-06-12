"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminUsers } from "@/lib/admin-data";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(adminUsers);
  const pendingCount = users.filter((user) => user.status === "Pending").length;
  const flaggedCount = users.filter((user) => user.status === "Flagged").length;
  const bannedCount = users.filter((user) => user.status === "Banned").length;
  const activeCount = users.filter((user) => user.status === "Active" || user.status === "Verified").length;
  const rows = useMemo(() => users.map((user) => [
    user.name,
    user.email,
    user.country,
    user.plan,
    <StatusBadge key={user.email} tone={user.status === "Banned" || user.status === "Flagged" ? "bad" : user.status === "Pending" ? "warn" : "good"}>{user.status}</StatusBadge>,
    <div key={`${user.email}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-pink px-3 py-2 text-xs font-bold" onClick={() => setUsers((current) => current.map((item) => item.email === user.email ? { ...item, status: "Verified" } : item))}>Verify</button>
      <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold" onClick={() => setUsers((current) => current.map((item) => item.email === user.email ? { ...item, status: item.status === "Banned" ? "Active" : "Banned" } : item))}>{user.status === "Banned" ? "Unban" : "Ban"}</button>
    </div>
  ]), [users]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Users" description="Manage profiles, verification status, bans, account health, and member plans." action={<AdminActionButton message="Invite link created">Invite User</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Active users" value={String(activeCount)} detail="+8.2%" />
          <AdminMetricCard label="Pending verification" value={String(pendingCount)} />
          <AdminMetricCard label="Flagged accounts" value={String(flaggedCount)} />
          <AdminMetricCard label="Banned users" value={String(bannedCount)} />
        </div>
        <AdminPanel title="User Directory" className="mt-6">
          <AdminTable columns={["Name", "Email", "Country", "Plan", "Status", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
