import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "dark";
};

const styles = {
  primary: "bg-pink text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#f23892]",
  secondary: "bg-white text-navy ring-1 ring-purple/20 hover:-translate-y-0.5 hover:ring-purple/50",
  dark: "bg-navy text-white hover:-translate-y-0.5 hover:bg-[#111d35]"
};

export function Button({ href, variant = "primary", className = "", children, type = "button", ...props }: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-xl px-5 text-sm font-bold ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} className={classes} {...props}>{children}</button>;
}
