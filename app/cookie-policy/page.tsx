import { PublicPageShell } from "@/components/public-page-shell";

export default function CookiePolicyPage() {
  return (
    <PublicPageShell title="Cookie Policy" description="How Konnected may use cookies and similar technologies for authentication, preferences, analytics, and security.">
      <h2>Types of Cookies</h2>
      <p>We may use essential cookies for login sessions, security cookies for fraud prevention, preference cookies for settings, and analytics cookies to understand product performance.</p>
      <h2>Third Parties</h2>
      <p>Service providers such as hosting, analytics, payments, and support tools may use cookies or similar technologies subject to their own policies.</p>
      <h2>Your Controls</h2>
      <p>You can manage cookies in your browser settings. Blocking essential cookies may affect login, subscriptions, messaging, and account features.</p>
    </PublicPageShell>
  );
}
