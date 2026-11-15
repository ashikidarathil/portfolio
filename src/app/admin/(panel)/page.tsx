import Link from "next/link";
import { getCounts, getMessages } from "@/lib/data";

export default async function Dashboard() {
  const [c, messages] = await Promise.all([getCounts(), getMessages()]);
  const latest = messages.slice(0, 5);
  return (
    <>
      <header className="ahead">
        <div><h1>Dashboard</h1><p>Everything on your site comes from here.</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="abtn" href="/admin/posts/new">New post</Link>
          <Link className="abtn ghost" href="/admin/projects/new">New project</Link>
        </div>
      </header>

      <div className="stats">
        <Link href="/admin/messages" className={c.unread ? "hot" : undefined}><b>{c.unread}</b><span>Unread messages</span></Link>
        <Link href="/admin/projects"><b>{c.projects}</b><span>Projects</span></Link>
        <Link href="/admin/posts"><b>{c.published}</b><span>Published posts</span></Link>
        <Link href="/admin/posts"><b>{c.drafts}</b><span>Drafts</span></Link>
      </div>

      <h2 style={{ fontSize: 18, margin: "0 0 12px" }}>Latest messages</h2>
      {latest.length === 0 ? (
        <p className="hint" style={{ color: "var(--mute)" }}>No messages yet. They appear here when someone uses the contact form.</p>
      ) : (
        <div className="inbox">
          {latest.map((m) => (
            <div key={m._id} className={`mail-item${m.read ? "" : " unread"}`}>
              <div><div className="who">{m.name}</div><div className="meta">{m.email} · {new Date(m.createdAt).toLocaleString("en-GB")}</div></div>
              <div className="acts"><Link className="abtn ghost sm" href="/admin/messages">Open inbox</Link></div>
              <p className="body">{m.message.length > 220 ? m.message.slice(0, 220) + "…" : m.message}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
