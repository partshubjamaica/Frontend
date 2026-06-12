import { PublicPageShell } from "@/components/public-page-shell";

export default function PrivacyPolicyPage() {
  return (
    <PublicPageShell title="Privacy Policy" description="How Konnected collects, uses, shares, and protects information across dating, friendship, networking, events, subscriptions, and support.">
      <p><strong>Effective date:</strong> June 10, 2026</p>
      <h2>Information We Collect</h2>
      <p>We collect account details, profile information, photos, preferences, location signals you choose to provide, messages, matches, event activity, payment status, device data, support tickets, and moderation reports.</p>
      <h2>How We Use Information</h2>
      <p>We use information to operate matching, messaging, event recommendations, profile completion, safety tools, subscriptions, analytics, support, fraud prevention, and product improvement.</p>
      <h2>Payments</h2>
      <p>Paid subscriptions are processed through PayPal. Konnected receives payment status, subscription IDs, plan details, and related transaction metadata, but does not store full debit or credit card numbers.</p>
      <h2>Sharing</h2>
      <p>We may share limited information with service providers such as hosting, database, storage, payments, analytics, email, moderation, and customer support vendors. We may disclose information to comply with law, enforce policies, or protect users.</p>
      <h2>Your Choices</h2>
      <p>You can update profile information, manage subscription preferences, request deletion, adjust notification settings, block users, and contact support for privacy requests.</p>
      <h2>Data Security and Retention</h2>
      <p>We use technical and organizational safeguards appropriate for a social platform. We retain data while your account is active or as needed for safety, legal, billing, and operational purposes.</p>
      <h2>Contact</h2>
      <p>Privacy requests can be submitted through the Help Desk or Contact page.</p>
    </PublicPageShell>
  );
}
