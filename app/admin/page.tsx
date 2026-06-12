import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, AdminTable, StatusBadge } from "@/components/admin-ui";
import { adminAlerts, adminMetrics, adminUsers } from "@/lib/admin-data";

export default function AdminPage() {
  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Overview" description="High-level health for Konnected users, revenue, moderation, and support operations." action={<AdminActionButton message="Export prepared">Export</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {adminMetrics.map(([label, value, change]) => <AdminMetricCard key={label} label={label} value={value} detail={`${change} this month`} />)}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <AdminPanel title="User Growth"><div className="h-64 rounded-xl bg-gradient-to-t from-purple/40 to-pink/10" /></AdminPanel>
          <AdminPanel title="Operational Alerts"><div className="grid gap-3 sm:grid-cols-2">{adminAlerts.map(({ label, value, icon }) => <AdminMetricCard key={label} label={label} value={value} icon={icon} />)}</div></AdminPanel>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <AdminPanel title="Recent Signups">
            <AdminTable columns={["User", "Country", "Plan", "Status"]} rows={adminUsers.slice(0, 3).map((user) => [user.name, user.country, user.plan, <StatusBadge key={user.name} tone="good">{user.status}</StatusBadge>])} />
          </AdminPanel>
          <AdminPanel title="Recommended Actions">
            <div className="space-y-3 text-sm text-white/75"><p>Review high-priority reports.</p><p>Respond to unanswered support tickets.</p><p>Verify pending profile submissions.</p><p>Investigate failed PayPal renewals.</p></div>
          </AdminPanel>
        </div>
      </section>
    </AppShell>
  );
}
