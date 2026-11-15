"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/actions";
import type { FormState } from "@/lib/types";

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendMessage, {});
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);

  return (
    <form
      ref={ref}
      className="cform"
      onSubmit={(e) => {
        // Keep what the visitor typed if sending fails; clear it only on success.
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
    >
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" required maxLength={100} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <div className="field full">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" rows={3} required maxLength={5000} />
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
