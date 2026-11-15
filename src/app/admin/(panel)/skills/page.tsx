import { Field } from "@/components/admin/Field";
import { AdminForm, ConfirmButton } from "@/components/admin/ui";
import { getSkillGroups } from "@/lib/data";
import { deleteSkillGroup, saveSkillGroup } from "../../actions";

export default async function SkillsAdmin() {
  const groups = await getSkillGroups();
  return (
    <>
      <header className="ahead"><div><h1>Skills</h1><p>Each group is a column on the home page. The ticker under your name uses these too.</p></div></header>
      {groups.map((g) => (
        <div className="card" key={g._id}>
          <AdminForm action={saveSkillGroup}>
            <input type="hidden" name="id" value={g._id} />
            <Field name="name" label="Group name" uid={g._id} defaultValue={g.name} required />
            <Field name="order" label="Order" type="number" uid={g._id} defaultValue={g.order} />
            <Field name="items" label="Skills" textarea rows={5} uid={g._id} defaultValue={g.items.join("\n")} hint="One per line." />
          </AdminForm>
          <form action={deleteSkillGroup} className="card-actions">
            <input type="hidden" name="id" value={g._id} />
            <ConfirmButton message={`Delete the "${g.name}" group?`}>Delete group</ConfirmButton>
          </form>
        </div>
      ))}
      <div className="card">
        <h3>Add a group</h3>
        <AdminForm action={saveSkillGroup} submitLabel="Add group" resetOnSuccess>
          <input type="hidden" name="id" value="" />
          <Field uid="new" name="name" label="Group name" required placeholder="Frontend" />
          <Field uid="new" name="order" label="Order" type="number" defaultValue={groups.length} />
          <Field uid="new" name="items" label="Skills" textarea rows={4} hint="One per line." />
        </AdminForm>
      </div>
    </>
  );
}
