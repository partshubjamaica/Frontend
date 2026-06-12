import { PublicPageShell } from "@/components/public-page-shell";

export default function SafetyPage() {
  return (
    <PublicPageShell title="Safety Center" description="Practical guidance for safer matching, messaging, networking, and event attendance.">
      <h2>Before Meeting</h2>
      <p>Keep conversations in Konnected at first, review profile details, watch for pressure or money requests, and tell someone you trust before meeting.</p>
      <h2>Meeting In Person</h2>
      <p>Meet in public places, arrange your own transportation, stay aware of your surroundings, and leave if anything feels uncomfortable.</p>
      <h2>Events and Places</h2>
      <p>Check event details, organizer information, venue policies, ticket links, and local safety guidance before attending.</p>
      <h2>Blocking and Reporting</h2>
      <p>Block users who violate boundaries and report fake profiles, harassment, scams, unsafe event listings, or suspicious payment requests.</p>
      <h2>Emergency</h2>
      <p>If you are in immediate danger, contact local emergency services first. Konnected support is not an emergency response service.</p>
    </PublicPageShell>
  );
}
