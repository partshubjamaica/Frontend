import { Bell, Calendar, CreditCard, FileText, Flag, LayoutDashboard, LifeBuoy, Settings, ShieldCheck, Users } from "lucide-react";

export const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/reports", label: "Reports", icon: Flag },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: ShieldCheck },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/support", label: "Support", icon: LifeBuoy },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export const adminMetrics = [
  ["Total Users", "25,420", "+12.5%"],
  ["Active Users", "8,732", "+8.2%"],
  ["New Signups", "1,243", "+15.7%"],
  ["Revenue", "$18,540", "+18.3%"]
];

export const adminUsers = [
  { name: "Shanice Williams", email: "shanice@example.com", country: "Jamaica", plan: "Premium", status: "Active", joined: "May 31, 2025" },
  { name: "Kevin Clarke", email: "kevin@example.com", country: "Canada", plan: "Premium Plus", status: "Verified", joined: "May 31, 2025" },
  { name: "Aaliyah Brown", email: "aaliyah@example.com", country: "USA", plan: "Free", status: "Pending", joined: "May 30, 2025" },
  { name: "Andre Baptiste", email: "andre@example.com", country: "Barbados", plan: "Premium", status: "Flagged", joined: "May 29, 2025" }
];

export const adminEvents = [
  { title: "Jamaica Carnival 2025", organizer: "Kingston Carnival Group", category: "Carnival", status: "Approved", attendees: 245, date: "Apr 20 - Apr 27" },
  { title: "Soca On The Bay", organizer: "Island Nights", category: "Parties", status: "Pending", attendees: 178, date: "May 10, 2025" },
  { title: "Island Brunch & Vibes", organizer: "Diaspora Brunch Club", category: "Networking", status: "Approved", attendees: 92, date: "May 18, 2025" },
  { title: "Sunset Boat Ride", organizer: "Bajan Weekends", category: "Festivals", status: "Needs Review", attendees: 128, date: "Jun 2, 2025" }
];

export const adminReports = [
  { type: "Fake Profile", subject: "Profile: Andre B.", priority: "High", status: "Open", submitted: "Today" },
  { type: "Inappropriate Content", subject: "Event comment thread", priority: "Medium", status: "Investigating", submitted: "Yesterday" },
  { type: "Harassment", subject: "Message report #2041", priority: "High", status: "Open", submitted: "Jun 8" },
  { type: "Payment Dispute", subject: "Premium Plus renewal", priority: "Low", status: "Resolved", submitted: "Jun 6" }
];

export const adminSubscriptions = [
  { user: "Kevin Clarke", plan: "Premium Plus", amount: "$19.99", status: "Active", renewal: "Jul 10, 2026" },
  { user: "Shanice Williams", plan: "Premium", amount: "$9.99", status: "Active", renewal: "Jul 2, 2026" },
  { user: "Mikayla Grant", plan: "Premium", amount: "$9.99", status: "Past Due", renewal: "Jun 8, 2026" },
  { user: "Andre Baptiste", plan: "Free", amount: "$0", status: "Downgraded", renewal: "None" }
];

export const adminPayments = [
  { id: "PAY-1048", user: "Kevin Clarke", method: "PayPal", amount: "$19.99", status: "Completed", date: "Jun 10, 2026" },
  { id: "PAY-1047", user: "Shanice Williams", method: "Card via PayPal", amount: "$9.99", status: "Completed", date: "Jun 9, 2026" },
  { id: "PAY-1046", user: "Mikayla Grant", method: "PayPal", amount: "$9.99", status: "Failed", date: "Jun 8, 2026" },
  { id: "PAY-1045", user: "Aaliyah Brown", method: "Refund", amount: "-$9.99", status: "Refunded", date: "Jun 7, 2026" }
];

export const adminContent = [
  { item: "Profile photo", owner: "Andre Baptiste", queue: "AI Moderation", status: "Needs Review", reason: "Possible duplicate image" },
  { item: "Event listing", owner: "Island Nights", queue: "Events", status: "Pending", reason: "Venue details incomplete" },
  { item: "Message attachment", owner: "User #8821", queue: "Reports", status: "Blocked", reason: "Reported media" },
  { item: "Bio update", owner: "Danielle Singh", queue: "Profiles", status: "Approved", reason: "Clean" }
];

export const adminTickets = [
  {
    id: "TCK-1024",
    user: "Mikayla Grant",
    email: "mikayla@example.com",
    subject: "I cannot update my profile picture",
    channel: "Help Desk",
    status: "Open",
    priority: "High",
    lastMessage: "The image uploads, but it does not save on my profile.",
    submitted: "12 min ago"
  },
  {
    id: "TCK-1023",
    user: "Kevin Clarke",
    email: "kevin@example.com",
    subject: "Premium Plus receipt needed",
    channel: "Billing",
    status: "Waiting",
    priority: "Medium",
    lastMessage: "Can you email me the receipt for my latest PayPal payment?",
    submitted: "1 hr ago"
  },
  {
    id: "TCK-1022",
    user: "Aaliyah Brown",
    email: "aaliyah@example.com",
    subject: "Report a fake profile",
    channel: "Safety",
    status: "Open",
    priority: "High",
    lastMessage: "Someone is using photos from Instagram.",
    submitted: "Yesterday"
  }
];

export const adminAlerts = [
  { label: "Pending verifications", value: "23", icon: Bell },
  { label: "Open reports", value: "25", icon: Flag },
  { label: "Unanswered tickets", value: "8", icon: LifeBuoy },
  { label: "Failed payments", value: "3", icon: CreditCard }
];
