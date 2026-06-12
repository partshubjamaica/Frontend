import { HeartHandshake } from "lucide-react";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-[Poppins] text-xl font-bold ${light ? "text-white" : "text-navy"}`}>
      <HeartHandshake className="h-7 w-7 text-pink" aria-hidden="true" />
      Konnected
    </Link>
  );
}
