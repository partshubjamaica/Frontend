"use client";

import { Camera, CheckCircle2, Save } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";
import type { EditableProfile } from "@/lib/profile";
import { ProfileCompletionRing } from "@/components/profile-completion-ring";

type Props = {
  profile: EditableProfile;
  setProfile: Dispatch<SetStateAction<EditableProfile>>;
  completion: number;
  missingFields: string[];
};

const intentOptions = ["Dating", "Friendship", "Networking", "Events", "Open to all"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-navy/70">{label}</span>
      {children}
    </label>
  );
}

export function ProfileEditor({ profile, setProfile, completion, missingFields }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof EditableProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function updatePhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") updateField("photo", reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-[Poppins] text-2xl font-bold">Edit Profile</h2>
          <p className="mt-1 text-sm text-navy/60">Complete your profile to improve matches, event recommendations, and networking suggestions.</p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-cloud p-4">
          <ProfileCompletionRing value={completion} size="sm" />
          <div>
            <p className="text-sm font-bold">{completion === 100 ? "Profile complete" : "Profile progress"}</p>
            <p className="mt-1 text-xs leading-5 text-navy/55">
              {completion === 100 ? "You are ready to be discovered." : `${missingFields.length} fields left`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-cloud shadow-soft">
            <img src={profile.photo} alt="Your profile photo" className="h-72 w-full object-cover" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white"
            >
              <Camera className="h-4 w-4" />
              Change photo
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => updatePhoto(event.target.files?.[0])} />
          {missingFields.length > 0 && (
            <div className="mt-4 rounded-2xl bg-pink/10 p-4 text-sm text-navy/70">
              <p className="font-bold text-pink">Missing for 100%</p>
              <p className="mt-2 leading-6">{missingFields.join(", ")}</p>
            </div>
          )}
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <Field label="Name">
            <input value={profile.name} onChange={(event) => updateField("name", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Your name" />
          </Field>
          <Field label="Age">
            <input value={profile.age} onChange={(event) => updateField("age", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" inputMode="numeric" placeholder="32" />
          </Field>
          <Field label="Country">
            <input value={profile.country} onChange={(event) => updateField("country", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Jamaica" />
          </Field>
          <Field label="City">
            <input value={profile.city} onChange={(event) => updateField("city", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Kingston" />
          </Field>
          <Field label="Connection intent">
            <select value={profile.intent} onChange={(event) => updateField("intent", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3">
              {intentOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Education">
            <input value={profile.education} onChange={(event) => updateField("education", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="University, trade school, certification" />
          </Field>
          <Field label="Occupation">
            <input value={profile.occupation} onChange={(event) => updateField("occupation", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Product manager" />
          </Field>
          <Field label="Industry">
            <input value={profile.industry} onChange={(event) => updateField("industry", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Tech, healthcare, music, finance" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="About">
              <textarea value={profile.bio} onChange={(event) => updateField("bio", event.target.value)} className="min-h-28 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Share your personality, culture, and what you are looking for." />
            </Field>
          </div>
          <Field label="Interests">
            <input value={profile.interests} onChange={(event) => updateField("interests", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Carnival, food, fitness" />
          </Field>
          <Field label="Hobbies">
            <input value={profile.hobbies} onChange={(event) => updateField("hobbies", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Dancing, hiking, cooking" />
          </Field>
          <Field label="Languages">
            <input value={profile.languages} onChange={(event) => updateField("languages", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="English, Patois, Spanish" />
          </Field>
          <Field label="Event preferences">
            <input value={profile.eventPreferences} onChange={(event) => updateField("eventPreferences", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Carnival, brunches, concerts" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Connection goals">
              <input value={profile.relationshipGoals} onChange={(event) => updateField("relationshipGoals", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Serious relationship, new friends, business network" />
            </Field>
          </div>
        </form>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
        {completion === 100 ? <CheckCircle2 className="h-5 w-5" /> : <Save className="h-5 w-5" />}
        Changes save automatically on this device.
      </div>
    </article>
  );
}
