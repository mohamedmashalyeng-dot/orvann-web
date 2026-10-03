"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale, type Project, type ProjectCategory, type ServiceId } from "@/content";
import { cn } from "@/lib/cn";
import { loadMotion, whenIdle, type MotionRuntime } from "@/motion/useMotion";
import styles from "./ProjectsIndex.module.css";

export type ProjectFilter = "all" | ProjectCategory;

type Props = {
  locale: Locale;
  projects: Project[];
  serviceNames: Record<ServiceId, string>;
  /** Filters to offer, in order; each has a label and its "N projects" count text. */
  filters: { id: ProjectFilter; label: string; count: string }[];
  filterLabel: string;
  empty: string;
};

type FlipState = ReturnType<MotionRuntime["captureLayout"]>;
type Timeline = ReturnType<MotionRuntime["animateLayout"]>;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * All projects, filterable by category. Filters are toggle buttons (aria-pressed) and the
 * new count is announced politely. Once the motion runtime has loaded, cards glide to their
 * new places (GSAP Flip); before that, or with reduced motion, the grid simply updates.
 */
export function ProjectsIndex({ locale, projects, serviceNames, filters, filterLabel, empty }: Props) {
  const [active, setActive] = useState<ProjectFilter>("all");
  const gridRef = useRef<HTMLUListElement>(null);
  const motionRef = useRef<MotionRuntime | null>(null);
  const flipState = useRef<FlipState | null>(null);
  const timeline = useRef<Timeline | null>(null);

  const visible = active === "all" ? projects : projects.filter((project) => project.categories.includes(active));
  const current = filters.find((filter) => filter.id === active) ?? filters[0];

  useEffect(() => {
    let alive = true;
    const cancelIdle = whenIdle(() => {
      loadMotion()
        .then((motion) => {
          if (alive) motionRef.current = motion;
        })
        .catch(() => {});
    });
    return () => {
      alive = false;
      cancelIdle();
      timeline.current?.kill();
    };
  }, []);

  const choose = (id: ProjectFilter) => {
    if (id === active) return;
    const grid = gridRef.current;
    const motion = motionRef.current;
    if (grid && motion && !window.matchMedia(REDUCED_QUERY).matches) {
      // Finish any glide still running, so its inline positioning is cleaned up first.
      timeline.current?.progress(1).kill();
      flipState.current = motion.captureLayout(grid);
    }
    setActive(id);
  };

  // After React has rendered the new set (before paint), animate from the captured layout.
  useLayoutEffect(() => {
    const state = flipState.current;
    const motion = motionRef.current;
    flipState.current = null;
    if (!state || !motion) return;
    timeline.current = motion.animateLayout(state);
  }, [active]);

  return (
    <div className={styles.index}>
      <div className={styles.bar}>
        <div role="group" aria-label={filterLabel} className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={styles.filter}
              aria-pressed={filter.id === active}
              onClick={() => choose(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className={cn("type-label", styles.count)} aria-live="polite">
          {current.count}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="type-lede">{empty}</p>
      ) : (
        <ul ref={gridRef} className={styles.grid}>
          {visible.map((project) => {
            const href = localePath(locale, `/our-projects/${project.slug}/`);
            return (
              <li key={project.slug} className={styles.card} data-project="">
                <article className={styles.article} aria-labelledby={`project-${project.slug}`}>
                  <div
                    className={styles.media}
                    style={{ "--ratio": `${project.image.width} / ${project.image.height}` } as CSSProperties}
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 90rem) 650px, (min-width: 48em) 46vw, 92vw"
                      className={styles.image}
                    />
                    {/* Pointer shortcut to the same page as the title link (not a second tab stop). */}
                    <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden="true" />
                  </div>
                  <h2 id={`project-${project.slug}`} className={cn("type-h3", styles.title)}>
                    <Link href={href} className={styles.link}>
                      {project.title}
                    </Link>
                  </h2>
                  <p className={cn("type-label", styles.disciplines)}>
                    {project.categories.map((id) => serviceNames[id]).join(" · ")}
                  </p>
                  <p className="type-body">{project.summary}</p>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
