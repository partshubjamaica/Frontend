"use client";

import { Sparkles, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/button";
import { completeOnboarding, onboardingQuestions, shouldShowOnboarding } from "@/lib/onboarding";
import type { EditableProfile } from "@/lib/profile";

type AnswerState = Record<string, { selected: string; other: string }>;

export function OnboardingModal({ setProfile }: { setProfile: Dispatch<SetStateAction<EditableProfile>> }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<AnswerState>(() =>
    Object.fromEntries(onboardingQuestions.map((question) => [question.id, { selected: question.options[0], other: "" }]))
  );

  useEffect(() => {
    setOpen(shouldShowOnboarding());
  }, []);

  if (!open) return null;

  function updateAnswer(questionId: string, field: "selected" | "other", value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: { ...current[questionId], [field]: value }
    }));
  }

  function getFinalAnswer(questionId: string) {
    const answer = answers[questionId];
    if (!answer) return "";
    return answer.selected === "Other" ? answer.other.trim() : answer.selected;
  }

  function finishOnboarding() {
    setProfile((current) => {
      const next = { ...current };
      onboardingQuestions.forEach((question) => {
        const value = getFinalAnswer(question.id);
        if (value) next[question.profileField] = value;
      });
      if (!next.bio.trim()) {
        next.bio = "Caribbean community member looking to meet people through shared culture, events, and real connection.";
      }
      return next;
    });
    completeOnboarding();
    setOpen(false);
  }

  function skipOnboarding() {
    completeOnboarding();
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/70 p-4 backdrop-blur-sm">
      <div className="mx-auto my-6 max-w-3xl overflow-hidden rounded-2xl bg-white shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-navy/10 p-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink/10 px-3 py-1 text-xs font-bold text-pink">
              <Sparkles className="h-4 w-4" />
              Personalize your matches
            </span>
            <h2 className="mt-4 font-[Poppins] text-3xl font-bold">Tell us a little about you</h2>
            <p className="mt-2 text-sm leading-6 text-navy/60">
              These five answers help personalize your profile, recommendations, and future AI match suggestions.
            </p>
          </div>
          <button type="button" onClick={skipOnboarding} aria-label="Close onboarding" className="rounded-xl bg-cloud p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-5 p-5">
          {onboardingQuestions.map((question, index) => {
            const answer = answers[question.id];
            return (
              <section key={question.id} className="rounded-2xl bg-cloud p-4">
                <label className="block">
                  <span className="font-[Poppins] text-lg font-bold">{index + 1}. {question.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-navy/60">{question.helper}</span>
                  <select
                    value={answer.selected}
                    onChange={(event) => updateAnswer(question.id, "selected", event.target.value)}
                    className="mt-3 w-full rounded-xl border border-navy/10 bg-white px-4 py-3"
                  >
                    {[...question.options, "Other"].map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                {answer.selected === "Other" && (
                  <input
                    value={answer.other}
                    onChange={(event) => updateAnswer(question.id, "other", event.target.value)}
                    className="mt-3 w-full rounded-xl border border-navy/10 bg-white px-4 py-3"
                    placeholder="Enter your own answer"
                  />
                )}
              </section>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-navy/10 p-5">
          <Button variant="secondary" onClick={skipOnboarding}>Skip for now</Button>
          <Button onClick={finishOnboarding}>Save and personalize</Button>
        </div>
      </div>
    </div>
  );
}
