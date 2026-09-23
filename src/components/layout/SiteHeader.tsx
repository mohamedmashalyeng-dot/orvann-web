"use client";

import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Link as NavLink, SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { loadMotion, whenIdle, type MotionRuntime } from "@/motion/useMotion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import styles from "./SiteHeader.module.css";

type Props = {
  header: SiteContent["header"];
  nav: NavLink[];
  a11y: SiteContent["a11y"];
};

type Timeline = ReturnType<MotionRuntime["animateMenuOpen"]>;

const DESKTOP_QUERY = "(min-width: 64em)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/** Page regions made inert (and the page scroll-locked) while the menu is open. */
function setBackgroundLocked(locked: boolean) {
  document.documentElement.classList.toggle("menu-open", locked);
  for (const id of ["skip-link", "main", "site-footer", "whatsapp-float"]) {
    document.getElementById(id)?.toggleAttribute("inert", locked);
  }
}

/** "/services/" is current on itself; "/our-projects/" also on every project page. */
function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader({ header, nav, a11y }: Props) {
  // `open` is the menu's state; `panelShown` keeps the panel rendered while it animates closed.
  const [open, setOpen] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // The menu animates once the motion runtime has loaded; before that it opens instantly.
  const motionRef = useRef<MotionRuntime | null>(null);
  const menuTimeline = useRef<Timeline | null>(null);

  const openMenu = () => {
    setPanelShown(true);
    setOpen(true);
  };

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    setBackgroundLocked(false);
    if (returnFocus) toggleRef.current?.focus();
    const panel = panelRef.current;
    const motion = motionRef.current;
    if (!panel || !motion || window.matchMedia(REDUCED_QUERY).matches) {
      setPanelShown(false);
      return;
    }
    menuTimeline.current?.kill();
    menuTimeline.current = motion.animateMenuClose(panel, () => setPanelShown(false));
  };

  // Stable handlers for the listeners below, always calling the latest closeMenu.
  const onEscape = useEffectEvent(() => closeMenu(true));
  const onDesktop = useEffectEvent(() => closeMenu(false));

  useEffect(() => {
    let active = true;
    const cancelIdle = whenIdle(() => {
      loadMotion()
        .then((motion) => {
          if (active) motionRef.current = motion;
        })
        .catch(() => {});
    });
    return () => {
      active = false;
      cancelIdle();
      menuTimeline.current?.kill();
    };
  }, []);

  // Opening animation, set up before paint so the panel never flashes fully open first.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const motion = motionRef.current;
    if (!open || !panel || !motion || window.matchMedia(REDUCED_QUERY).matches) return;
    // Cancel a close still in progress, so its completion can't hide the panel.
    menuTimeline.current?.kill();
    menuTimeline.current = motion.animateMenuOpen(panel);
  }, [open]);

  // Solid bar once the page moves.
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // While open: lock the page behind, focus the first link, close on Escape or when the
  // viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return;
    setBackgroundLocked(true);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = () => {
      if (desktop.matches) onDesktop();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      setBackgroundLocked(false);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  return (
    <>
      <header data-site-header="" className={cn("tone-base", styles.header, (scrolled || panelShown) && styles.solid)}>
        <div className={cn("container", styles.bar)}>
          <Link href="/" className={styles.brand} aria-label={a11y.home} data-enter="header" style={stagger(0)}>
            <Logo className={styles.logo} />
          </Link>

          <nav className={styles.nav} aria-label={a11y.primaryNav}>
            <ul className={styles.navList} data-enter="header" style={stagger(1)}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.tools} data-enter="header" style={stagger(2)}>
            <ThemeToggle label={a11y.lightMode} />
            <ButtonLink href={header.cta.href} size="sm" className={styles.cta} magnetic>
              {header.cta.label}
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? a11y.closeMenu : a11y.openMenu}
              onClick={() => (open ? closeMenu(false) : openMenu())}
            >
              <span className={styles.toggleText} aria-hidden="true">
                {open ? header.close : header.menu}
              </span>
              <span className={styles.toggleIcon} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* A sibling, not a child: the header's backdrop-filter would otherwise become the
          containing block for this fixed panel and trap it inside the bar. */}
      <div id="mobile-menu" ref={panelRef} className={cn("tone-base", styles.panel)} hidden={!panelShown}>
        <nav aria-label={a11y.primaryNav}>
          <ul className={styles.panelList}>
            {nav.map((item, index) => (
              <li key={item.href} data-menu-item="">
                <Link
                  href={item.href}
                  className={cn("type-h2", styles.panelLink)}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  onClick={() => closeMenu(false)}
                >
                  <span className={cn("type-label", styles.panelIndex)} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-item="">
          <ButtonLink href={header.cta.href} onClick={() => closeMenu(false)}>
            {header.cta.label}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
