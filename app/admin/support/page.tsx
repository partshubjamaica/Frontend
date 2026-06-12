"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AdminActionButton } from "@/components/admin-action-button";
import { AdminMetricCard, AdminPageHeader, AdminPanel, StatusBadge } from "@/components/admin-ui";
import { adminTickets } from "@/lib/admin-data";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(adminTickets);
  const [selectedTicketId, setSelectedTicketId] = useState(adminTickets[0].id);
  const [replyMode, setReplyMode] = useState<"message" | "email">("message");
  const [reply, setReply] = useState("");
  const [draftNotice, setDraftNotice] = useState("");
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) ?? tickets[0];

  function updateTicket(status: string, lastMessage?: string) {
    setTickets((current) => current.map((ticket) => ticket.id === selectedTicket.id ? {
      ...ticket,
      status,
      lastMessage: lastMessage ?? ticket.lastMessage,
      submitted: "Just now"
    } : ticket));
  }

  function saveDraft() {
    setDraftNotice(`Draft saved for ${selectedTicket.id}`);
  }

  function sendReply() {
    if (!reply.trim()) return;
    updateTicket(replyMode === "email" ? "Email Sent" : "Replied", reply);
    setDraftNotice(`${replyMode === "email" ? "Email" : "Support message"} sent to ${selectedTicket.user}`);
    setReply("");
  }

  return (
    <AppShell admin>
      <section className="mx-auto max-w-7xl">
        <AdminPageHeader title="Support" description="Handle help desk tickets, reply in the support inbox, or send email responses to users." action={<AdminActionButton message="Ticket draft created">Create Ticket</AdminActionButton>} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <AdminMetricCard label="Open tickets" value={String(tickets.filter((ticket) => ticket.status === "Open").length)} />
          <AdminMetricCard label="Waiting on user" value={String(tickets.filter((ticket) => ticket.status === "Waiting").length)} />
          <AdminMetricCard label="Avg first reply" value="16m" />
          <AdminMetricCard label="Resolved today" value="21" />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[380px_1fr]">
          <AdminPanel title="Help Desk Tickets">
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => {
                    setSelectedTicketId(ticket.id);
                    setDraftNotice("");
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:bg-white/10 ${selectedTicket.id === ticket.id ? "border-purple bg-purple/20" : "border-white/10 bg-white/5"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-white/45">{ticket.id}</span>
                    <StatusBadge tone={ticket.priority === "High" ? "bad" : "warn"}>{ticket.status}</StatusBadge>
                  </div>
                  <h3 className="mt-2 font-bold">{ticket.subject}</h3>
                  <p className="mt-1 text-sm text-white/55">{ticket.user} - {ticket.submitted}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">{ticket.lastMessage}</p>
                </button>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel title="Ticket Workspace">
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <div>
                <div className="rounded-2xl bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-white/45">{selectedTicket.id} - {selectedTicket.channel}</p>
                      <h2 className="mt-2 font-[Poppins] text-2xl font-bold">{selectedTicket.subject}</h2>
                    </div>
                    <StatusBadge tone={selectedTicket.status === "Open" ? "bad" : "warn"}>{selectedTicket.status}</StatusBadge>
                  </div>
                  <div className="mt-5 rounded-2xl bg-navy/60 p-4 text-sm leading-6 text-white/75">
                    <p className="font-bold text-white">{selectedTicket.user}</p>
                    <p className="mt-2">{selectedTicket.lastMessage}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 p-5">
                  <div className="inline-flex rounded-xl bg-navy/60 p-1">
                    <button type="button" onClick={() => setReplyMode("message")} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${replyMode === "message" ? "bg-purple text-white" : "text-white/60"}`}><MessageCircle className="h-4 w-4" /> Support message</button>
                    <button type="button" onClick={() => setReplyMode("email")} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${replyMode === "email" ? "bg-purple text-white" : "text-white/60"}`}><Mail className="h-4 w-4" /> Email reply</button>
                  </div>
                  <textarea value={reply} onChange={(event) => setReply(event.target.value)} className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-navy/60 p-4 text-sm text-white outline-none placeholder:text-white/35" placeholder={replyMode === "message" ? "Write an in-app support message..." : `Write an email reply to ${selectedTicket.email}...`} />
                  {draftNotice && <p className="mt-3 rounded-xl bg-green-400/10 px-4 py-3 text-sm font-semibold text-green-300">{draftNotice}</p>}
                  <div className="mt-4 flex flex-wrap justify-end gap-3">
                    <button type="button" onClick={saveDraft} className="rounded-xl bg-white/10 px-5 py-3 text-sm font-bold">Save Draft</button>
                    <button type="button" onClick={sendReply} className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-3 text-sm font-bold"><Send className="h-4 w-4" /> Send {replyMode === "message" ? "Message" : "Email"}</button>
                  </div>
                </div>
              </div>

              <aside className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-bold">User Context</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div><dt className="text-white/45">Name</dt><dd className="font-semibold">{selectedTicket.user}</dd></div>
                  <div><dt className="text-white/45">Email</dt><dd className="font-semibold">{selectedTicket.email}</dd></div>
                  <div><dt className="text-white/45">Priority</dt><dd className="font-semibold">{selectedTicket.priority}</dd></div>
                  <div><dt className="text-white/45">Recommended</dt><dd className="leading-6 text-white/70">Check profile uploads, payment state, recent reports, and user account status before replying.</dd></div>
                </dl>
              </aside>
            </div>
          </AdminPanel>
        </div>
      </section>
    </AppShell>
  );
}
