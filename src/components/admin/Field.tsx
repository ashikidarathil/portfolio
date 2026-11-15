type Props = {
  name: string;
  label: string;
  defaultValue?: string | number;
  textarea?: boolean;
  rows?: number;
  type?: "text" | "url" | "email" | "number";
  hint?: string;
  full?: boolean;
  required?: boolean;
  code?: boolean;
  placeholder?: string;
  uid?: string;
};

export function Field({ name, label, defaultValue = "", textarea, rows = 4, type = "text", hint, full, required, code, placeholder, uid }: Props) {
  const id = `f-${uid ? uid + "-" : ""}${name}`;
  return (
    <div className={`af${full || textarea ? " full" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} name={name} rows={rows} defaultValue={defaultValue} required={required} className={code ? "code" : undefined} placeholder={placeholder} />
      ) : (
        <input id={id} name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} />
      )}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="check full">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
