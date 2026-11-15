import { Field } from "@/components/admin/Field";
import { AdminForm, UploadField } from "@/components/admin/ui";
import { getProfile } from "@/lib/data";
import { saveProfile } from "../../actions";

export default async function ProfilePage() {
  const p = await getProfile();
  return (
    <>
      <header className="ahead"><div><h1>Profile</h1><p>Your hero, about section and contact details.</p></div></header>
      <AdminForm action={saveProfile} submitLabel="Save profile">
        <Field name="name" label="Full name" defaultValue={p.name} required hint="The last word goes on the second hero line." />
        <Field name="title" label="Title" defaultValue={p.title} placeholder="Junior Full Stack Developer" />
        <Field name="status" label="Status" defaultValue={p.status} placeholder="Open to junior roles" hint="Leave empty to hide." />
        <Field name="stackLabel" label="Stack (short)" defaultValue={p.stackLabel} placeholder="MERN + Next.js" />
        <Field name="shortLocation" label="Location (short)" defaultValue={p.shortLocation} placeholder="Kerala, India" />
        <Field name="location" label="Location (full)" defaultValue={p.location} />
        <Field name="lead" label="Hero intro" textarea rows={3} defaultValue={p.lead} />
        <Field name="aboutHeading" label="About heading" textarea rows={2} defaultValue={p.aboutHeading} />
        <Field name="aboutBody" label="About text" textarea rows={5} defaultValue={p.aboutBody} />
        <Field
          name="principles"
          label="About cards"
          textarea
          rows={5}
          defaultValue={p.principles.map((x) => `${x.title} | ${x.description}`).join("\n")}
          hint="One per line: Title | Description"
        />
        <Field name="email" label="Email" type="email" defaultValue={p.email} />
        <Field name="timezone" label="Time zone" defaultValue={p.timezone} hint="For the clock in the nav, e.g. Asia/Kolkata" />
        <Field name="tzLabel" label="Time zone label" defaultValue={p.tzLabel} placeholder="IST" />
        <Field
          name="socials"
          label="Social links"
          textarea
          rows={4}
          defaultValue={p.socials.map((x) => `${x.name} | ${x.url}`).join("\n")}
          hint="One per line: Name | https://…"
        />
        <UploadField name="resumeUrl" label="Resume (PDF)" defaultValue={p.resumeUrl} accept="application/pdf" hint="Upload a PDF or paste a link. Shows a Download resume link in the hero." />
      </AdminForm>
    </>
  );
}
