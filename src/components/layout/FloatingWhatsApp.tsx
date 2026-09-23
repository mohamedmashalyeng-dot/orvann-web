"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./FloatingWhatsApp.module.css";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
/** Appears once the visitor has scrolled past the first screen. */
const pastFirstScreen = () => window.scrollY > window.innerHeight * 0.75;

/**
 * A quick WhatsApp shortcut in the corner — the fastest way to reach ORVANN. Hidden (and
 * removed from the tab order) until it's useful, and while the mobile menu is open.
 */
export function FloatingWhatsApp({ href, label, newTabLabel }: { href: string; label: string; newTabLabel: string }) {
  const visible = useSyncExternalStore(subscribe, pastFirstScreen, () => false);

  return (
    <a
      id="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(styles.float, visible && styles.visible)}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.pulse} aria-hidden="true" />
      <SocialIcon id="whatsapp" className={styles.icon} />
      <span className={styles.label}>WhatsApp</span>
      <span className="visually-hidden">
        {label} {newTabLabel}
      </span>
    </a>
  );
}
