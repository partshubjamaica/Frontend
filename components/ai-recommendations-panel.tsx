"use client";

import Link from "next/link";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { events, profiles } from "@/lib/data";
import type { EditableProfile } from "@/lib/profile";
import { getActivePlan } from "@/lib/plan-state";

type Recommendation = {
  name?: string;
  title?: string;
  score: number;
  reason: string;
  iceBreaker?: string;
};

type AIResponse = {
  friendMatches?: Recommendation[];
  dateMatches?: Recommendation[];
  eventMatches?: Recommendation[];
  profileInsights?: string[];
};

export function AIRecommendationsPanel({ profile }: { profile: EditableProfile }) {
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState<AIResponse | null>(null);

  useEffect(() => {
    setPlan(getActivePlan());
  }, []);

  async function generate() {
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/ai/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planTier: plan,
          profile,
          candidates: profiles,
          events
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to generate AI recommendations");
      setRecommendations(data.recommendations);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to generate AI recommendations");
    } finally {
      setLoading(false);
    }
  }

  if (plan !== "premium_plus") {
    return (
      <article className="rounded-2xl bg-navy p-6 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-pink" />
          <h2 className="font-[Poppins] text-2xl font-bold">Premium Plus AI Matching</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
          Unlock deeper Gemini-powered friend, date, and event recommendations based on your profile, interests, onboarding answers, goals, and activity.
        </p>
        <Link href="/pricing" className="mt-5 inline-flex rounded-xl bg-pink px-5 py-3 text-sm font-bold text-white">Upgrade to Premium Plus</Link>
      </article>
    );
  }

  return (
    <article className="rounded-2xl bg-navy p-6 text-white shadow-soft">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-pink" />
            <h2 className="font-[Poppins] text-2xl font-bold">Premium Plus AI Matching</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-white/70">Gemini analyzes more profile context to suggest stronger friends, dates, and events.</p>
        </div>
        <button type="button" onClick={generate} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-pink px-5 text-sm font-bold disabled:opacity-70">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Generate Matches
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl bg-pink/15 p-4 text-sm font-bold text-pink">{error}</p>}

      {recommendations && (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ["Friend Matches", recommendations.friendMatches],
            ["Date Matches", recommendations.dateMatches],
            ["Event Matches", recommendations.eventMatches]
          ].map(([title, items]) => (
            <section key={String(title)} className="rounded-2xl bg-white/10 p-4">
              <h3 className="font-bold">{String(title)}</h3>
              <div className="mt-3 space-y-3">
                {Array.isArray(items) && items.length > 0 ? items.map((item, index) => (
                  <div key={index} className="rounded-xl bg-navy/50 p-3 text-sm">
                    <div className="flex justify-between gap-3 font-bold"><span>{item.name ?? item.title}</span><span className="text-pink">{item.score}%</span></div>
                    <p className="mt-2 leading-6 text-white/70">{item.reason}</p>
                    {item.iceBreaker && <p className="mt-2 text-white/55">Ice breaker: {item.iceBreaker}</p>}
                  </div>
                )) : <p className="text-sm text-white/55">No recommendations returned.</p>}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
