import Link from "next/link";
import { SideNav } from "@/components/admin/ui";
import { ThemeToggle } from "@/components/site/client";
import { requireAdmin } from "@/lib/auth";
import { getCounts } from "@/lib/data";
import { logout } from "../auth-actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const { unread } = await getCounts();
  return (
    <div className="admin">
      <aside className="aside">
        <Link className="brand" href="/admin">Admin<b>.</b></Link>
        <SideNav unread={unread} />
        <div className="bottom">
          <Link href="/" target="_blank">View site ↗</Link>
          <ThemeToggle className="mode" />
          <form action={logout}>
            <button className="link" type="submit">Log out</button>
          </form>
        </div>
      </aside>
      <div className="work">{children}</div>
    </div>
  );
}
