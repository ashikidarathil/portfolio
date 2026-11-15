"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendMessage } from "@/app/actions";
import type { FormState } from "@/lib/types";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same rules as the server action in app/actions.ts.
function check(field: Field, raw: string): string | undefined {
  const v = raw.trim();
  if (field === "name") {
    if (!v) return "Enter your name.";
    if (v.length > 100) return "Keep your name under 100 characters.";
  }
  if (field === "email") {
    if (!v) return "Enter your email so I can reply.";
    if (!EMAIL_RE.test(v)) return "Enter a valid email, like name@example.com.";
  }
  if (field === "message") {
    if (!v) return "Write a message.";
    if (v.length < 5) return "Your message needs at least 5 characters.";
    if (v.length > 5000) return "Keep your message under 5,000 characters.";
  }
  return undefined;
}

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, {});
  const [errors, setErrors] = useState<Errors>({});
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      ref.current?.reset();
      setErrors({});
    }
  }, [state]);

  const clear = (f: Field) => setErrors((e) => (e[f] ? { ...e, [f]: undefined } : e));

  // While errors are showing, a click or tap anywhere on the page hides them all.
  // The Send button is the exception: it validates again.
  const hasErrors = Object.values(errors).some(Boolean);
  useEffect(() => {
    if (!hasErrors) return;
    const onDown = (ev: PointerEvent) => {
      const t = ev.target as HTMLElement | null;
      if (t?.closest(".cform button[type=submit]")) return;
      setErrors({});
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [hasErrors]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const next: Errors = {};
    (["name", "email", "message"] as Field[]).forEach((f) => {
      const msg = check(f, String(fd.get(f) ?? ""));
      if (msg) next[f] = msg;
    });
    setErrors(next);
    const first = (["name", "email", "message"] as Field[]).find((f) => next[f]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Submit without React's automatic reset, so a failed send keeps what was typed.
    startTransition(() => action(fd));
  }

  const props = (f: Field) => ({
    id: `cf-${f}`,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `cf-${f}-err` : undefined,
    // Hide the error when the visitor leaves the field...
    onBlur: () => clear(f),
    // ...or as soon as what they type becomes valid.
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (errors[f] && !check(f, ev.target.value)) clear(f);
    },
  });

  // The error line always keeps its space, so hiding an error never shifts the layout
  // (otherwise the Send button can jump away mid-click).
  const err = (f: Field) => (
    <span className="field-err" id={`cf-${f}-err`} role={errors[f] ? "alert" : undefined}>
      {errors[f] ?? ""}
    </span>
  );

  return (
    <form ref={ref} className="cform" noValidate onSubmit={onSubmit}>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label htmlFor="cf-name">Your name</label>
        <input {...props("name")} maxLength={100} autoComplete="name" />
        {err("name")}
      </div>
      <div className={`field${errors.email ? " invalid" : ""}`}>
        <label htmlFor="cf-email">Email</label>
        <input {...props("email")} type="email" maxLength={200} autoComplete="email" inputMode="email" />
        {err("email")}
      </div>
      <div className={`field full${errors.message ? " invalid" : ""}`}>
        <label htmlFor="cf-message">Message</label>
        <textarea {...props("message")} rows={3} maxLength={5000} />
        {err("message")}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-foot">
        <button className="btn" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message →"}
        </button>
        <span className={`form-note${state.error ? " err" : ""}`} role="status">
          {state.error ?? state.ok ?? "I usually reply within a day or two."}
        </span>
      </div>
    </form>
  );
}
