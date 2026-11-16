import Link from "next/link";
import { Suspense } from "react";
import { FlashModal } from "@/components/admin/modal";
import { AdminShell, ConfirmButton, SideNav } from "@/components/admin/ui";
import { ThemeToggle } from "@/components/site/client";
import { requireAdmin } from "@/lib/auth";
import { getCounts } from "@/lib/data";
import { logout } from "../auth-actions";
import { Arrow } from "@/components/Arrow";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const { unread } = await getCounts();
  return (
    <AdminShell
      unread={unread}
      sidebar={
        <>
          <Link className="brand" href="/admin">Admin<b>.</b></Link>
          <SideNav unread={unread} />
          <div className="bottom">
            <Link href="/" target="_blank">View site <Arrow dir="up-right" /></Link>
            <ThemeToggle className="mode" />
            <form action={logout}>
              <ConfirmButton className="link" title="Log out?" message="You'll need your email and password to get back in." confirmLabel="Log out" danger={false}>
                Log out
              </ConfirmButton>
            </form>
          </div>
        </>
      }
    >
      {children}
      <Suspense fallback={null}>
        <FlashModal />
      </Suspense>
    </AdminShell>
  );
}
