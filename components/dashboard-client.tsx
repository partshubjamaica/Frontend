"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AIRecommendationsPanel } from "@/components/ai-recommendations-panel";
import { ProfileCard } from "@/components/profile-card";
import { ProfileCompletionRing } from "@/components/profile-completion-ring";
import { ProfileEditor } from "@/components/profile-editor";
import { OnboardingModal } from "@/components/onboarding-modal";
import { profiles } from "@/lib/data";
import { useEditableProfile } from "@/lib/use-editable-profile";

export function DashboardClient() {
  const { profile, setProfile, completion, missingFields } = useEditableProfile();
  const cards = ["New Matches|12|People nearby liked you", "Messages|12|Unread conversations", "Events|5|Happening this week", "Profile Views|120|+15% this week"];

  return (
    <AppShell>
      <OnboardingModal setProfile={setProfile} />
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <h1 className="font-[Poppins] text-3xl font-bold">Welcome back, {profile.name || "there"}</h1>
            <p className="mt-1 text-navy/60">Here is what is happening in your world.</p>
          </div>
          <Link href="#edit-profile" className="flex items-center gap-4 rounded-2xl bg-white p-4 text-sm font-bold shadow-soft hover:-translate-y-0.5">
            <ProfileCompletionRing value={completion} size="sm" />
            <span>
              <span className="block">{completion}% profile complete</span>
              <span className="mt-1 block text-xs font-semibold text-navy/50">
                {completion === 100 ? "Your profile is ready" : `${missingFields.length} fields remaining`}
              </span>
            </span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {cards.map((item) => {
            const [title, value, detail] = item.split("|");
            return <article key={title} className="rounded-2xl bg-white p-5 shadow-soft"><p className="text-sm font-bold text-navy/65">{title}</p><strong className="mt-3 block text-3xl text-purple">{value}</strong><span className="text-sm text-navy/55">{detail}</span></article>;
          })}
        </div>

        <div id="edit-profile" className="mt-10 scroll-mt-6">
          <ProfileEditor profile={profile} setProfile={setProfile} completion={completion} missingFields={missingFields} />
        </div>

        <div className="mt-10">
          <AIRecommendationsPanel profile={profile} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-[Poppins] text-2xl font-bold">People you might like</h2>
          <Link href="/discover" className="text-sm font-bold text-purple">View all</Link>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {profiles.slice(1).map((suggestedProfile) => <ProfileCard key={suggestedProfile.name} profile={suggestedProfile} />)}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-soft"><h3 className="font-bold">Recent Activity</h3><p className="mt-3 text-sm text-navy/60">Kevin liked your profile. Jamaica Carnival was saved. Mikayla sent a new message.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-soft"><h3 className="font-bold">Quick Actions</h3><div className="mt-4 flex flex-wrap gap-3"><Link className="rounded-xl bg-pink px-4 py-3 text-sm font-bold text-white" href="/events">Find events</Link><Link className="rounded-xl bg-purple px-4 py-3 text-sm font-bold text-white" href="/discover">Swipe now</Link><Link className="rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white" href="#edit-profile">Edit profile</Link></div></article>
        </div>
      </section>
    </AppShell>
  );
}
