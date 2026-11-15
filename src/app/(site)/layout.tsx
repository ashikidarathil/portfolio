import type { Metadata } from "next";
import Link from "next/link";
import { Clock, NavLinks, ThemeToggle } from "@/components/site/client";
import { getProfile } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProfile();
  const title = `${p.name} · ${p.title}`;
  return {
    title: { default: title, template: `%s · ${p.name}` },
    description: p.lead || `${p.name}, ${p.title}.`,
    openGraph: { title, description: p.lead, type: "website" },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const p = await getProfile();
  const brand = p.name.split(/\s+/).map((w) => w[0]).join(".") + ".";
  return (
    <div className="site">
      <header className="nav">
        <Link className="brand" href="/">{brand}</Link>
        <span className="muted">{p.title}</span>
        <span className="muted clock">
          {p.shortLocation && <>{p.shortLocation} · </>}
          <Clock timeZone={p.timezone} label={p.tzLabel} />
        </span>
        <nav className="links" aria-label="Main">
          <NavLinks />
          <ThemeToggle />
        </nav>
      </header>
      <main>{children}</main>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {p.name}. Built with Next.js and MongoDB.</span>
        <span>
          <Link href="/">Home</Link> · <Link href="/work">Work</Link> · <Link href="/blog">Blog</Link> ·{" "}
          <Link href="/#contact">Contact</Link>
        </span>
      </footer>
    </div>
  );
}
