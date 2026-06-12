import { PublicPageShell } from "@/components/public-page-shell";

export default function AccessibilityPage() {
  return (
    <PublicPageShell title="Accessibility" description="Konnected aims to be usable by people with diverse abilities, devices, and assistive technologies.">
      <h2>Our Commitment</h2>
      <p>We work toward accessible navigation, readable contrast, keyboard-friendly controls, labels for form fields, and clear interaction states.</p>
      <h2>Known Focus Areas</h2>
      <p>We continue improving modal focus behavior, image alternatives, form validation messaging, responsive layouts, and compatibility with assistive technology.</p>
      <h2>Feedback</h2>
      <p>If you experience an accessibility barrier, contact us with the page URL, device, browser, assistive technology, and a description of the issue.</p>
    </PublicPageShell>
  );
}
