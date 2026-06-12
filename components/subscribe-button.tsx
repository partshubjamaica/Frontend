"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { setPendingPlan } from "@/lib/plan-state";
import type { PlanKey } from "@/lib/pricing";

type PayPalLink = {
  href: string;
  rel: string;
  method?: string;
};

type PayPalSubscriptionResponse = {
  approvalUrl?: string;
  links?: PayPalLink[];
  error?: string;
};

export function SubscribeButton({ planKey, children }: { planKey: PlanKey; children: React.ReactNode }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function subscribe() {
    if (planKey === "free") {
      setPendingPlan("free");
      window.location.href = "/register";
      return;
    }

    setStatus("loading");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/paypal/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey })
      });

      const data = await response.json() as PayPalSubscriptionResponse;
      if (!response.ok) throw new Error(data.error ?? "Unable to start checkout");

      const approvalUrl = data.approvalUrl ?? data.links?.find((link) => link.rel === "approve")?.href;
      if (!approvalUrl) throw new Error("PayPal approval link was not returned");

      setPendingPlan(planKey);
      window.location.href = approvalUrl;
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={subscribe}
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-pink px-5 text-sm font-bold text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#f23892] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        {children}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm font-semibold text-pink">
          Checkout could not start. Confirm the backend is running and PayPal plan IDs are configured.
        </p>
      )}
    </div>
  );
}
