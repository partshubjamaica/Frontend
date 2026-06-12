"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminEvents } from "@/lib/admin-data";

export default function AdminEventsPage() {
  const [eventRows, setEventRows] = useState(adminEvents);
  const pending = eventRows.filter((event) => event.status === "Pending" || event.status === "Needs Review").length;
  const rows = useMemo(() => eventRows.map((event) => [
    event.title,
    event.organizer,
    event.category,
    event.date,
    event.attendees,
    <StatusBadge key={event.title} tone={event.status === "Approved" ? "good" : event.status === "Pending" ? "warn" : "bad"}>{event.status}</StatusBadge>,
    <div key={`${event.title}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-green-500/20 px-3 py-2 text-xs font-bold text-green-300" onClick={() => setEventRows((current) => current.map((item) => item.title === event.title ? { ...item, status: "Approved" } : item))}>Approve</button>
      <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold" onClick={() => setEventRows((current) => current.map((item) => item.title === event.title ? { ...item, status: "Needs Review" } : item))}>Review</button>
    </div>
  ]), [eventRows]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Events" description="Approve events and places, audit organizers, and keep Caribbean recommendations high quality." action={<AdminActionButton message="Featured event draft created">Create Featured Event</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Published" value={String(eventRows.filter((event) => event.status === "Approved").length)} />
          <AdminMetricCard label="Pending approval" value={String(pending)} />
          <AdminMetricCard label="Featured this week" value="12" />
          <AdminMetricCard label="Reported listings" value="4" />
        </div>
        <AdminPanel title="Event Approval Queue" className="mt-6">
          <AdminTable columns={["Title", "Organizer", "Category", "Date", "Attendees", "Status", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
