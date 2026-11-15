export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function initials(s: string) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function readMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function monthYear(date: string | Date | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(new Date(date));
}

/** Splits a textarea into trimmed, non-empty lines. */
export function lines(v: FormDataEntryValue | null) {
  return String(v ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Parses "left | right" lines into pairs. */
export function pairs(v: FormDataEntryValue | null) {
  return lines(v).map((l) => {
    const i = l.indexOf("|");
    return i === -1 ? [l, ""] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  });
}

/** Splits a full name into hero lines: everything but the last word, then the last word. */
export function nameLines(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return [name];
  return [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
}
