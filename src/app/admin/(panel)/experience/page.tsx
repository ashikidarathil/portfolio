import { Field } from "@/components/admin/Field";
import { AdminForm, ConfirmButton } from "@/components/admin/ui";
import { getExperience } from "@/lib/data";
import { deleteExperience, saveExperience } from "../../actions";

export default async function ExperienceAdmin() {
  const items = await getExperience();
  return (
    <>
      <header className="ahead"><div><h1>Experience</h1><p>Lower order numbers show first, so put your latest role at 0.</p></div></header>
      {items.map((e) => (
        <div className="card" key={e._id}>
          <AdminForm action={saveExperience}>
            <input type="hidden" name="id" value={e._id} />
            <Field name="title" label="Title" uid={e._id} defaultValue={e.title} required />
            <Field name="period" label="Period" uid={e._id} defaultValue={e.period} placeholder="2025 – Present" />
            <Field name="order" label="Order" type="number" uid={e._id} defaultValue={e.order} />
            <Field name="description" label="Description" textarea rows={3} uid={e._id} defaultValue={e.description} />
            <Field name="tags" label="Tags" textarea rows={3} uid={e._id} defaultValue={e.tags.join("\n")} hint="One per line." />
          </AdminForm>
          <form action={deleteExperience} className="card-actions">
            <input type="hidden" name="id" value={e._id} />
            <ConfirmButton title="Delete this entry?" message={`"${e.title}" will be removed from your experience list.`}>Delete entry</ConfirmButton>
          </form>
        </div>
      ))}
      <div className="card">
        <h3>Add an entry</h3>
        <AdminForm action={saveExperience} submitLabel="Add entry" resetOnSuccess>
          <input type="hidden" name="id" value="" />
          <Field uid="new" name="title" label="Title" required />
          <Field uid="new" name="period" label="Period" placeholder="2026" />
          <Field uid="new" name="order" label="Order" type="number" defaultValue={0} />
          <Field uid="new" name="description" label="Description" textarea rows={3} />
          <Field uid="new" name="tags" label="Tags" textarea rows={3} hint="One per line." />
        </AdminForm>
      </div>
    </>
  );
}
