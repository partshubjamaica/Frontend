import { PublicPageShell } from "@/components/public-page-shell";

export default function RefundPolicyPage() {
  return (
    <PublicPageShell title="Refund Policy" description="How subscription refunds, billing errors, cancellations, and PayPal payment issues are handled.">
      <h2>Subscriptions</h2>
      <p>Premium and Premium Plus are monthly subscription plans. Canceling stops future renewals but does not automatically refund the current billing period unless required by law or approved by support.</p>
      <h2>Billing Errors</h2>
      <p>If you believe you were charged incorrectly, submit a Help Desk ticket with the PayPal transaction ID, account email, date, and amount.</p>
      <h2>Refund Review</h2>
      <p>Refunds may be considered for duplicate charges, technical issues that prevent access, unauthorized billing, or other qualifying circumstances.</p>
      <h2>PayPal</h2>
      <p>Refunds and disputes may be processed through PayPal. Timing depends on PayPal, banks, and card issuers.</p>
    </PublicPageShell>
  );
}
