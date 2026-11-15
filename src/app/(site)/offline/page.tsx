import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Offline", robots: { index: false } };

export default function Offline() {
  return (
    <section className="phead" style={{ minHeight: "60vh", alignItems: "center" }}>
      <h1>Offline<sup>(!)</sup></h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <p>You&apos;re not connected right now. Pages you&apos;ve already opened still work. Reconnect to see the rest.</p>
        <Link className="btn" href="/">Try the home page →</Link>
      </div>
    </section>
  );
}
