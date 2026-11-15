import Link from "next/link";
import { getProjects } from "@/lib/data";

export default async function ProjectsAdmin() {
  const projects = await getProjects({ all: true });
  return (
    <>
      <header className="ahead">
        <div><h1>Projects</h1><p>Lower order numbers show first.</p></div>
        <Link className="abtn" href="/admin/projects/new">New project</Link>
      </header>
      {projects.length === 0 ? (
        <p style={{ color: "var(--mute)" }}>No projects yet. Add your first one.</p>
      ) : (
        <div className="tblwrap">
          <table className="atable">
            <thead><tr><th>Order</th><th>Title</th><th>Year</th><th>Status</th><th /></tr></thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>{p.order}</td>
                  <td><Link className="t" href={`/admin/projects/${p._id}`}>{p.title}</Link></td>
                  <td>{p.year}</td>
                  <td><span className={`pill ${p.published ? "on" : "off"}`}>{p.published ? "Live" : "Hidden"}</span></td>
                  <td className="actions">
                    {p.published && <Link className="abtn ghost sm" href={`/work/${p.slug}`} target="_blank">View</Link>}
                    <Link className="abtn sm" href={`/admin/projects/${p._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
