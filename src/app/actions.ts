"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import { MessageModel } from "@/lib/models";
import type { FormState } from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: FormState, fd: FormData): Promise<FormState> {
  // Bots fill the hidden "company" field; pretend it worked.
  if (String(fd.get("company") ?? "").trim()) return { ok: "Thanks! Your message was sent." };

  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  if (!name || name.length > 100) return { error: "Add your name (up to 100 characters)." };
  if (!EMAIL_RE.test(email) || email.length > 200) return { error: "Add a valid email so I can reply." };
  if (message.length < 5 || message.length > 5000) return { error: "Write a message between 5 and 5,000 characters." };

  try {
    await dbConnect();
    await MessageModel.create({ name, email, message });
    revalidatePath("/admin", "layout");
    return { ok: "Thanks! Your message was sent. I'll reply soon." };
  } catch (err) {
    console.error("sendMessage failed", err);
    return { error: "Your message couldn't be sent right now. Email me directly instead." };
  }
}
