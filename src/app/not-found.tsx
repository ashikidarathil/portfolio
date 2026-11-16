import Link from "next/link";
import { Arrow } from "@/components/Arrow";

export default function NotFound() {
  return (
    <div className="site">
      <section className="phead" style={{ minHeight: "60vh", alignItems: "center" }}>
        <h1>404<sup>(lost)</sup></h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <p>This page doesn&apos;t exist or was moved.</p>
          <Link className="btn" href="/">Back to home <Arrow /></Link>
        </div>
      </section>
    </div>
  );
}
