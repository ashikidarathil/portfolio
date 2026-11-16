"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useModal } from "@/components/admin/modal";
import { login } from "../auth-actions";
import type { FormState } from "@/lib/types";
import { Arrow } from "@/components/Arrow";

export default function LoginPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  const modal = useModal();
  useEffect(() => {
    if (state.error) modal.error("Couldn't log in", state.error);
  }, [state, modal]);
  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(() => action(fd));
        }}
      >
        <h1>Admin<b>.</b></h1>
        <div className="af">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="af">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button className="abtn" type="submit" disabled={pending}>{pending ? "Logging in…" : <>Log in <Arrow /></>}</button>
      </form>
    </div>
  );
}
