import { LifeBuoy, Mail, MessageCircle } from "lucide-react";
import { PublicPageShell } from "@/components/public-page-shell";

export default function HelpDeskPage() {
  return (
    <PublicPageShell title="Help Desk" description="Get support for account access, subscriptions, safety reports, events, and profile issues.">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Account Support", "Login, registration, profile updates, verification, and blocked account questions."],
          ["Billing Support", "PayPal subscriptions, debit or credit card checkout through PayPal, refunds, and receipts."],
          ["Safety Support", "Report fake profiles, harassment, suspicious events, or harmful content."]
        ].map(([title, text]) => (
          <section key={title} className="rounded-2xl bg-cloud p-5">
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
      <h2>Submit a Ticket</h2>
      <form className="grid gap-4 rounded-2xl bg-cloud p-5">
        <label className="grid gap-2 font-semibold">Email<input className="rounded-xl border border-navy/10 px-4 py-3 font-normal" type="email" placeholder="you@example.com" /></label>
        <label className="grid gap-2 font-semibold">Topic<select className="rounded-xl border border-navy/10 px-4 py-3 font-normal"><option>Account</option><option>Billing</option><option>Safety</option><option>Events</option><option>Technical issue</option></select></label>
        <label className="grid gap-2 font-semibold">Message<textarea className="min-h-32 rounded-xl border border-navy/10 px-4 py-3 font-normal" placeholder="Tell us what happened and include any relevant dates, usernames, or payment IDs." /></label>
        <button type="button" className="inline-flex w-fit items-center gap-2 rounded-xl bg-pink px-5 py-3 text-sm font-bold text-white"><LifeBuoy className="h-4 w-4" /> Submit Ticket</button>
      </form>
      <h2>Response Channels</h2>
      <p><MessageCircle className="mr-2 inline h-5 w-5 text-purple" /> Support replies may appear in your Konnected support inbox.</p>
      <p><Mail className="mr-2 inline h-5 w-5 text-purple" /> Billing and account replies may also be sent by email.</p>
    </PublicPageShell>
  );
}
