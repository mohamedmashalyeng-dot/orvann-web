import type { CSSProperties } from "react";
import styles from "./HeroFlight.module.css";

// Physical left-to-right flight in both languages, including a full loop before arrival.
const ROUTE = "M-70 120C120 150 340 145 460 95C590 40 597 12 540 14C437 18 480 176 650 130C750 103 850 90 930 92";

export function HeroFlight({ message }: { message: string }) {
  return (
    <div className={styles.scene} data-hero-flight="">
      <svg
        className={styles.sky}
        viewBox="0 0 1000 180"
        aria-hidden="true"
        focusable="false"
        style={{ "--flight-route": `path('${ROUTE}')` } as CSSProperties}
      >
        <defs>
          <mask id="hero-flight-trail" maskUnits="userSpaceOnUse" x="-100" y="-40" width="1200" height="260">
            <path d={ROUTE} className={styles.reveal} pathLength={1} />
          </mask>
        </defs>
        <path d={ROUTE} className={styles.trail} mask="url(#hero-flight-trail)" />
        <circle cx="953" cy="92" r="10" className={styles.ring} />
        <circle cx="953" cy="92" r="3.5" className={styles.destination} />
        <g className={styles.flight}>
          <path className={styles.aircraft} d="M22 0C22-1.8 20-2.6 17-2.6H5L-5-19H-10L-4.5-2.6H-14L-18-8.5H-21L-19.5 0L-21 8.5H-18L-14 2.6H-4.5L-10 19H-5L5 2.6H17C20 2.6 22 1.8 22 0Z" />
        </g>
      </svg>
      <p className={styles.message}>
        <span className={styles.flag} aria-hidden="true"><span /><span /><span /></span>
        {message}
      </p>
    </div>
  );
}
