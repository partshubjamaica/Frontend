"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminPayments } from "@/lib/admin-data";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState(adminPayments);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const rows = useMemo(() => payments.map((payment) => [
    payment.id,
    payment.user,
    payment.method,
    payment.amount,
    <StatusBadge key={payment.id} tone={payment.status === "Completed" ? "good" : payment.status === "Failed" ? "bad" : "warn"}>{payment.status}</StatusBadge>,
    payment.date,
    <div key={`${payment.id}-actions`} className="flex gap-2">
      <button className="rounded-lg bg-purple px-3 py-2 text-xs font-bold" onClick={() => setSelectedPayment(payment.id)}>View</button>
      <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold" onClick={() => setPayments((current) => current.map((entry) => entry.id === payment.id ? { ...entry, status: "Refunded", amount: entry.amount.startsWith("-") ? entry.amount : `-${entry.amount}` } : entry))}>Refund</button>
    </div>
  ]), [payments]);

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Payments" description="Track PayPal payments, card payments handled through PayPal, refunds, failed renewals, and disputes." action={<AdminActionButton message="Ledger export ready">Export Ledger</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Revenue this month" value="$18,540" detail="+18.3%" />
          <AdminMetricCard label="Completed payments" value={String(payments.filter((payment) => payment.status === "Completed").length)} />
          <AdminMetricCard label="Failed payments" value={String(payments.filter((payment) => payment.status === "Failed").length)} />
          <AdminMetricCard label="Refunds" value={String(payments.filter((payment) => payment.status === "Refunded").length)} />
        </div>
        {selectedPayment && <div className="mt-6 rounded-2xl border border-purple/40 bg-purple/10 p-4 text-sm font-semibold">Viewing payment details for {selectedPayment}. In production this opens the PayPal transaction and internal ledger record.</div>}
        <AdminPanel title="Payment Ledger" className="mt-6">
          <AdminTable columns={["Payment ID", "User", "Method", "Amount", "Status", "Date", "Actions"]} rows={rows} />
        </AdminPanel>
      </section>
    </AppShell>
  );
}
