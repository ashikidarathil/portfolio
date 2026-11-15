// Time zone helpers shared by the admin form (browser) and the save action (server).

// Friendly names people type, mapped to real time zones.
const ALIASES: Record<string, string> = {
  qatar: "Asia/Qatar",
  doha: "Asia/Qatar",
  india: "Asia/Kolkata",
  kerala: "Asia/Kolkata",
  kozhikode: "Asia/Kolkata",
  calicut: "Asia/Kolkata",
  kochi: "Asia/Kolkata",
  mumbai: "Asia/Kolkata",
  delhi: "Asia/Kolkata",
  bangalore: "Asia/Kolkata",
  bengaluru: "Asia/Kolkata",
  ist: "Asia/Kolkata",
  uae: "Asia/Dubai",
  "abu dhabi": "Asia/Dubai",
  saudi: "Asia/Riyadh",
  "saudi arabia": "Asia/Riyadh",
  ksa: "Asia/Riyadh",
  jeddah: "Asia/Riyadh",
  oman: "Asia/Muscat",
  kuwait: "Asia/Kuwait",
  bahrain: "Asia/Bahrain",
  uk: "Europe/London",
  london: "Europe/London",
  usa: "America/New_York",
  "new york": "America/New_York",
};

// Common abbreviations; browsers often only give "GMT+3" for these zones.
const ABBR: Record<string, string> = {
  "Asia/Qatar": "AST",
  "Asia/Riyadh": "AST",
  "Asia/Kuwait": "AST",
  "Asia/Bahrain": "AST",
  "Asia/Baghdad": "AST",
  "Asia/Dubai": "GST",
  "Asia/Muscat": "GST",
  "Asia/Kolkata": "IST",
  "Asia/Calcutta": "IST",
  "Asia/Karachi": "PKT",
  "Asia/Dhaka": "BST",
  "Asia/Singapore": "SGT",
  "Asia/Tokyo": "JST",
  "Europe/London": "GMT",
  "UTC": "UTC",
};

export function allTimeZones(): string[] {
  try {
    const list = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
    return Array.from(new Set(["Asia/Kolkata", "Asia/Qatar", ...list])).sort();
  } catch {
    return ["Asia/Kolkata", "Asia/Qatar", "Asia/Dubai", "Asia/Riyadh", "Europe/London", "UTC"];
  }
}

/** Returns a valid IANA time zone for what was typed, or null if nothing matches. */
export function normalizeTimeZone(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const key = v.toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ");
  if (ALIASES[key]) return ALIASES[key];
  // Exact or different-case IANA name, e.g. "asia/qatar".
  const exact = allTimeZones().find((z) => z.toLowerCase() === v.toLowerCase());
  if (exact) return exact;
  try {
    return new Intl.DateTimeFormat("en", { timeZone: v }).resolvedOptions().timeZone;
  } catch {}
  // City name only, e.g. "Dubai" or "new york".
  const city = allTimeZones().find((z) => z.split("/").pop()!.replace(/_/g, " ").toLowerCase() === key);
  return city ?? null;
}

/** Short label for a time zone, like "AST" or "GMT+3". */
export function timeZoneLabel(zone: string): string {
  if (ABBR[zone]) return ABBR[zone];
  try {
    const part = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName");
    return part?.value ?? "";
  } catch {
    return "";
  }
}
