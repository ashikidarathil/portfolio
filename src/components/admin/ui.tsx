"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import type { FormState } from "@/lib/types";

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
  useEffect(() => {
    if (resetOnSuccess && state.ok) ref.current?.reset();
  }, [state, resetOnSuccess]);
  return (
    <form
      ref={ref}
      className={className}
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
        {state.ok && !pending && <span className="msg-ok" role="status">{state.ok}</span>}
        {state.error && !pending && <span className="msg-err" role="alert">{state.error}</span>}
      </div>
    </form>
  );
}

/** Submit button that asks before a destructive action. */
export function ConfirmButton({ message, children, className = "abtn danger sm" }: { message: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
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
  const [error, setError] = useState("");
  const id = `f-${name}`;
  const isImage = accept.startsWith("image");
  const urls = multiple ? value.split("\n").map((s) => s.trim()).filter(Boolean) : value ? [value] : [];

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Upload failed.");
        setValue((v) => (multiple ? [v.trim(), json.url].filter(Boolean).join("\n") : json.url));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
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
        {error && <span className="msg-err">{error}</span>}
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
