"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Kind = "success" | "error" | "confirm";
type Options = {
  kind: Kind;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};
type Open = Options & { resolve: (ok: boolean) => void };

type Api = {
  success: (title: string, message?: string) => Promise<boolean>;
  error: (title: string, message?: string) => Promise<boolean>;
  confirm: (o: Omit<Options, "kind">) => Promise<boolean>;
};

const Ctx = createContext<Api | null>(null);

export function useModal() {
  const api = useContext(Ctx);
  if (!api) throw new Error("useModal must be used inside <ModalProvider>");
  return api;
}

const ICON: Record<Kind, string> = { success: "✓", error: "!", confirm: "?" };

/** One modal at a time, built on the native <dialog> (focus trap, Esc, backdrop for free). */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Open | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const primary = useRef<HTMLButtonElement>(null);

  const show = useCallback(
    (o: Options) =>
      new Promise<boolean>((resolve) => {
        setOpen((prev) => {
          prev?.resolve(false); // a new modal replaces any open one
          return { ...o, resolve };
        });
      }),
    [],
  );

  const api = useRef<Api>({
    success: (title, message) => show({ kind: "success", title, message }),
    error: (title, message) => show({ kind: "error", title, message }),
    confirm: (o) => show({ kind: "confirm", ...o }),
  }).current;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      primary.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  function finish(ok: boolean) {
    setOpen((cur) => {
      cur?.resolve(ok);
      return null;
    });
  }

  const isConfirm = open?.kind === "confirm";

  return (
    <Ctx.Provider value={api}>
      {children}
      <dialog
        ref={ref}
        className={`modal modal-${open?.kind ?? "success"}${open?.danger ? " modal-danger" : ""}`}
        aria-labelledby="modal-title"
        aria-describedby={open?.message ? "modal-msg" : undefined}
        onCancel={(e) => {
          e.preventDefault(); // Esc
          finish(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) finish(false); // backdrop click
        }}
      >
        {open && (
          <div className="modal-box">
            <span className="modal-icon" aria-hidden="true">{ICON[open.kind]}</span>
            <h2 id="modal-title">{open.title}</h2>
            {open.message && <p id="modal-msg">{open.message}</p>}
            <div className="modal-actions">
              {isConfirm && (
                <button type="button" className="abtn ghost" onClick={() => finish(false)}>
                  {open.cancelLabel ?? "Cancel"}
                </button>
              )}
              <button
                ref={primary}
                type="button"
                className={`abtn${open.danger ? " danger-solid" : ""}`}
                onClick={() => finish(true)}
              >
                {isConfirm ? open.confirmLabel ?? "Confirm" : "OK"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </Ctx.Provider>
  );
}

const FLASH: Record<string, [string, string]> = {
  "project-created": ["Project created", "It's on your site now. Add images and the rest of the details below."],
  "project-deleted": ["Project deleted", "It's been removed from your site."],
  "post-created": ["Post created", "Tick Published and save when it's ready to go live."],
  "post-deleted": ["Post deleted", "It's been removed from your blog."],
  "group-deleted": ["Skill group deleted", "It's been removed from your home page."],
  "entry-deleted": ["Entry deleted", "It's been removed from your experience list."],
  "message-deleted": ["Message deleted", ""],
};

/** Shows a success modal after a redirect (?flash=...), then cleans the URL. */
export function FlashModal() {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const modal = useModal();
  const flash = params.get("flash");

  useEffect(() => {
    if (!flash || !FLASH[flash]) return;
    const [title, message] = FLASH[flash];
    router.replace(path, { scroll: false });
    modal.success(title, message || undefined);
  }, [flash, path, router, modal]);

  return null;
}
