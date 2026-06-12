export const activePlanKey = "konnected-active-plan";
export const pendingPlanKey = "konnected-pending-plan";

export type ActivePlan = "free" | "premium" | "premium_plus";

export function getActivePlan(): ActivePlan {
  if (typeof window === "undefined") return "free";
  const value = window.localStorage.getItem(activePlanKey);
  return value === "premium" || value === "premium_plus" ? value : "free";
}

export function setActivePlan(plan: ActivePlan) {
  window.localStorage.setItem(activePlanKey, plan);
}

export function setPendingPlan(plan: ActivePlan) {
  window.localStorage.setItem(pendingPlanKey, plan);
}

export function activatePendingPlan() {
  const pending = window.localStorage.getItem(pendingPlanKey);
  if (pending === "premium" || pending === "premium_plus") {
    setActivePlan(pending);
    window.localStorage.removeItem(pendingPlanKey);
  }
}
