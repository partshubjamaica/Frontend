import type { EditableProfile } from "@/lib/profile";

export const onboardingPendingKey = "konnected-onboarding-pending";
export const onboardingCompletedKey = "konnected-onboarding-completed";

export type OnboardingQuestion = {
  id: string;
  label: string;
  helper: string;
  options: string[];
  profileField: keyof EditableProfile;
};

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "connection_goal",
    label: "What are you mainly looking for on Konnected?",
    helper: "This helps personalize dating, friendship, networking, and event recommendations.",
    options: ["Serious relationship", "Casual dating", "New friends", "Professional networking", "Events and community"],
    profileField: "relationshipGoals"
  },
  {
    id: "interests",
    label: "Which interests best describe you?",
    helper: "Used for AI match suggestions and profile recommendations.",
    options: ["Carnival and soca", "Food and brunch", "Fitness and wellness", "Entrepreneurship", "Travel", "Music and nightlife"],
    profileField: "interests"
  },
  {
    id: "hobbies",
    label: "What do you enjoy doing in your free time?",
    helper: "Adds conversation starters and better compatibility signals.",
    options: ["Dancing", "Cooking", "Beach days", "Hiking", "Live music", "Sports", "Reading"],
    profileField: "hobbies"
  },
  {
    id: "events",
    label: "What events or places do you want recommended?",
    helper: "Improves event and place discovery.",
    options: ["Carnival", "Brunches", "Concerts", "Networking mixers", "Boat rides", "Cultural festivals", "Restaurants"],
    profileField: "eventPreferences"
  },
  {
    id: "work",
    label: "What industry or professional lane are you in?",
    helper: "Helps with networking matches and professional introductions.",
    options: ["Tech", "Healthcare", "Education", "Finance", "Music and entertainment", "Hospitality", "Creative business"],
    profileField: "industry"
  }
];

export function setOnboardingPending() {
  window.localStorage.setItem(onboardingPendingKey, "true");
  window.localStorage.removeItem(onboardingCompletedKey);
}

export function completeOnboarding() {
  window.localStorage.removeItem(onboardingPendingKey);
  window.localStorage.setItem(onboardingCompletedKey, "true");
}

export function shouldShowOnboarding() {
  return window.localStorage.getItem(onboardingPendingKey) === "true" && window.localStorage.getItem(onboardingCompletedKey) !== "true";
}
