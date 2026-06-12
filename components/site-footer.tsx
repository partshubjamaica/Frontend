import { footerGroups } from "@/lib/footer-links";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-navy/10 px-5 py-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-navy/60">
            Dating, friendship, networking, and events for the Caribbean diaspora.
          </p>
          <p className="mt-6 text-xs font-semibold text-navy/45">
            © 2026 Konnected. All rights reserved.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-[Poppins] text-sm font-bold">{group.title}</h2>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm font-semibold text-navy/60 hover:text-purple">
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
