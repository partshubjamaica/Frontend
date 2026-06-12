import { PublicPageShell } from "@/components/public-page-shell";

export default function ContactPage() {
  return (
    <PublicPageShell title="Contact" description="Reach Konnected for support, business partnerships, event inquiries, safety concerns, and billing questions.">
      <h2>Support</h2>
      <p>For account, billing, safety, and technical issues, use the Help Desk so your request can be tracked as a ticket.</p>
      <h2>Business and Events</h2>
      <p>For partnerships, Caribbean event promotion, sponsorship, or venue recommendations, include your organization, city, dates, and links.</p>
      <h2>Contact Form</h2>
      <form className="grid gap-4 rounded-2xl bg-cloud p-5">
        <input className="rounded-xl border border-navy/10 px-4 py-3" placeholder="Name" />
        <input className="rounded-xl border border-navy/10 px-4 py-3" placeholder="Email" type="email" />
        <textarea className="min-h-32 rounded-xl border border-navy/10 px-4 py-3" placeholder="How can we help?" />
        <button type="button" className="w-fit rounded-xl bg-pink px-5 py-3 text-sm font-bold text-white">Send Message</button>
      </form>
    </PublicPageShell>
  );
}
