"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./SentDialog.module.css";

type Props = {
  open: boolean;
  title: string;
  message: string;
  close: string;
  onClose: () => void;
};

/** The burst behind the tick: pieces flung out at even angles, alternating shape and blue. */
const pieces = Array.from({ length: 22 }, (_, index) => ({
  angle: (360 / 22) * index + (index % 2 ? 6 : -4),
  distance: 7 + (index % 4) * 1.6,
  delay: (index % 5) * 30,
  spin: (index % 2 ? 1 : -1) * (200 + (index % 3) * 120),
  shape: index % 3,
}));

/**
 * The "thank you" pop-up both forms open once their handler has taken a submission (or the
 * page comes back with ?sent=1 without JavaScript's help). A native modal dialog, so focus,
 * Escape and the backdrop behave as people expect; the tick draws itself, rings pulse out and
 * a burst of brand-blue pieces flies off it. With reduced motion it simply fades in.
 */
export function SentDialog({ open, title, message, close, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="sent-dialog-title"
      aria-describedby="sent-dialog-message"
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop (the dialog element itself, outside the card) closes it.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {open ? (
        <div className={styles.card}>
          <div className={styles.badge} aria-hidden="true">
            <span className={styles.ring} />
            <span className={styles.ring} />
            <span className={styles.burst}>
              {pieces.map((piece, index) => (
                <i
                  key={index}
                  className={styles.piece}
                  data-shape={piece.shape}
                  style={
                    {
                      "--angle": `${piece.angle}deg`,
                      "--distance": `${piece.distance}rem`,
                      "--delay": `${piece.delay}ms`,
                      "--spin": `${piece.spin}deg`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <svg className={styles.check} viewBox="0 0 52 52">
              <circle className={styles.circle} cx="26" cy="26" r="24" />
              <path className={styles.tick} d="M15 27.5l7.5 7.5L37.5 19" />
            </svg>
          </div>
          <h2 id="sent-dialog-title" className={styles.title}>
            {title}
          </h2>
          <p id="sent-dialog-message" className={styles.message}>
            {message}
          </p>
          <form method="dialog">
            <button type="submit" className={styles.close} autoFocus>
              {close}
            </button>
          </form>
        </div>
      ) : null}
    </dialog>
  );
}
