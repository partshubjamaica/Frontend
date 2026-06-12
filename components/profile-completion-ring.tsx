export function ProfileCompletionRing({ value, size = "lg" }: { value: number; size?: "sm" | "lg" }) {
  const dimension = size === "sm" ? "h-16 w-16" : "h-24 w-24";
  const inner = size === "sm" ? "h-12 w-12 text-sm" : "h-[4.5rem] w-[4.5rem] text-xl";

  return (
    <div
      className={`grid ${dimension} place-items-center rounded-full`}
      style={{ background: `conic-gradient(#7C4DFF ${value * 3.6}deg, rgba(8, 17, 34, 0.08) 0deg)` }}
      aria-label={`Profile ${value}% complete`}
      role="img"
    >
      <div className={`grid ${inner} place-items-center rounded-full bg-white font-[Poppins] font-bold text-purple shadow-sm`}>
        {value}%
      </div>
    </div>
  );
}
