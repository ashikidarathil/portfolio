import Link from "next/link";
import { getPosts } from "@/lib/data";
import { monthYear } from "@/lib/utils";

export default async function PostsAdmin() {
  const posts = await getPosts({ all: true });
  return (
    <>
      <header className="ahead">
        <div><h1>Blog</h1><p>Write in Markdown. Drafts stay hidden until you publish.</p></div>
        <Link className="abtn" href="/admin/posts/new">New post</Link>
      </header>
      {posts.length === 0 ? (
        <p style={{ color: "var(--mute)" }}>No posts yet. Write your first one.</p>
      ) : (
        <div className="tblwrap">
          <table className="atable">
            <thead><tr><th>Title</th><th>Topic</th><th>Date</th><th>Status</th><th /></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p._id}>
                  <td><Link className="t" href={`/admin/posts/${p._id}`}>{p.title}</Link></td>
                  <td>{p.tag}</td>
                  <td>{monthYear(p.publishedAt ?? p.createdAt)}</td>
                  <td><span className={`pill ${p.published ? "on" : "off"}`}>{p.published ? "Published" : "Draft"}</span></td>
                  <td className="actions">
                    {p.published && <Link className="abtn ghost sm" href={`/blog/${p.slug}`} target="_blank">View</Link>}
                    <Link className="abtn sm" href={`/admin/posts/${p._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
