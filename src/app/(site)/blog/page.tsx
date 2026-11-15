import type { Metadata } from "next";
import { FilteredPosts } from "@/components/site/client";
import { getPosts } from "@/lib/data";
import { postRow } from "@/lib/view";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="phead">
        <h1>Blog<sup>({posts.length})</sup></h1>
        <p>Short write-ups on what I build and learn.</p>
      </section>
      {posts.length ? <FilteredPosts posts={posts.map(postRow)} /> : <p className="empty">The first post is coming soon.</p>}
    </>
  );
}
