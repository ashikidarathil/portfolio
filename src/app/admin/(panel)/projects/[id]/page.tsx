import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ConfirmButton } from "@/components/admin/ui";
import { getProjectById } from "@/lib/data";
import { deleteProject } from "../../../actions";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = isValidObjectId(id) ? await getProjectById(id) : null;
  if (!p) notFound();
  return (
    <>
      <header className="ahead">
        <div><h1>Edit project</h1><p>{p.title}</p></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="abtn ghost" href="/admin/projects">← All projects</Link>
          {p.published && <Link className="abtn ghost" href={`/work/${p.slug}`} target="_blank">View live ↗</Link>}
          <form action={deleteProject}>
            <input type="hidden" name="id" value={p._id} />
            <ConfirmButton className="abtn danger" title="Delete this project?" message={`"${p.title}" will be removed from your site for good.`}>Delete</ConfirmButton>
          </form>
        </div>
      </header>
      <ProjectForm p={p} />
    </>
  );
}
