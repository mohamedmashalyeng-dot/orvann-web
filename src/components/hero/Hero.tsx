import { Fragment, type CSSProperties } from "react";
import type { Link, SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RichText } from "@/components/ui/RichText";
import { HeroGraphic } from "./HeroGraphic";
import { HeroStage } from "./HeroStage";
import styles from "./Hero.module.css";

/** Sets the stagger index read by the entrance keyframes (see globals.css). */
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

type Props = {
  hero: SiteContent["hero"];
  /** The primary call to action (Start a Project). */
  primary: Link;
  /** Explore Our Work; left out while Our Work is hidden. */
  secondary?: Link;
};

/** data-enter marks the CSS entrance sequence; pointer depth and scroll live in HeroStage. */
export function Hero({ hero, primary, secondary }: Props) {
  return (
    <HeroStage className={cn("tone-base", styles.hero)} aria-labelledby="hero-title">
      <div className={styles.graphicWrap} data-hero-graphic="">
        <HeroGraphic className={styles.graphic} />
      </div>

      <div className={cn("container", styles.inner)}>
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

          <p className={cn("type-h3", styles.subheadline)} data-enter="lede">
            {hero.subheadline}
          </p>

          <p className={cn("type-lede", styles.lede)} data-enter="lede">
            {hero.lede}
          </p>

          <div className={styles.actions}>
            <ButtonLink href={primary.href} icon="arrow" data-enter="action" style={stagger(0)}>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary" data-enter="action" style={stagger(1)}>
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
