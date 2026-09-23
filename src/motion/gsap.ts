import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registered once, when the lazily loaded motion runtime first evaluates.
gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
// Mobile browser chrome showing/hiding must not re-measure every trigger.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, Flip, ScrollTrigger, SplitText };

/** Media conditions shared by every motion utility (used with gsap.matchMedia). */
export const conditions = {
  motion: "(prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;
