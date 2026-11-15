"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import type { FormState } from "@/lib/types";
import { useModal } from "./modal";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

/** Form wrapper that shows saving state and the action's success or error message. */
export function AdminForm({
  action,
  children,
  submitLabel = "Save",
  className = "aform",
  resetOnSuccess = false,
}: {
  action: Action;
  children: React.ReactNode;
  submitLabel?: string;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  const ref = useRef<HTMLFormElement>(null);
  const modal = useModal();
  // Every save result opens a modal: green for success, red for errors.
  useEffect(() => {
    if (state.ok) {
      if (resetOnSuccess) ref.current?.reset();
      modal.success("Saved", state.ok);
    } else if (state.error) {
      modal.error("Couldn't save", state.error);
    }
  }, [state, resetOnSuccess, modal]);
  return (
    <form
      ref={ref}
      className={className}
      noValidate
      onSubmit={(e) => {
        // Submit without React's automatic form reset, so a failed save keeps your edits.
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
    >
      {children}
      <div className="afoot">
        <button className="abtn" type="submit" disabled={pending}>{pending ? "Saving…" : submitLabel}</button>
      </div>
    </form>
  );
}

/** Asks in a confirmation modal, then submits its form. */
export function ConfirmButton({
  message,
  title = "Are you sure?",
  confirmLabel = "Delete",
  danger = true,
  children,
  className = "abtn danger sm",
}: {
  message: string;
  title?: string;
  confirmLabel?: string;
  danger?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const modal = useModal();
  return (
    <button
      type="button"
      className={className}
      onClick={async (e) => {
        const form = e.currentTarget.form;
        if (await modal.confirm({ title, message, confirmLabel, danger })) form?.requestSubmit();
      }}
    >
      {children}
    </button>
  );
}

export function SideNav({ unread }: { unread: number }) {
  const path = usePathname();
  const items: [string, string][] = [
    ["/admin", "Dashboard"],
    ["/admin/messages", "Inbox"],
    ["/admin/profile", "Profile"],
    ["/admin/projects", "Projects"],
    ["/admin/posts", "Blog"],
    ["/admin/skills", "Skills"],
    ["/admin/experience", "Experience"],
  ];
  return (
    <nav aria-label="Admin">
      {items.map(([href, label]) => {
        const on = href === "/admin" ? path === "/admin" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={on ? "on" : undefined}>
            {label}
            {href === "/admin/messages" && unread > 0 && <span className="count">{unread}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

/** URL field with an upload button. Uploads go to Cloudinary through /api/admin/upload. */
export function UploadField({
  name,
  label,
  defaultValue = "",
  multiple = false,
  accept = "image/*",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  multiple?: boolean;
  accept?: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const modal = useModal();
  const id = `f-${name}`;
  const isImage = accept.startsWith("image");
  const urls = multiple ? value.split("\n").map((s) => s.trim()).filter(Boolean) : value ? [value] : [];

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Upload failed.");
        setValue((v) => (multiple ? [v.trim(), json.url].filter(Boolean).join("\n") : json.url));
      } catch (err) {
        modal.error("Upload failed", err instanceof Error ? err.message : "Try again with a smaller file.");
        break;
      }
    }
    setBusy(false);
  }

  return (
    <div className="af full">
      <label htmlFor={id}>{label}</label>
      {multiple ? (
        <textarea id={id} name={name} rows={3} value={value} onChange={(e) => setValue(e.target.value)} placeholder="One URL per line" />
      ) : (
        <input id={id} name={name} type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://…" />
      )}
      <div className="upload">
        <input type="file" accept={accept} multiple={multiple} onChange={onFiles} disabled={busy} aria-label={`Upload ${label}`} />
        {busy && <span className="hint">Uploading…</span>}
      </div>
      {isImage && urls.length > 0 && (
        <div className="thumbs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {urls.map((u) => <img key={u} className="thumb" src={u} alt="" />)}
        </div>
      )}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

/**
 * Sidebar shell. On desktop the sidebar is always visible; on phones it becomes a
 * left drawer opened from the hamburger in the top bar.
 */
export function AdminShell({ sidebar, unread, children }: { sidebar: React.ReactNode; unread: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]); // close after navigating

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`admin${open ? " nav-open" : ""}`}>
      <header className="atop">
        <button
          type="button"
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="admin-aside"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
          {unread > 0 && !open && <i className="dot" aria-hidden="true" />}
        </button>
        <Link className="brand" href="/admin">Admin<b>.</b></Link>
      </header>
      <aside className="aside" id="admin-aside">{sidebar}</aside>
      <div className="scrim" aria-hidden="true" onClick={() => setOpen(false)} />
      <div className="work">{children}</div>
    </div>
  );
}
