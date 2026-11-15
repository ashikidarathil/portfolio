import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { Cover } from "@/components/site/Cover";
import { getPostBySlug, getPosts } from "@/lib/data";
import { monthYear, readMinutes } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPostBySlug((await params).slug);
  if (!p) return { title: "Post not found" };
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { title: p.title, description: p.excerpt, type: "article", images: p.coverImage ? [p.coverImage] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const p = await getPostBySlug((await params).slug);
  if (!p) notFound();
  // Content is written only by the logged-in admin, so rendering its HTML is trusted.
  const html = await marked.parse(p.content);

  return (
    <>
      <section className="title-block">
        <Link className="back" href="/blog">← All posts</Link>
        <h1 className="case-title post">{p.title}</h1>
      </section>
      {p.coverImage && <Cover src={p.coverImage} label={p.title} className="case-cover" sizes="100vw" priority />}
      <article className="article">
        <aside>
          <div><b>{monthYear(p.publishedAt ?? p.createdAt)}</b>Published</div>
          <div><b>{readMinutes(p.content)} min</b>Reading time</div>
          {p.tag && <div><b>{p.tag}</b>Topic</div>}
        </aside>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}
