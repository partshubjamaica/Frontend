import Image from "next/image";
import { Briefcase, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { profiles } from "@/lib/data";

export default function ConnectionsPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl">
        <h1 className="font-[Poppins] text-3xl font-bold">Connections</h1>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {["Friendship connections", "Networking connections"].map((title, index) => {
            const Icon = index ? Briefcase : Users;
            return (
              <article key={title} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex items-center gap-3"><Icon className="text-purple" /><h2 className="font-[Poppins] text-xl font-bold">{title}</h2></div>
                <div className="mt-5 space-y-3">
                  {profiles.slice(index, index + 3).map((profile) => <a key={profile.name} href="/profile" className="flex items-center gap-3 rounded-xl bg-cloud p-3"><Image src={profile.image} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" unoptimized /><span><strong className="block">{profile.name}</strong><small className="text-navy/55">{profile.country} · {profile.intent}</small></span></a>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
