import Image from "next/image";
import { Calendar, Heart, Network, Users } from "lucide-react";
import { Button } from "@/components/button";
import { PublicHeader } from "@/components/public-header";
import { SiteFooter } from "@/components/site-footer";
import { photos, profiles } from "@/lib/data";

const features = [
  { title: "Dating", text: "Meet people who understand your roots.", icon: Heart },
  { title: "Friendship", text: "Build circles at home and abroad.", icon: Users },
  { title: "Networking", text: "Connect with Caribbean professionals.", icon: Network },
  { title: "Events", text: "Find carnival, brunches, concerts, and mixers.", icon: Calendar }
];

const plans = [
  ["Free", "$0", "Limited likes, basic matching, messaging, and events"],
  ["Premium", "$9.99", "Unlimited likes, advanced filters, travel mode, discounts"],
  ["Premium Plus", "$19.99", "Boosts, receipts, incognito, AI insights, featured placement"]
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-navy">
      <PublicHeader />

      <section className="relative mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-5 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="rounded-full bg-pink/10 px-4 py-2 text-sm font-bold text-pink">Caribbean connections worldwide</span>
          <h1 className="mt-7 max-w-2xl font-[Poppins] text-5xl font-bold leading-tight sm:text-6xl">
            More Than Dating.<br /><span className="text-pink">Real Connections.</span><br />One Community.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-navy/70">
            Konnected is the Caribbean social platform where you can date, make friends, network and connect with people who understand your culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/register">Join Konnected</Button>
            <Button href="#features" variant="secondary">Learn More</Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["25K+ Members", "40+ Countries", "5K+ Events", "100% Caribbean Vibes"].map((stat) => (
              <div key={stat} className="rounded-2xl bg-cloud p-4 text-center shadow-soft">
                <strong className="block text-2xl text-purple">{stat.split(" ")[0]}</strong>
                <span className="text-xs font-semibold text-navy/60">{stat.replace(stat.split(" ")[0], "")}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[620px]">
          <div className="absolute left-2 top-12 w-[58%] overflow-hidden rounded-[2rem] bg-white shadow-soft sm:left-16">
            <Image src={photos.aaliyah} alt="Aaliyah profile" width={520} height={660} className="h-[430px] w-full object-cover" priority unoptimized />
            <div className="p-5">
              <h2 className="font-[Poppins] text-2xl font-bold">Aaliyah, 32</h2>
              <p className="text-sm text-navy/60">Jamaica</p>
            </div>
          </div>
          <div className="absolute bottom-12 right-0 w-[55%] rotate-6 overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <Image src={photos.man} alt="Kevin profile" width={520} height={660} className="h-[380px] w-full object-cover" priority unoptimized />
            <div className="p-5">
              <h2 className="font-[Poppins] text-2xl font-bold">Kevin, 34</h2>
              <p className="text-sm text-navy/60">Trinidad & Tobago</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-cloud py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-[Poppins] text-4xl font-bold">One platform for every Caribbean connection.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {features.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl bg-white p-6 shadow-soft hover:-translate-y-1">
                <Icon className="h-8 w-8 text-pink" />
                <h3 className="mt-5 font-[Poppins] text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-[Poppins] text-4xl font-bold">Members are finding culture-first connections.</h2>
          <p className="mt-4 text-navy/65">Verified profiles, intent-based discovery, event recommendations, and AI prompts keep every interaction warm and useful.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {profiles.slice(2, 4).map((profile) => (
            <blockquote key={profile.name} className="rounded-2xl bg-cloud p-6 shadow-soft">
              <p className="text-sm leading-6 text-navy/70">“Konnected helped me meet people who get the culture without explaining everything first.”</p>
              <strong className="mt-4 block">{profile.name}, {profile.country}</strong>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-[Poppins] text-4xl font-bold">Choose your connection style.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {plans.map(([name, price, description]) => (
              <article key={name} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1">
                <h3 className="font-[Poppins] text-2xl font-bold">{name}</h3>
                <p className="mt-4 text-4xl font-bold text-pink">{price}<span className="text-sm text-white/60">/mo</span></p>
                <p className="mt-4 min-h-16 text-sm leading-6 text-white/70">{description}</p>
                <Button href="/pricing" className="mt-5 w-full">Choose Plan</Button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
