"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import styles from "./TransitionShell.module.css";

const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
/** How long the new page's entrance waits so it plays as the curtain lifts. */
const ENTER_DELAY = "380ms";
/** If a navigation stalls, lift the curtain anyway rather than trap the visitor. */
const FAILSAFE_MS = 6000;

/**
 * Page transitions. A capture-phase listener catches clicks on internal links (next/link
 * and plain anchors alike), drops a curtain in ORVANN blue, navigates client-side, then
 * lifts the curtain once the new route has rendered. Without JavaScript — or with reduced
 * motion, modifier keys, new-tab targets or same-page anchors — links behave normally.
 */
export function TransitionShell() {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);

  const lift = () => {
    const curtain = curtainRef.current;
    window.clearTimeout(failsafe.current);
    if (!curtain || !covering.current) return;
    const root = document.documentElement;
    root.style.setProperty("--page-enter-delay", ENTER_DELAY);
    document.getElementById("main")?.focus({ preventScroll: true });

    const animation = curtain.animate([{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], {
      duration: 700,
      easing: EASE_OUT,
      fill: "forwards",
    });
    animation.finished
      .catch(() => {})
      .finally(() => {
        curtain.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        curtain.dataset.state = "idle";
        covering.current = false;
        window.setTimeout(() => root.style.removeProperty("--page-enter-delay"), 1500);
      });
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (including #section links): let the browser scroll natively.
      if (url.pathname === window.location.pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const curtain = curtainRef.current;
      if (!curtain) return;
      event.preventDefault();
      if (covering.current) return;
      covering.current = true;
      curtain.dataset.state = "active";

      const target = url.pathname + url.search + url.hash;
      const cover = curtain.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }], {
        duration: 560,
        easing: EASE_IN_OUT,
        fill: "forwards",
      });
      curtain
        .querySelector("[data-curtain-mark]")
        ?.animate(
          [
            { opacity: 0, transform: "translateY(24px) scale(0.9)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 500, delay: 180, easing: EASE_OUT, fill: "both" },
        );
      cover.finished
        .then(() => {
          router.push(target);
          failsafe.current = window.setTimeout(lift, FAILSAFE_MS);
        })
        .catch(() => {
          covering.current = false;
          curtain.dataset.state = "idle";
        });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has rendered behind the curtain: lift it on the next frame.
  useEffect(() => {
    if (!covering.current) return;
    const frame = window.requestAnimationFrame(lift);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div ref={curtainRef} className={styles.curtain} data-state="idle" aria-hidden="true">
      <span className={styles.mark} data-curtain-mark="">
        <Logo variant="mark" className={styles.logo} />
      </span>
    </div>
  );
}
