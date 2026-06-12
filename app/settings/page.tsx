import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/button";
import { SubscriptionReturnHandler } from "@/components/subscription-return-handler";

export default function SettingsPage() {
  const sections = ["Account Settings", "Privacy", "Notifications", "Subscription", "Blocked Users"];
  return (
    <AppShell>
      <section className="mx-auto max-w-5xl">
        <Suspense fallback={null}>
          <SubscriptionReturnHandler />
        </Suspense>
        <h1 className="font-[Poppins] text-3xl font-bold">Settings</h1>
        <div className="mt-6 space-y-5">
          {sections.map((section) => (
            <article key={section} className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div><h2 className="font-[Poppins] text-xl font-bold">{section}</h2><p className="mt-1 text-sm text-navy/60">Manage your {section.toLowerCase()} preferences.</p></div>
                {section === "Subscription" ? <Button href="/pricing">Upgrade Plan</Button> : <label className="inline-flex items-center gap-3 text-sm font-bold"><input type="checkbox" defaultChecked className="h-5 w-5 accent-pink" /> Enabled</label>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
