"use client";

import Image from "next/image";
import { Calendar, Heart, MapPin, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";

export type EventItem = {
  title: string;
  place: string;
  date: string;
  image: string;
  people: number;
  category: string;
  type?: "Event" | "Place";
  description?: string;
  price?: string;
  website?: string;
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <motion.article whileHover={{ y: -4 }} className="grid overflow-hidden rounded-2xl bg-white shadow-soft sm:grid-cols-[220px_1fr]">
      <div className="relative h-52 sm:h-full">
        {event.image.startsWith("data:") ? (
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 260px" className="object-cover" />
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-purple/10 px-3 py-1 text-xs font-bold text-purple">{event.category}</span>
            {event.type && <span className="rounded-full bg-pink/10 px-3 py-1 text-xs font-bold text-pink">{event.type}</span>}
          </div>
          <span className="text-sm font-semibold text-navy/60">{event.type === "Place" ? `${event.people} saved` : `${event.people} going`}</span>
        </div>
        <h3 className="font-[Poppins] text-xl font-bold">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm text-navy/65"><MapPin className="h-4 w-4" />{event.place}</p>
        <p className="flex items-center gap-2 text-sm text-navy/65"><Calendar className="h-4 w-4" />{event.date}</p>
        <p className="text-sm leading-6 text-navy/70">{event.description ?? "Caribbean music, culture, food, and curated introductions for members nearby."}</p>
        {(event.price || event.website) && (
          <div className="flex flex-wrap gap-2 text-xs font-bold text-navy/55">
            {event.price && <span className="rounded-full bg-cloud px-3 py-1">{event.price}</span>}
            {event.website && <a className="rounded-full bg-cloud px-3 py-1 text-purple" href={event.website}>Details</a>}
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button className="gap-2"><Heart className="h-4 w-4" /> Interested</Button>
          <Button variant="secondary" className="gap-2"><Heart className="h-4 w-4" /> Save</Button>
          <Button variant="secondary" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
        </div>
      </div>
    </motion.article>
  );
}
