"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { activatePendingPlan, getActivePlan } from "@/lib/plan-state";

export function SubscriptionReturnHandler() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("subscription") !== "success") return;
    activatePendingPlan();
    const plan = getActivePlan();
    setMessage(plan === "premium_plus" ? "Premium Plus is active. AI match recommendations are unlocked." : "Subscription is active.");
  }, [searchParams]);

  if (!message) return null;

  return <div className="mb-5 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">{message}</div>;
}
