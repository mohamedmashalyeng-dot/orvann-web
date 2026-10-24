import { Fragment, type CSSProperties } from "react";
import type { ImageAsset, Link, SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StarButton } from "@/components/ui/StarButton";
import { BlurText, wordCount } from "@/components/motion/BlurText";
import { ProjectFan } from "@/components/visuals/ProjectFan";
import { HeroRays } from "./HeroRays";
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
  /** Covers of ORVANN's three most important projects, shown beside the headline. */
  projects: ImageAsset[];
};

/**
 * data-enter marks the CSS entrance sequence: the headline's words come into focus one
 * after another (Blur Text), then the rest follows. Behind it, Light Rays; around the
 * primary call to action, Star Border. Pointer depth and scroll live in HeroStage.
 */
export function Hero({ hero, primary, secondary, projects }: Props) {
  // Each line's words continue the stagger from the line before.
  const starts = hero.headline.map((_, index) =>
    hero.headline.slice(0, index).reduce((total, line) => total + wordCount(line), 0),
  );

  return (
    <HeroStage className={cn("tone-base", styles.hero)} aria-labelledby="hero-title">
      <HeroRays className={styles.rays} />
      <div className={cn("container", styles.inner)}>
        <div className={styles.composition}>
          <h1 id="hero-title" className={cn("type-display", styles.title)}>
            {hero.headline.map((line, index) => (
              <Fragment key={index}>
                <span className={styles.line}>
                  <BlurText line={line} start={starts[index]} />
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
            <StarButton data-enter="action" style={stagger(0)}>
              <ButtonLink href={primary.href} icon="arrow">
                {primary.label}
              </ButtonLink>
            </StarButton>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary" data-enter="action" style={stagger(1)}>
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>

        <div className={styles.projects} data-hero-graphic="">
          <ProjectFan images={projects} label={hero.projectsLabel} />
        </div>
      </div>
    </HeroStage>
  );
}
