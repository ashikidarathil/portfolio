import { ConfirmButton } from "@/components/admin/ui";
import { getMessages } from "@/lib/data";
import { deleteMessage, toggleRead } from "../../actions";

export default async function Inbox() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;
  return (
    <>
      <header className="ahead">
        <div><h1>Inbox</h1><p>{messages.length} messages · {unread} unread</p></div>
      </header>
      {messages.length === 0 ? (
        <p style={{ color: "var(--mute)" }}>No messages yet. They appear here when someone uses the contact form on your site.</p>
      ) : (
        <div className="inbox">
          {messages.map((m) => (
            <div key={m._id} className={`mail-item${m.read ? "" : " unread"}`}>
              <div>
                <div className="who">{m.name}</div>
                <div className="meta">{m.email} · {new Date(m.createdAt).toLocaleString("en-GB")}</div>
              </div>
              <div className="acts">
                <a className="abtn sm" href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message")}`}>Reply</a>
                <form action={toggleRead} className="inline">
                  <input type="hidden" name="id" value={m._id} />
                  <input type="hidden" name="read" value={String(!m.read)} />
                  <button className="abtn ghost sm" type="submit">{m.read ? "Mark unread" : "Mark read"}</button>
                </form>
                <form action={deleteMessage} className="inline">
                  <input type="hidden" name="id" value={m._id} />
                  <ConfirmButton title="Delete this message?" message={`The message from ${m.name} will be removed for good.`}>Delete</ConfirmButton>
                </form>
              </div>
              <p className="body">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
