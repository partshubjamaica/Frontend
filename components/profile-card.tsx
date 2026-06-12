"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, X } from "lucide-react";
import { Button } from "@/components/button";

type Profile = { name: string; age: number; country: string; km: string; intent: string; image: string };

export function ProfileCard({ profile, large = false }: { profile: Profile; large?: boolean }) {
  return (
    <motion.article whileHover={{ y: -6 }} className={`group overflow-hidden rounded-2xl bg-white shadow-soft ${large ? "min-h-[520px]" : ""}`}>
      <div className={`relative ${large ? "h-[520px]" : "h-64"}`}>
        <Image src={profile.image} alt={`${profile.name} profile photo`} fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover transition duration-300 group-hover:scale-105" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
        <div className="absolute bottom-0 w-full p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-[Poppins] text-2xl font-bold">{profile.name}, {profile.age}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-white/80"><MapPin className="h-4 w-4" /> {profile.country} · {profile.km}</p>
            </div>
            <span className="rounded-full bg-purple px-3 py-1 text-xs font-bold">{profile.intent}</span>
          </div>
          {large && (
            <div className="mt-6 flex justify-center gap-5">
              <Button variant="secondary" aria-label="Pass"><X className="h-5 w-5 text-pink" /></Button>
              <Button variant="secondary" aria-label="Super like"><Star className="h-5 w-5 text-purple" /></Button>
              <Button aria-label="Like"><Heart className="h-6 w-6 fill-white" /></Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
