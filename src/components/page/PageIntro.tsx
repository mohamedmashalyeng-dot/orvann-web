import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { PageIntro as PageIntroContent } from "@/content";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import styles from "./PageIntro.module.css";

type Props = {
  intro: PageIntroContent;
  /** Extra content under the lede (buttons, meta). */
  children?: ReactNode;
  /** Content beside the title on desktop only (e.g. an index of the page). */
  aside?: ReactNode;
  /** Decorative illustration: beside the title on desktop, under the intro on smaller screens. */
  visual?: ReactNode;
  className?: string;
};

/**
 * Opening block for inner pages. The title's words rise out of their own masks with a
 * CSS entrance (it paints on the first frame, and plays as a transition curtain lifts).
 */
export function PageIntro({ intro, children, aside, visual, className }: Props) {
  const words = intro.title.split(" ");

  return (
    <section className={cn("tone-base", styles.intro, className)} aria-labelledby="page-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={cn("container", styles.inner)}>
        <SectionLabel data-enter="meta" style={{ "--i": 0 } as CSSProperties}>
          {intro.label}
        </SectionLabel>
        <h1 id="page-title" className={cn("type-display", styles.title)}>
          {words.map((word, index) => (
            <Fragment key={index}>
              <span className={styles.word}>
                <span className={styles.wordInner} data-enter="word" style={{ "--i": index } as CSSProperties}>
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>
        <div className={styles.foot}>
          <p className="type-lede" data-enter="lede">
            {intro.lede}
          </p>
          {children && (
            <div className={styles.extra} data-enter="action">
              {children}
            </div>
          )}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
        {visual && (
          <div className={styles.visual} aria-hidden="true">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
