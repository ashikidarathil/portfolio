"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { ExperienceModel, MessageModel, PostModel, ProfileModel, ProjectModel, SkillGroupModel } from "@/lib/models";
import type { FormState } from "@/lib/types";
import { normalizeTimeZone, timeZoneLabel } from "@/lib/timezone";
import { lines, pairs, slugify } from "@/lib/utils";

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const n = (fd: FormData, k: string) => Number(fd.get(k)) || 0;
const b = (fd: FormData, k: string) => fd.get(k) === "on";

async function guard() {
  await requireAdmin();
  await dbConnect();
}

/** Rebuilds every public page so edits show up right away. */
function refresh() {
  revalidatePath("/", "layout");
}

function fail(err: unknown): FormState {
  if (err && typeof err === "object" && "code" in err && (err as { code: number }).code === 11000) {
    return { error: "That URL slug is already used. Pick a different slug." };
  }
  console.error(err);
  return { error: "Something went wrong while saving. Check the server logs." };
}

async function uniqueSlug(model: typeof ProjectModel, wanted: string, id?: string) {
  const base = slugify(wanted) || "item";
  let slug = base;
  for (let i = 2; await model.exists({ slug, ...(id ? { _id: { $ne: id } } : {}) }); i++) slug = `${base}-${i}`;
  return slug;
}

/* ---------- profile ---------- */
export async function saveProfile(_p: FormState, fd: FormData): Promise<FormState> {
  await guard();
  const typedZone = s(fd, "timezone");
  const timezone = typedZone ? normalizeTimeZone(typedZone) : "Asia/Kolkata";
  if (!timezone) return { error: `"${typedZone}" isn't a time zone. Pick one from the list, like Asia/Qatar.` };
  const tzLabel = s(fd, "tzLabel") || timeZoneLabel(timezone);
  try {
    await ProfileModel.findOneAndUpdate(
      {},
      {
        name: s(fd, "name"),
        title: s(fd, "title"),
        status: s(fd, "status"),
        location: s(fd, "location"),
        shortLocation: s(fd, "shortLocation"),
        stackLabel: s(fd, "stackLabel"),
        lead: s(fd, "lead"),
        aboutHeading: s(fd, "aboutHeading"),
        aboutBody: s(fd, "aboutBody"),
        principles: pairs(fd.get("principles")).map(([title, description]) => ({ title, description })),
        email: s(fd, "email"),
        socials: pairs(fd.get("socials")).map(([name, url]) => ({ name, url })),
        resumeUrl: s(fd, "resumeUrl"),
        timezone,
        tzLabel,
      },
      { upsert: true },
    );
  } catch (e) {
    return fail(e);
  }
  refresh();
  return { ok: "Profile saved." };
}

/* ---------- projects ---------- */
export async function saveProject(_p: FormState, fd: FormData): Promise<FormState> {
  await guard();
  const id = s(fd, "id");
  const title = s(fd, "title");
  if (!title) return { error: "Add a title." };
  let newId = "";
  try {
    const data = {
      title,
      slug: await uniqueSlug(ProjectModel, s(fd, "slug") || title, id || undefined),
      shortTitle: s(fd, "shortTitle"),
      year: s(fd, "year"),
      role: s(fd, "role"),
      order: n(fd, "order"),
      published: b(fd, "published"),
      summary: s(fd, "summary"),
      overview: s(fd, "overview"),
      stack: lines(fd.get("stack")),
      features: lines(fd.get("features")),
      liveUrl: s(fd, "liveUrl"),
      codeUrl: s(fd, "codeUrl"),
      coverImage: s(fd, "coverImage"),
      gallery: lines(fd.get("gallery")),
    };
    if (id) await ProjectModel.findByIdAndUpdate(id, data);
    else newId = String((await ProjectModel.create(data))._id);
  } catch (e) {
    return fail(e);
  }
  refresh();
  if (newId) redirect(`/admin/projects/${newId}?flash=project-created`);
  return { ok: "Project saved." };
}

export async function deleteProject(fd: FormData) {
  await guard();
  await ProjectModel.findByIdAndDelete(s(fd, "id"));
  refresh();
  redirect("/admin/projects?flash=project-deleted");
}

/* ---------- posts ---------- */
export async function savePost(_p: FormState, fd: FormData): Promise<FormState> {
  await guard();
  const id = s(fd, "id");
  const title = s(fd, "title");
  if (!title) return { error: "Add a title." };
  const published = b(fd, "published");
  let newId = "";
  try {
    const existing = id ? await PostModel.findById(id).lean<{ publishedAt: Date | null }>() : null;
    const data = {
      title,
      slug: await uniqueSlug(PostModel, s(fd, "slug") || title, id || undefined),
      tag: s(fd, "tag"),
      excerpt: s(fd, "excerpt"),
      content: String(fd.get("content") ?? ""),
      coverImage: s(fd, "coverImage"),
      published,
      // Keep the first publish date; set it the first time a post goes live.
      publishedAt: published ? (existing?.publishedAt ?? new Date()) : (existing?.publishedAt ?? null),
    };
    if (id) await PostModel.findByIdAndUpdate(id, data);
    else newId = String((await PostModel.create(data))._id);
  } catch (e) {
    return fail(e);
  }
  refresh();
  if (newId) redirect(`/admin/posts/${newId}?flash=post-created`);
  return { ok: published ? "Post saved and live." : "Draft saved." };
}

export async function deletePost(fd: FormData) {
  await guard();
  await PostModel.findByIdAndDelete(s(fd, "id"));
  refresh();
  redirect("/admin/posts?flash=post-deleted");
}

/* ---------- skills ---------- */
export async function saveSkillGroup(_p: FormState, fd: FormData): Promise<FormState> {
  await guard();
  const id = s(fd, "id");
  const name = s(fd, "name");
  if (!name) return { error: "Add a group name." };
  try {
    const data = { name, order: n(fd, "order"), items: lines(fd.get("items")) };
    if (id) await SkillGroupModel.findByIdAndUpdate(id, data);
    else await SkillGroupModel.create(data);
  } catch (e) {
    return fail(e);
  }
  refresh();
  return { ok: id ? "Saved." : "Group added." };
}

export async function deleteSkillGroup(fd: FormData) {
  await guard();
  await SkillGroupModel.findByIdAndDelete(s(fd, "id"));
  refresh();
  redirect("/admin/skills?flash=group-deleted");
}

/* ---------- experience ---------- */
export async function saveExperience(_p: FormState, fd: FormData): Promise<FormState> {
  await guard();
  const id = s(fd, "id");
  const title = s(fd, "title");
  if (!title) return { error: "Add a title." };
  try {
    const data = { title, period: s(fd, "period"), description: s(fd, "description"), tags: lines(fd.get("tags")), order: n(fd, "order") };
    if (id) await ExperienceModel.findByIdAndUpdate(id, data);
    else await ExperienceModel.create(data);
  } catch (e) {
    return fail(e);
  }
  refresh();
  return { ok: id ? "Saved." : "Entry added." };
}

export async function deleteExperience(fd: FormData) {
  await guard();
  await ExperienceModel.findByIdAndDelete(s(fd, "id"));
  refresh();
  redirect("/admin/experience?flash=entry-deleted");
}

/* ---------- messages ---------- */
export async function toggleRead(fd: FormData) {
  await guard();
  await MessageModel.findByIdAndUpdate(s(fd, "id"), { read: s(fd, "read") === "true" });
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(fd: FormData) {
  await guard();
  await MessageModel.findByIdAndDelete(s(fd, "id"));
  revalidatePath("/admin", "layout");
  redirect("/admin/messages?flash=message-deleted");
}
