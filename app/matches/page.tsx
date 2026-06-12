import { AppShell } from "@/components/app-shell";
import { ProfileCard } from "@/components/profile-card";
import { profiles } from "@/lib/data";

export default function MatchesPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="font-[Poppins] text-3xl font-bold">Matches</h1>
          <select className="rounded-xl border border-navy/10 bg-white px-4 py-3 font-bold"><option>Newest</option><option>Nearby</option><option>Online</option></select>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => <ProfileCard key={profile.name} profile={profile} />)}
        </div>
      </section>
    </AppShell>
  );
}
