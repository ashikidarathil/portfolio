import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <>
      <header className="ahead">
        <div><h1>New project</h1></div>
        <Link className="abtn ghost" href="/admin/projects">← All projects</Link>
      </header>
      <ProjectForm />
    </>
  );
}
