import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Arrow } from "@/components/Arrow";

export default function NewProject() {
  return (
    <>
      <header className="ahead">
        <div><h1>New project</h1></div>
        <Link className="abtn ghost" href="/admin/projects"><Arrow dir="left" /> All projects</Link>
      </header>
      <ProjectForm />
    </>
  );
}
