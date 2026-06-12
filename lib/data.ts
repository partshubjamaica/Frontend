import { Calendar, Heart, MessageCircle, Network, Users } from "lucide-react";

export const photos = {
  woman: "/images/profiles/janelle-28.jpg",
  man: "/images/profiles/kevin-34.jpg",
  mikayla: "/images/profiles/mikayla-35.jpg",
  andre: "/images/profiles/andre-42.jpg",
  danielle: "/images/profiles/danielle-41.jpg",
  aaliyah: "/images/profiles/aaliyah-32.jpg",
  carnival: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
  party: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=85",
  brunch: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
  yacht: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=85"
};

export const profiles = [
  { name: "Janelle", age: 28, country: "Barbados", km: "5 km", intent: "Dating", image: photos.woman },
  { name: "Kevin", age: 34, country: "Trinidad & Tobago", km: "8 km", intent: "Networking", image: photos.man },
  { name: "Mikayla", age: 35, country: "Jamaica", km: "12 km", intent: "Friendship", image: photos.mikayla },
  { name: "Andre", age: 42, country: "Barbados", km: "6 km", intent: "Dating", image: photos.andre },
  { name: "Danielle", age: 41, country: "Guyana", km: "12 km", intent: "Friendship", image: photos.danielle }
];

export const events = [
  { title: "Jamaica Carnival 2025", place: "Kingston, Jamaica", date: "Apr 20 - Apr 27", image: photos.carnival, people: 245, category: "Carnival" },
  { title: "Soca On The Bay", place: "Miami, USA", date: "May 10, 2025", image: photos.party, people: 178, category: "Parties" },
  { title: "Island Brunch & Vibes", place: "Toronto, Canada", date: "May 18, 2025", image: photos.brunch, people: 92, category: "Networking" },
  { title: "Sunset Boat Ride", place: "Bridgetown, Barbados", date: "Jun 2, 2025", image: photos.yacht, people: 128, category: "Festivals" }
];

export const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Users },
  { href: "/discover", label: "Discover", icon: Heart },
  { href: "/matches", label: "Matches", icon: Heart },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/connections", label: "Connections", icon: Network }
];
