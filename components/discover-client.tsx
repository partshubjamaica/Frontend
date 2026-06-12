"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { CountrySelect } from "@/components/country-select";
import { ProfileCard } from "@/components/profile-card";
import { profiles } from "@/lib/data";
import { countries } from "@/lib/countries";

type CountryValue = {
  code: string;
  name: string;
  flagUrl: string;
};

const allCountries: CountryValue = { code: "ALL", name: "All countries", flagUrl: "" };
const intents = ["All intents", "Dating", "Friendship", "Networking"];

function parseDistance(distance: string) {
  return Number(distance.replace(/[^\d]/g, "")) || 0;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
}

export function DiscoverClient() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<CountryValue>(allCountries);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(65);
  const [distance, setDistance] = useState(50);
  const [intent, setIntent] = useState("All intents");

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    const profileSuggestions = profiles.flatMap((profile) => [profile.name, profile.country, profile.intent]);
    const countrySuggestions = countries.map((item) => item.name);
    return Array.from(new Set([...profileSuggestions, ...countrySuggestions]))
      .filter((item) => item.toLowerCase().includes(query))
      .slice(0, 7);
  }, [search]);

  const filteredProfiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    const normalizedCountry = normalize(country.name);

    return profiles.filter((profile) => {
      const matchesSearch = !query || [profile.name, profile.country, profile.intent, String(profile.age)]
        .some((field) => field.toLowerCase().includes(query));
      const matchesCountry = country.code === "ALL" || normalize(profile.country) === normalizedCountry;
      const matchesAge = profile.age >= minAge && profile.age <= maxAge;
      const matchesDistance = parseDistance(profile.km) <= distance;
      const matchesIntent = intent === "All intents" || profile.intent === intent;

      return matchesSearch && matchesCountry && matchesAge && matchesDistance && matchesIntent;
    });
  }, [country, distance, intent, maxAge, minAge, search]);

  function setAgeBoundary(type: "min" | "max", value: number) {
    if (type === "min") {
      setMinAge(Math.min(value, maxAge));
      return;
    }

    setMaxAge(Math.max(value, minAge));
  }

  function resetFilters() {
    setSearch("");
    setCountry(allCountries);
    setMinAge(18);
    setMaxAge(65);
    setDistance(50);
    setIntent("All intents");
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[360px_1fr]">
        <aside className="self-start rounded-2xl bg-white p-5 shadow-soft lg:sticky lg:top-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-purple" />
              <h1 className="font-[Poppins] text-2xl font-bold">Filters</h1>
            </div>
            <button type="button" onClick={resetFilters} className="text-xs font-bold text-purple">Reset</button>
          </div>

          <div className="relative mt-5">
            <label className="mb-2 block text-sm font-bold text-navy/70" htmlFor="discover-search">Search</label>
            <div className="flex items-center gap-2 rounded-xl border border-navy/10 px-4 py-3">
              <Search className="h-4 w-4 text-navy/40" />
              <input
                id="discover-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, country, intent"
                className="min-w-0 flex-1 outline-none"
                autoComplete="off"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-navy/40" />
                </button>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSearch(suggestion)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold hover:bg-cloud"
                  >
                    <Search className="h-4 w-4 text-purple" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <CountrySelect
            includeAll
            value={country}
            onChange={setCountry}
            label="Country"
            className="mt-5"
          />

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-navy/70">Age range</label>
              <span className="text-sm font-bold text-purple">{minAge} - {maxAge}</span>
            </div>
            <div className="mt-3 grid gap-3">
              <label className="text-xs font-bold text-navy/50">
                Minimum age
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={minAge}
                  onChange={(event) => setAgeBoundary("min", Number(event.target.value))}
                  className="mt-2 w-full accent-pink"
                />
              </label>
              <label className="text-xs font-bold text-navy/50">
                Maximum age
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={maxAge}
                  onChange={(event) => setAgeBoundary("max", Number(event.target.value))}
                  className="mt-2 w-full accent-purple"
                />
              </label>
            </div>
          </div>

          <label className="mt-5 block">
            <span className="flex items-center justify-between text-sm font-bold text-navy/70">
              Distance
              <span className="text-purple">{distance} km</span>
            </span>
            <input
              type="range"
              min="1"
              max="100"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
              className="mt-3 w-full accent-pink"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-navy/70">Intent</span>
            <select value={intent} onChange={(event) => setIntent(event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3">
              {intents.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </aside>

        <div>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-[Poppins] text-3xl font-bold">Discover</h1>
              <p className="mt-1 text-sm text-navy/60">{filteredProfiles.length} profile{filteredProfiles.length === 1 ? "" : "s"} match your filters.</p>
            </div>
            <span className="rounded-full bg-purple/10 px-4 py-2 text-sm font-bold text-purple">Live filters</span>
          </div>

          {filteredProfiles.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-2">
              <ProfileCard profile={filteredProfiles[0]} large />
              <div className="grid gap-5">
                {filteredProfiles.slice(1).map((profile) => <ProfileCard key={profile.name} profile={profile} />)}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-soft">
              <h2 className="font-[Poppins] text-2xl font-bold">No profiles found</h2>
              <p className="mt-3 text-navy/60">Try widening your age range, distance, or country filter.</p>
              <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-pink px-5 py-3 text-sm font-bold text-white">Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
