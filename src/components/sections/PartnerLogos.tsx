import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { flags, partners, type Partner } from "@/config/site";
import { localePath, type Locale } from "@/content";
import { cn } from "@/lib/cn";
import { Marquee } from "@/components/motion/Marquee";
import styles from "./PartnerLogos.module.css";

type Props = {
  locale: Locale;
  className?: string;
};

/** Logos have very different proportions; scale each to a similar visual weight. */
function logoSize(width: number, height: number) {
  const ratio = width / height;
  const displayHeight = Math.min(44, Math.round(44 * Math.pow(ratio, -0.4)));
  return { height: displayHeight, width: Math.round(displayHeight * ratio) };
}

function PartnerTile({ partner, locale, focusable }: { partner: Partner; locale: Locale; focusable: boolean }) {
  const size = logoSize(partner.width, partner.height);
  const logo = (
    <span
      className={styles.logo}
      data-has-color={partner.colorSrc ? "" : undefined}
      style={{ "--w": `${size.width}px`, "--h": `${size.height}px` } as CSSProperties}
    >
      <Image src={partner.src} alt={partner.name} fill sizes={`${size.width * 2}px`} className={styles.mono} />
      {partner.colorSrc && (
        // Same logo in colour, revealed on hover; the white one above already names it.
        <Image src={partner.colorSrc} alt="" aria-hidden="true" fill sizes={`${size.width * 2}px`} className={styles.color} />
      )}
    </span>
  );
  // While Our Work is hidden there is no case study to open: the logo stands on its own.
  if (!flags.showWork) return <span className={styles.tile}>{logo}</span>;
  // Every logo opens the partner's case study; its website, where verified, is linked there.
  return (
    <Link
      href={localePath(locale, `/our-projects/${partner.project}/`)}
      className={styles.tile}
      tabIndex={focusable ? undefined : -1}
    >
      {logo}
    </Link>
  );
}

/**
 * The partner logos as a carousel: it runs on its own, stops while hovered or focused,
 * and each logo lights up in its own colours and opens the partner's case study. With reduced
 * motion it is a still, wrapped row.
 */
export function PartnerLogos({ locale, className }: Props) {
  const list = (focusable: boolean) => (
    <ul className={styles.list}>
      {partners.map((partner) => (
        <li key={partner.name}>
          <PartnerTile partner={partner} locale={locale} focusable={focusable} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn(styles.carousel, className)}>
      <Marquee duration={45} pauseOnHover wrapWhenStill repeat={list(false)}>
        {list(true)}
      </Marquee>
    </div>
  );
}
