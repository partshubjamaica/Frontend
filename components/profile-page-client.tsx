"use client";

import { AppShell } from "@/components/app-shell";
import { ProfileCompletionRing } from "@/components/profile-completion-ring";
import { ProfileEditor } from "@/components/profile-editor";
import { events } from "@/lib/data";
import { useEditableProfile } from "@/lib/use-editable-profile";

export function ProfilePageClient() {
  const { profile, setProfile, completion, missingFields } = useEditableProfile();
  const sections = [
    ["About", profile.bio],
    ["Education", profile.education],
    ["Work", [profile.occupation, profile.industry].filter(Boolean).join(" - ")],
    ["Interests", profile.interests],
    ["Hobbies", profile.hobbies],
    ["Languages", profile.languages],
    ["Location", [profile.city, profile.country].filter(Boolean).join(", ")],
    ["Connection Goals", profile.relationshipGoals],
    ["Events Attending", events.map((event) => event.title).join(", ")]
  ];

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <article className="overflow-hidden rounded-2xl bg-white shadow-soft">
            <img src={profile.photo} alt="Profile photo" className="h-[420px] w-full object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-[Poppins] text-3xl font-bold">{profile.name || "Your profile"}, {profile.age || "--"}</h1>
                  <p className="mt-2 text-navy/60">{profile.country || "Add country"} - Looking for {profile.intent || "connections"}</p>
                </div>
                <ProfileCompletionRing value={completion} size="sm" />
              </div>
            </div>
          </article>
          <div className="space-y-5">
            {sections.map(([title, text]) => (
              <article key={title} className="rounded-2xl bg-white p-6 shadow-soft">
                <h2 className="font-[Poppins] text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-navy/65">{text || "Not added yet"}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ProfileEditor profile={profile} setProfile={setProfile} completion={completion} missingFields={missingFields} />
        </div>
      </section>
    </AppShell>
  );
}
