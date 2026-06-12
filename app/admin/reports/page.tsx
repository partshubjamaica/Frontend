"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminReports } from "@/lib/admin-data";

export default function AdminReportsPage() {
  const [reports, setReports] = useState(adminReports);
  const rows = useMemo(() => reports.map((report) => [
    report.type,
    report.subject,
    <StatusBadge key={report.subject} tone={report.priority === "High" ? "bad" : report.priority === "Medium" ? "warn" : "neutral"}>{report.priority}</StatusBadge>,
    report.status,
    report.submitted,
    <div key={`${report.subject}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-purple px-3 py-2 text-xs font-bold" onClick={() => setReports((current) => current.map((item) => item.subject === report.subject ? { ...item, status: "Investigating" } : item))}>Review</button>
      <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold" onClick={() => setReports((current) => current.map((item) => item.subject === report.subject ? { ...item, status: "Resolved" } : item))}>Resolve</button>
    </div>
  ]), [reports]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Reports" description="Triage safety, fake profile, harassment, content, and billing reports." action={<AdminActionButton message="High priority reports escalated" tone="pink">Escalate High Priority</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Open" value={String(reports.filter((report) => report.status !== "Resolved").length)} />
          <AdminMetricCard label="High priority" value={String(reports.filter((report) => report.priority === "High").length)} />
          <AdminMetricCard label="Resolved today" value={String(reports.filter((report) => report.status === "Resolved").length)} />
          <AdminMetricCard label="Avg response" value="21m" />
        </div>
        <AdminPanel title="Moderation Queue" className="mt-6">
          <AdminTable columns={["Type", "Subject", "Priority", "Status", "Submitted", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
