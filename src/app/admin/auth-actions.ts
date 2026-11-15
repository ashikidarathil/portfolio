"use server";

import { redirect } from "next/navigation";
import { checkCredentials, endSession, startSession } from "@/lib/auth";
import type { FormState } from "@/lib/types";

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = String(fd.get("email") ?? "");
  const password = String(fd.get("password") ?? "");
  let ok = false;
  try {
    ok = await checkCredentials(email, password);
  } catch (err) {
    console.error(err);
    return { error: "Admin login isn't set up. Add ADMIN_EMAIL, ADMIN_PASSWORD_HASH and JWT_SECRET to your environment." };
  }
  if (!ok) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: "That email and password don't match." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
