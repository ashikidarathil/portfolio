import { saveProject } from "@/app/admin/actions";
import type { Project } from "@/lib/types";
import { Check, Field } from "./Field";
import { AdminForm, UploadField } from "./ui";

export function ProjectForm({ p }: { p?: Project }) {
  return (
    <AdminForm action={saveProject} submitLabel={p ? "Save project" : "Create project"}>
      <input type="hidden" name="id" value={p?._id ?? ""} />
      <Field name="title" label="Title" defaultValue={p?.title} required />
      <Field name="shortTitle" label="Short title" defaultValue={p?.shortTitle} hint="Used for the 'Next project' link and cover initials." />
      <Field name="slug" label="URL slug" defaultValue={p?.slug} hint="Leave empty to create one from the title." />
      <Field name="year" label="Year" defaultValue={p?.year} placeholder="2025" />
      <Field name="role" label="Role" defaultValue={p?.role} placeholder="Full stack, solo" />
      <Field name="order" label="Order" type="number" defaultValue={p?.order ?? 0} />
      <Check name="published" label="Show on the site" defaultChecked={p?.published ?? true} />
      <Field name="summary" label="Summary" textarea rows={2} defaultValue={p?.summary} hint="One sentence. Used as the big overview heading and for SEO." />
      <Field name="overview" label="Overview" textarea rows={5} defaultValue={p?.overview} />
      <Field name="stack" label="Tech stack" textarea rows={4} defaultValue={p?.stack.join("\n")} hint="One per line." />
      <Field name="features" label="What I built" textarea rows={6} defaultValue={p?.features.join("\n")} hint="One feature per line." />
      <Field name="liveUrl" label="Live site URL" type="url" defaultValue={p?.liveUrl} />
      <Field name="codeUrl" label="Source code URL" type="url" defaultValue={p?.codeUrl} />
      <UploadField name="coverImage" label="Cover image" defaultValue={p?.coverImage} hint="Wide image, about 2100 × 900 px." />
      <UploadField name="gallery" label="Screenshots" multiple defaultValue={p?.gallery.join("\n")} hint="Upload several at once. Remove a line to remove a screenshot." />
    </AdminForm>
  );
}
