import Image from "next/image";
import { initials } from "@/lib/utils";

export function Cover({
  src,
  label,
  className = "",
  sizes = "(max-width: 860px) 100vw, 50vw",
  priority = false,
}: {
  src?: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`cover ${className}`}>
      {src ? (
        <Image src={src} alt={label} fill sizes={sizes} priority={priority} />
      ) : (
        <span className="ini" aria-hidden="true">{initials(label)}</span>
      )}
    </div>
  );
}
