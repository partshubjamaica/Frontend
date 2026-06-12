import { photos } from "@/lib/data";

export type EditableProfile = {
  photo: string;
  name: string;
  age: string;
  country: string;
  city: string;
  intent: string;
  education: string;
  occupation: string;
  industry: string;
  bio: string;
  interests: string;
  hobbies: string;
  languages: string;
  eventPreferences: string;
  relationshipGoals: string;
};

export const profileStorageKey = "konnected-profile";

export const defaultEditableProfile: EditableProfile = {
  photo: photos.aaliyah,
  name: "Tasha",
  age: "32",
  country: "Jamaica",
  city: "Kingston",
  intent: "Dating",
  education: "",
  occupation: "Creative strategist",
  industry: "",
  bio: "Caribbean creative who loves soca, food pop-ups, travel, and meeting people with shared culture.",
  interests: "Carnival, entrepreneurship, beach days",
  hobbies: "",
  languages: "",
  eventPreferences: "Carnival, brunches, networking mixers",
  relationshipGoals: ""
};

export const profileCompletionFields: Array<{ key: keyof EditableProfile; label: string }> = [
  { key: "photo", label: "Profile photo" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "intent", label: "Intent" },
  { key: "education", label: "Education" },
  { key: "occupation", label: "Occupation" },
  { key: "industry", label: "Industry" },
  { key: "bio", label: "About" },
  { key: "interests", label: "Interests" },
  { key: "hobbies", label: "Hobbies" },
  { key: "languages", label: "Languages" },
  { key: "eventPreferences", label: "Event preferences" },
  { key: "relationshipGoals", label: "Connection goals" }
];

export function calculateProfileCompletion(profile: EditableProfile) {
  const completed = profileCompletionFields.filter(({ key }) => String(profile[key]).trim().length > 0).length;
  return Math.round((completed / profileCompletionFields.length) * 100);
}

export function getMissingProfileFields(profile: EditableProfile) {
  return profileCompletionFields.filter(({ key }) => !String(profile[key]).trim()).map((field) => field.label);
}
