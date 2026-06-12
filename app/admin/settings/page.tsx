import { AppShell } from "@/components/app-shell";
import { AdminPageHeader, AdminPanel } from "@/components/admin-ui";

const settings = [
  ["Admin authentication", "Require admin role checks, session timeout, and two-factor enforcement."],
  ["Moderation defaults", "Set auto-hide thresholds for reports, blocked words, duplicate images, and pending verification."],
  ["Notification routing", "Route support, billing, safety, and event approval alerts to the right team inbox."],
  ["PayPal environment", "Switch between sandbox/live credentials and webhook verification settings."],
  ["AI features", "Enable match insights, profile optimization, conversation starters, and event recommendations."]
];

export default function AdminSettingsPage() {
  return (
    <AppShell admin>
      <section className="mx-auto max-w-5xl">
        <AdminPageHeader title="Settings" description="Configure admin security, platform rules, notification routing, payments, and AI feature controls." />
        <div className="mt-6 space-y-5">
          {settings.map(([title, description]) => (
            <AdminPanel key={title} title={title}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <p className="max-w-2xl text-sm leading-6 text-white/65">{description}</p>
                <label className="inline-flex items-center gap-3 text-sm font-bold text-white/80"><input type="checkbox" defaultChecked className="h-5 w-5 accent-pink" /> Enabled</label>
              </div>
            </AdminPanel>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
