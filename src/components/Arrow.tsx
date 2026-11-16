/**
 * Line arrow drawn as SVG. Text arrows like "↗" turn into colour emoji on iPhone,
 * so every arrow on the site uses this instead. It takes the text colour and size.
 */
const PATHS = {
  "up-right": "M7 17 17 7M8 7h9v9",
  right: "M4 12h16m-6-6 6 6-6 6",
  left: "M20 12H4m6-6-6 6 6 6",
} as const;

export function Arrow({ dir = "right", className }: { dir?: keyof typeof PATHS; className?: string }) {
  return (
    <svg
      className={`arrow${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[dir]} />
    </svg>
  );
}
