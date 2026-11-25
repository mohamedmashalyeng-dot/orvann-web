import type { ReactNode } from "react";

/**
 * A headline's closing full stop in ORVANN blue, as in the brand's "STRATEGY THAT MOVES."
 * Text without a closing full stop comes back as it is.
 */
export function withDot(text: string): ReactNode {
  if (!text.endsWith(".")) return text;
  return (
    <>
      {text.slice(0, -1)}
      <span className="dot">.</span>
    </>
  );
}
