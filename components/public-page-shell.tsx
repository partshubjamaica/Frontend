import { PublicHeader } from "@/components/public-header";
import { SiteFooter } from "@/components/site-footer";

export function PublicPageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-cloud text-navy">
      <PublicHeader />
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-8">
        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-10">
          <h1 className="font-[Poppins] text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-8 text-navy/65">{description}</p>
          <div className="prose prose-slate mt-8 max-w-none text-navy/75 prose-headings:font-[Poppins] prose-headings:text-navy prose-a:text-purple">
            {children}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
