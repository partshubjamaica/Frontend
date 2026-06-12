import { Check, HelpCircle, ShieldCheck } from "lucide-react";
import { PublicHeader } from "@/components/public-header";
import { SubscribeButton } from "@/components/subscribe-button";
import { pricingFaqs, pricingPlans } from "@/lib/pricing";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cloud text-navy">
      <PublicHeader />

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink/10 px-4 py-2 text-sm font-bold text-pink">
            <ShieldCheck className="h-4 w-4" />
            PayPal secure checkout
          </span>
          <h1 className="mt-6 font-[Poppins] text-5xl font-bold leading-tight sm:text-6xl">
            Choose how you want to get Konnected.
          </h1>
          <p className="mt-5 text-lg leading-8 text-navy/65">
            Start free, upgrade for unlimited conversations, or unlock premium visibility and AI-powered insights.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.key}
              className={`relative flex flex-col rounded-2xl p-6 shadow-soft transition hover:-translate-y-1 ${
                plan.highlight ? "bg-navy text-white ring-4 ring-pink/30" : "bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="absolute right-5 top-5 rounded-full bg-pink px-3 py-1 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h2 className="font-[Poppins] text-2xl font-bold">{plan.name}</h2>
              <p className={`mt-3 min-h-12 text-sm leading-6 ${plan.highlight ? "text-white/70" : "text-navy/65"}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span className="font-[Poppins] text-5xl font-bold">{plan.price}</span>
                <span className={`pb-2 text-sm font-semibold ${plan.highlight ? "text-white/60" : "text-navy/50"}`}>
                  {plan.cadence}
                </span>
              </div>
              <div className="mt-6">
                <SubscribeButton planKey={plan.key}>{plan.cta}</SubscribeButton>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex gap-3 text-sm leading-6 ${plan.highlight ? "text-white/80" : "text-navy/70"}`}>
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-7 w-7 text-purple" />
            <h2 className="font-[Poppins] text-3xl font-bold">FAQ</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl bg-cloud p-5">
                <summary className="cursor-pointer list-none font-[Poppins] text-lg font-bold">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-navy/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
