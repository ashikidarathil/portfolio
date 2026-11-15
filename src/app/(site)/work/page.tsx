import type { Metadata } from "next";
import Link from "next/link";
import { Cover } from "@/components/site/Cover";
import { getProjects } from "@/lib/data";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Work" };

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <section className="phead">
        <h1>Work<sup>({projects.length})</sup></h1>
        <p>Each project has its code on GitHub and a short write-up of how it works.</p>
      </section>
      <section className="wgrid">
        {projects.length === 0 && <p className="empty">Projects are on the way.</p>}
        {projects.map((p, i) => (
          <Link key={p._id} className="wcard" href={`/work/${p.slug}`}>
            <Cover src={p.coverImage} label={p.shortTitle || p.title} priority={i === 0} sizes={i === 0 ? "100vw" : undefined} />
            <div className="wmeta">
              <h3>{p.title}</h3>
              <span>{[p.year, p.stack.slice(0, 3).join(", ")].filter(Boolean).join(" · ")}</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
