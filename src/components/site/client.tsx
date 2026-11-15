"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "mode" }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      root.dataset.theme ? root.dataset.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(read());
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button className={className} type="button" onClick={toggle} aria-label="Switch color theme">
      {dark === null ? "Theme" : dark ? "Light" : "Dark"}
    </button>
  );
}

export function Clock({ timeZone, label }: { timeZone: string; label: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = () => {
      try {
        setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date()));
      } catch {}
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, [timeZone]);
  return (
    <>
      {time} {label}
    </>
  );
}

export function NavLinks() {
  const path = usePathname();
  const on = (p: string) => (path.startsWith(p) ? "on" : undefined);
  return (
    <>
      <Link href="/work" className={on("/work")}>Work</Link>
      <Link href="/#about" className="hide-sm">About</Link>
      <Link href="/blog" className={on("/blog")}>Blog</Link>
      <Link href="/#contact" className="hide-sm">Contact</Link>
    </>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy");
  function copy() {
    const select = () => {
      const el = document.getElementById("contact-email");
      if (!el) return;
      const r = document.createRange();
      r.selectNodeContents(el);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
      setLabel("Selected");
    };
    try {
      navigator.clipboard.writeText(email).then(() => setLabel("Copied"), select);
    } catch {
      select();
    }
  }
  return (
    <div className="mail">
      <span id="contact-email">{email}</span>
      <button className="copy" type="button" onClick={copy}>{label}</button>
    </div>
  );
}

type PostRow = { slug: string; title: string; date: string; read: string; tag: string };

export function PostList({ posts }: { posts: PostRow[] }) {
  return (
    <ul className="list posts">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`}>
            <span className="yr">{p.date}</span>
            <span className="tt">{p.title}</span>
            <span className="st">{p.read}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FilteredPosts({ posts }: { posts: PostRow[] }) {
  const tags = ["All", ...Array.from(new Set(posts.map((p) => p.tag).filter(Boolean)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.tag === active);
  return (
    <>
      {tags.length > 2 && (
        <div className="filters" role="group" aria-label="Filter posts by topic">
          {tags.map((t) => (
            <button key={t} type="button" aria-pressed={active === t} onClick={() => setActive(t)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <PostList posts={shown} />
    </>
  );
}
