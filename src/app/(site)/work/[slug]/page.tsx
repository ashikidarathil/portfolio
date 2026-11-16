import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/site/Cover";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { Arrow } from "@/components/Arrow";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProjectBySlug((await params).slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: p.coverImage ? [p.coverImage] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProjectBySlug(slug), getProjects()]);
  if (!p) notFound();
  const i = all.findIndex((x) => x._id === p._id);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  const label = p.shortTitle || p.title;

  return (
    <>
      <section className="title-block">
        <Link className="back" href="/work"><Arrow dir="left" /> All work</Link>
        <h1 className="case-title">{p.title}</h1>
      </section>

      <div className="mgrid">
        <div><span className="k">Year</span>{p.year || "—"}</div>
        <div><span className="k">Role</span>{p.role || "—"}</div>
        <div><span className="k">Stack</span>{p.stack.join(", ") || "—"}</div>
        <div>
          <span className="k">Links</span>
          <div className="links">
            {p.liveUrl && <a className="ul" href={p.liveUrl} target="_blank" rel="noopener">Live site <Arrow dir="up-right" /></a>}
            {p.codeUrl && <a className="ul" href={p.codeUrl} target="_blank" rel="noopener">Source code <Arrow dir="up-right" /></a>}
          </div>
        </div>
      </div>

      <Cover src={p.coverImage} label={label} className="case-cover" sizes="100vw" priority />

      <section className="sec" style={{ borderTop: "1.5px solid var(--rule)" }}>
        <span className="lbl">Overview</span>
        <div className="about-body">
          {p.summary && <h2 className="h2">{p.summary}</h2>}
          {p.overview && <p>{p.overview}</p>}
        </div>
      </section>

      {p.features.length > 0 && (
        <section className="sec">
          <span className="lbl">What I built</span>
          <ul className="feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
      )}

      {p.gallery.length > 0 && (
        <section className="sec">
          <span className="lbl">Screens</span>
          <div className="gallery">
            {p.gallery.map((src, k) => (
              <Cover key={src} src={src} label={`${p.title} screen ${k + 1}`} />
            ))}
          </div>
        </section>
      )}

      {next && (
        <Link className="next" href={`/work/${next.slug}`}>
          <span><span className="k">Next project</span><b>{next.shortTitle || next.title}</b></span>
          <span className="ar"><Arrow /></span>
        </Link>
      )}
    </>
  );
}
