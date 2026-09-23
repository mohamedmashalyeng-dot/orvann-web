import type { SocialProfile } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./SocialLinks.module.css";

type Props = {
  profiles: SocialProfile[];
  newTabLabel: string;
  /** "rows": big interactive rows; "orbs": compact round buttons. */
  variant?: "rows" | "orbs";
  className?: string;
};

/**
 * ORVANN's social profiles as a feature, not a footnote. Rows fill with colour, the icon
 * spins and the arrow turns on hover and keyboard focus; only decorative layers move,
 * so each link's target stays put. Everything reads the same without motion.
 */
export function SocialLinks({ profiles, newTabLabel, variant = "rows", className }: Props) {
  if (variant === "orbs") {
    return (
      <ul className={cn(styles.orbs, className)}>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <a
              href={profile.href}
              className={styles.orb}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic=""
              aria-label={`${profile.label} ${newTabLabel}`}
            >
              <span className={styles.orbInner} data-magnetic-inner="">
                <SocialIcon id={profile.id} className={styles.orbIcon} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn(styles.rows, className)}>
      {profiles.map((profile, index) => (
        <li key={profile.id}>
          <a href={profile.href} className={styles.row} target="_blank" rel="noopener noreferrer">
            <span className={cn("type-label", styles.index)} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.iconWrap} aria-hidden="true">
              <SocialIcon id={profile.id} className={styles.icon} />
            </span>
            <span className={styles.name}>{profile.label}</span>
            <span className={cn("type-label", styles.handle)} dir="ltr">
              {profile.handle}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <ArrowUpRightIcon className={styles.arrowIcon} />
            </span>
            <span className="visually-hidden"> {newTabLabel}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
