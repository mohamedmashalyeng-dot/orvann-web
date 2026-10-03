type Network = "linkedin" | "instagram" | "facebook" | "whatsapp";

/** Simple, recognisable glyphs for each network (decorative; links carry the name). */
export function SocialIcon({ id, className }: { id: Network; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (id) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.2 8.6h3.3V20H4.2zM5.85 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM9.5 8.6h3.2v1.6h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.25 4.05 5.15V20h-3.3v-5.6c0-1.35-.05-3.05-1.85-3.05-1.85 0-2.15 1.45-2.15 2.95V20H9.5z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13.6 21v-7.7h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.49-1.46h1.59V4.25A21 21 0 0 0 14.36 4c-2.29 0-3.86 1.4-3.86 3.97v2.33H7.9v3h2.6V21z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M4.3 19.7l1.1-3.9A8.2 8.2 0 1 1 8.6 19z" />
          <path
            d="M9.1 8.1c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1.4 1.8 2.3 2.2.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.7 1.8-1.7 1.9-1 .1-2.4-.3-4-1.7-1.9-1.7-2.8-3.4-2.8-4.6 0-.6.2-1.1.3-1.2z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}
