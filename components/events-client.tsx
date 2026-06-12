"use client";

import { ImagePlus, MapPin, Plus, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { EventCard, type EventItem } from "@/components/event-card";
import { Button } from "@/components/button";
import { events } from "@/lib/data";

type FormState = {
  type: "Event" | "Place";
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  vibe: string;
  price: string;
  website: string;
  image: string;
};

const initialForm: FormState = {
  type: "Event",
  title: "",
  category: "Carnival",
  location: "",
  date: "",
  description: "",
  vibe: "",
  price: "",
  website: "",
  image: ""
};

const fallbackImages = {
  Event: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=85",
  Place: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
};

export function EventsClient() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [createdItems, setCreatedItems] = useState<EventItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabs = ["All", "Carnival", "Concerts", "Networking", "Parties", "Festivals", "Places"];

  const feedItems = useMemo<EventItem[]>(() => [...createdItems, ...events], [createdItems]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "type" ? { category: value === "Place" ? "Places" : "Carnival", date: value === "Place" ? "" : current.date } : {})
    }));
  }

  function uploadImage(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") updateField("image", reader.result);
    };
    reader.readAsDataURL(file);
  }

  function createItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const item: EventItem = {
      title: form.title || (form.type === "Event" ? "Untitled Event" : "Untitled Place"),
      place: form.location || "Location to be announced",
      date: form.type === "Place" ? form.vibe || "Open for visits" : form.date || "Date to be announced",
      image: form.image || fallbackImages[form.type],
      people: 1,
      category: form.category,
      type: form.type,
      description: form.description || (form.type === "Event" ? "A new Caribbean community event." : "A recommended place to visit."),
      price: form.price,
      website: form.website
    };

    setCreatedItems((current) => [item, ...current]);
    setForm(initialForm);
    setOpen(false);
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-[Poppins] text-3xl font-bold">Events</h1>
            <p className="mt-1 text-sm text-navy/60">Find events and Caribbean places worth visiting.</p>
          </div>
          <Button className="gap-2" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
        <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2">
          {tabs.map((tab, index) => <button key={tab} className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold ${index === 0 ? "bg-purple text-white" : "bg-white text-navy shadow-soft"}`}>{tab}</button>)}
        </div>
        <div className="mt-6 space-y-5">
          {feedItems.map((event, index) => <EventCard key={`${event.title}-${index}`} event={event} />)}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/70 p-4 backdrop-blur-sm">
          <div className="mx-auto my-8 max-w-3xl overflow-hidden rounded-2xl bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-navy/10 p-5">
              <div>
                <h2 className="font-[Poppins] text-2xl font-bold">Create {form.type}</h2>
                <p className="mt-1 text-sm text-navy/60">Add recommended details so members know what to expect.</p>
              </div>
              <button type="button" aria-label="Close modal" onClick={() => setOpen(false)} className="rounded-xl bg-cloud p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={createItem} className="grid gap-5 p-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <div className="inline-flex rounded-xl bg-cloud p-1">
                  {(["Event", "Place"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("type", type)}
                      className={`rounded-lg px-5 py-2 text-sm font-bold ${form.type === type ? "bg-purple text-white" : "text-navy/65"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-bold text-navy/70">{form.type} name</span>
                <input value={form.title} onChange={(event) => updateField("title", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder={form.type === "Event" ? "Soca On The Bay" : "Island Brunch Garden"} />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy/70">Category</span>
                <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3">
                  {(form.type === "Event" ? ["Carnival", "Concerts", "Networking", "Parties", "Festivals"] : ["Places", "Restaurants", "Beaches", "Lounges", "Culture", "Nightlife"]).map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy/70">Location</span>
                <input value={form.location} onChange={(event) => updateField("location", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="City, country or full address" />
              </label>

              {form.type === "Event" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-navy/70">Date and time</span>
                  <input value={form.date} onChange={(event) => updateField("date", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Aug 10, 2026 at 7:00 PM" />
                </label>
              ) : (
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-navy/70">Best time to visit</span>
                  <input value={form.vibe} onChange={(event) => updateField("vibe", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Weekend brunch, sunset, late night" />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy/70">Price or cover</span>
                <input value={form.price} onChange={(event) => updateField("price", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Free, $25, reservations recommended" />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-bold text-navy/70">Description</span>
                <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} className="min-h-28 w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="Mention music, food, dress code, crowd, parking, accessibility, or why members should visit." />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-navy/70">Website or ticket link</span>
                <input value={form.website} onChange={(event) => updateField("website", event.target.value)} className="w-full rounded-xl border border-navy/10 px-4 py-3" placeholder="https://..." />
              </label>

              <div>
                <span className="mb-2 block text-sm font-bold text-navy/70">Image upload</span>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-purple/40 bg-purple/5 px-4 text-sm font-bold text-purple">
                  <ImagePlus className="h-4 w-4" />
                  Upload image
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => uploadImage(event.target.files?.[0])} />
              </div>

              {form.image && (
                <div className="sm:col-span-2">
                  <img src={form.image} alt="Upload preview" className="h-56 w-full rounded-2xl object-cover" />
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 border-t border-navy/10 pt-5 sm:col-span-2">
                <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="gap-2"><MapPin className="h-4 w-4" /> Publish {form.type}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
