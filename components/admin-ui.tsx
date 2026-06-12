import type { LucideIcon } from "lucide-react";

export function AdminPageHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-[Poppins] text-3xl font-bold">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function AdminMetricCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail?: string; icon?: LucideIcon }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-white/60">{label}</p>
        {Icon && <Icon className="h-5 w-5 text-pink" />}
      </div>
      <strong className="mt-3 block text-3xl">{value}</strong>
      {detail && <span className="text-sm text-green-400">{detail}</span>}
    </article>
  );
}

export function AdminPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <h2 className="font-[Poppins] text-xl font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export function AdminTable({ columns, rows }: { columns: string[]; rows: Array<Array<React.ReactNode>> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-white/45">
          <tr>
            {columns.map((column) => <th key={column} className="pb-3 font-semibold">{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-white/10 text-white/75">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="py-3 pr-4 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "bad" | "neutral" }) {
  const styles = {
    good: "bg-green-400/10 text-green-300",
    warn: "bg-yellow-400/10 text-yellow-200",
    bad: "bg-pink/15 text-pink",
    neutral: "bg-white/10 text-white/70"
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[tone]}`}>{children}</span>;
}
