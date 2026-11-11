import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo";
import styles from "./AnnouncementBar.module.css";

const STRIPS = 12;

/** The UAE launch bar above the header: a plane towing a "Coming soon to the UAE" banner. */
export function AnnouncementBar({ text }: { text: string }) {
  const face = (
    <span className={styles.face}>
      <Logo variant="mark" className={styles.faceMark} />
      {text}
    </span>
  );

  return (
    <div className={styles.announce}>
      <p className="visually-hidden">{text}</p>
      <div className={styles.flight} aria-hidden="true">
        <div className={styles.bob}>
          <svg className={styles.plane} viewBox="0 0 200 64" focusable="false">
            <ellipse className={styles.prop} cx="7" cy="35" rx="2.5" ry="22" />
            <rect x="48" y="8" width="80" height="5" rx="2.5" />
            <path d="M70 43L96 13" className={styles.strut} />
            <path d="M14 31C20 25 34 23 46 22L60 13H104C118 13 140 22 168 26L176 4H190L194 28C194 33 190 36 184 36L110 44C80 47 40 47 22 44C16 43 12 38 12 35C12 33 13 32 14 31Z" />
            <rect x="150" y="26" width="48" height="4" rx="2" />
            <path className={styles.stripe} d="M18 37L180 32.5L182 35.5L22 41.5Z" />
            <path className={styles.window} d="M48 23L60 15H74V24Z" />
            <rect className={styles.window} x="80" y="15" width="18" height="9" rx="2" />
            <path d="M52 45L48 55" className={styles.strut} />
            <circle className={styles.wheel} cx="47" cy="57" r="5" />
            <circle className={styles.light} cx="186" cy="5" r="2.5" />
          </svg>
          <svg className={styles.rope} viewBox="0 0 100 40" preserveAspectRatio="none" focusable="false">
            <path d="M0 21Q50 33 100 20" />
          </svg>
          <span className={styles.banner}>
            <span className={styles.sizer}>{face}</span>
            {Array.from({ length: STRIPS }, (_, i) => (
              <span key={i} className={styles.strip} style={{ "--i": i } as CSSProperties}>
                {face}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
