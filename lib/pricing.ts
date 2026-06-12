export type PlanKey = "free" | "premium" | "premium_plus";

export const pricingPlans = [
  {
    key: "free" as const,
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Start meeting Caribbean singles, friends, and event communities.",
    cta: "Start Free",
    highlight: false,
    features: [
      "Limited daily likes",
      "Basic matching",
      "Basic messaging",
      "View Caribbean events",
      "Create a standard profile"
    ]
  },
  {
    key: "premium" as const,
    name: "Premium",
    price: "$9.99",
    cadence: "monthly",
    description: "More reach, better filters, and easier conversations.",
    cta: "Subscribe",
    highlight: true,
    features: [
      "Unlimited likes",
      "Unlimited messaging",
      "See who liked you",
      "Advanced country, age, distance, and intent filters",
      "Travel mode",
      "Priority profile placement",
      "Member event discounts"
    ]
  },
  {
    key: "premium_plus" as const,
    name: "Premium Plus",
    price: "$19.99",
    cadence: "monthly",
    description: "Maximum visibility with AI-powered matching and premium privacy.",
    cta: "Subscribe",
    highlight: false,
    features: [
      "Everything in Premium",
      "Profile boosts",
      "Read receipts",
      "Incognito mode",
      "Unlimited super likes",
      "AI match insights",
      "Featured placement"
    ]
  }
];

export const pricingFaqs = [
  {
    question: "Can I pay with a debit or credit card?",
    answer: "Yes. Paid plans use PayPal Checkout, which supports PayPal accounts and eligible debit or credit card payment options during checkout."
  },
  {
    question: "Can I cancel later?",
    answer: "Yes. You can cancel or change your plan from subscription settings once PayPal plan management is connected to your live account."
  },
  {
    question: "What happens after I subscribe?",
    answer: "PayPal redirects you back to Konnected after approval. The backend webhook records subscription and payment events in Supabase."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes. The Free plan includes basic matching, basic messaging, limited likes, and event browsing."
  }
];
