import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { PostForm } from "@/components/admin/PostForm";
import { ConfirmButton } from "@/components/admin/ui";
import { getPostById } from "@/lib/data";
import { deletePost } from "../../../actions";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = isValidObjectId(id) ? await getPostById(id) : null;
  if (!p) notFound();
  return (
    <>
      <header className="ahead">
        <div><h1>Edit post</h1><p>{p.title}</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="abtn ghost" href="/admin/posts">← All posts</Link>
          {p.published && <Link className="abtn ghost" href={`/blog/${p.slug}`} target="_blank">View live ↗</Link>}
          <form action={deletePost}>
            <input type="hidden" name="id" value={p._id} />
            <ConfirmButton className="abtn danger" message={`Delete "${p.title}"? This can't be undone.`}>Delete</ConfirmButton>
          </form>
        </div>
      </header>
      <PostForm p={p} />
    </>
  );
}
