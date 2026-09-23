import { Fragment, type CSSProperties } from "react";
import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroGraphic } from "./HeroGraphic";
import { HeroStage } from "./HeroStage";
import styles from "./Hero.module.css";

/** Sets the stagger index read by the entrance keyframes (see globals.css). */
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/** data-enter marks the CSS entrance sequence; pointer depth and scroll live in HeroStage. */
export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <HeroStage className={cn("tone-base", styles.hero)} aria-labelledby="hero-title">
      <div className={styles.graphicWrap} data-hero-graphic="">
        <HeroGraphic labels={hero.graphicLabels} className={styles.graphic} />
      </div>

      <div className={cn("container", styles.inner)}>
        <div className={styles.meta}>
          <SectionLabel data-enter="meta" style={stagger(0)}>
            {hero.eyebrow}
          </SectionLabel>
          <p className={cn("type-label", styles.location)} data-enter="meta" style={stagger(1)}>
            {hero.location}
          </p>
        </div>

        <div className={styles.composition}>
          <h1 id="hero-title" className={cn("type-display", styles.title)}>
            {hero.headline.map((line, index) => (
              <Fragment key={index}>
                <span className={styles.line}>
                  <span className={styles.lineInner} data-enter="line" style={stagger(index)}>
                    <RichText line={line} />
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <p className={cn("type-lede", styles.lede)} data-enter="lede">
            {hero.lede}
          </p>

          <div className={styles.actions}>
            <ButtonLink href={hero.primaryCta.href} icon="arrow" data-enter="action" style={stagger(0)}>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" data-enter="action" style={stagger(1)}>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
