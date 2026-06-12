"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateProfileCompletion,
  defaultEditableProfile,
  getMissingProfileFields,
  profileStorageKey,
  type EditableProfile
} from "@/lib/profile";

export function useEditableProfile() {
  const [profile, setProfile] = useState<EditableProfile>(defaultEditableProfile);

  useEffect(() => {
    const stored = window.localStorage.getItem(profileStorageKey);
    if (!stored) return;

    try {
      setProfile({ ...defaultEditableProfile, ...JSON.parse(stored) });
    } catch {
      window.localStorage.removeItem(profileStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  }, [profile]);

  const completion = useMemo(() => calculateProfileCompletion(profile), [profile]);
  const missingFields = useMemo(() => getMissingProfileFields(profile), [profile]);

  return { profile, setProfile, completion, missingFields };
}
