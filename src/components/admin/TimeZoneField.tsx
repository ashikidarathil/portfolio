"use client";

import { useMemo, useState } from "react";
import { allTimeZones, normalizeTimeZone, timeZoneLabel } from "@/lib/timezone";

/** Time zone input with suggestions, auto-correct, device detection and an auto-filled label. */
export function TimeZoneField({ defaultZone, defaultLabel }: { defaultZone: string; defaultLabel: string }) {
  const zones = useMemo(() => allTimeZones(), []);
  const [zone, setZone] = useState(defaultZone);
  const [label, setLabel] = useState(defaultLabel);
  const [hint, setHint] = useState("");
  const [now, setNow] = useState("");

  function apply(raw: string) {
    const fixed = normalizeTimeZone(raw);
    if (!fixed) {
      setHint(raw.trim() ? `"${raw}" isn't a time zone. Try a city or country, like Doha or Qatar.` : "");
      setNow("");
      return;
    }
    setZone(fixed);
    setLabel(timeZoneLabel(fixed));
    setHint(fixed !== raw.trim() ? `Corrected to ${fixed}.` : "");
    try {
      setNow(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: fixed }).format(new Date()));
    } catch {
      setNow("");
    }
  }

  function detect() {
    const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
    apply(mine);
  }

  return (
    <>
      <div className="af">
        <label htmlFor="f-timezone">Time zone</label>
        <input
          id="f-timezone"
          name="timezone"
          type="text"
          list="tz-list"
          value={zone}
          autoComplete="off"
          spellCheck={false}
          placeholder="Start typing: Qatar, Doha, Asia/Qatar…"
          onChange={(e) => {
            setZone(e.target.value);
            // Picking from the suggestion list gives an exact name: fill the label right away.
            if (zones.includes(e.target.value)) apply(e.target.value);
          }}
          onBlur={(e) => apply(e.target.value)}
        />
        <datalist id="tz-list">
          {zones.map((z) => (
            <option key={z} value={z} />
          ))}
        </datalist>
        <span className="hint">
          <button type="button" className="linkbtn" onClick={detect}>Use my current time zone</button>
          {now && <> · Now {now} there</>}
          {hint && <> · {hint}</>}
        </span>
      </div>
      <div className="af">
        <label htmlFor="f-tzLabel">Time zone label</label>
        <input id="f-tzLabel" name="tzLabel" type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="AST" />
        <span className="hint">Fills in automatically. Shown next to the clock in the nav.</span>
      </div>
    </>
  );
}
