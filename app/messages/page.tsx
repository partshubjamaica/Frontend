import Image from "next/image";
import { Mic, Paperclip, Send } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { profiles } from "@/lib/data";

export default function MessagesPage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow-soft">
          <h1 className="font-[Poppins] text-2xl font-bold">Messages</h1>
          <div className="mt-4 space-y-2">
            {profiles.map((profile) => <a key={profile.name} href={`/messages?with=${profile.name}`} className="flex items-center gap-3 rounded-xl p-3 hover:bg-cloud"><Image src={profile.image} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" unoptimized /><span><strong className="block">{profile.name}</strong><small className="text-navy/55">Typing indicator enabled</small></span></a>)}
          </div>
        </aside>
        <article className="flex min-h-[640px] flex-col rounded-2xl bg-white shadow-soft">
          <header className="border-b border-navy/10 p-5"><strong>Janelle</strong><p className="text-sm text-green-600">Online · Read receipts on</p></header>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <p className="max-w-md rounded-2xl bg-cloud p-4 text-sm">That brunch event looks good. Are you going?</p>
            <p className="ml-auto max-w-md rounded-2xl bg-purple p-4 text-sm text-white">Yes, and Konnected suggested a few conversation starters for the table.</p>
          </div>
          <footer className="flex items-center gap-2 border-t border-navy/10 p-4"><button aria-label="Upload media"><Paperclip /></button><button aria-label="Voice note"><Mic /></button><input className="min-w-0 flex-1 rounded-xl bg-cloud px-4 py-3" placeholder="Message..." /><button aria-label="Send message" className="rounded-xl bg-pink p-3 text-white"><Send /></button></footer>
        </article>
      </section>
    </AppShell>
  );
}
