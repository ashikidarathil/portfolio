import { savePost } from "@/app/admin/actions";
import type { Post } from "@/lib/types";
import { Check, Field } from "./Field";
import { AdminForm, UploadField } from "./ui";

export function PostForm({ p }: { p?: Post }) {
  return (
    <AdminForm action={savePost} submitLabel={p ? "Save post" : "Create post"}>
      <input type="hidden" name="id" value={p?._id ?? ""} />
      <Field name="title" label="Title" defaultValue={p?.title} required full />
      <Field name="slug" label="URL slug" defaultValue={p?.slug} hint="Leave empty to create one from the title." />
      <Field name="tag" label="Topic" defaultValue={p?.tag} placeholder="Backend" hint="Used for the filter buttons on the blog page." />
      <Field name="excerpt" label="Excerpt" textarea rows={2} defaultValue={p?.excerpt} hint="One or two sentences for search engines and link previews." />
      <Field
        name="content"
        label="Content (Markdown)"
        textarea
        code
        rows={22}
        defaultValue={p?.content}
        hint="## Heading · **bold** · [link](https://…) · ```code``` · ![image](url) · > quote"
      />
      <UploadField name="coverImage" label="Cover image (optional)" defaultValue={p?.coverImage} hint="Upload here, then copy the URL into the content as ![alt](url) to add images inside a post." />
      <Check name="published" label="Published (visible on the site)" defaultChecked={p?.published ?? false} />
    </AdminForm>
  );
}
