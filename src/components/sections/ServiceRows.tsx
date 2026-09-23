"use client";

import { useId, useState } from "react";
import type { ServiceItem } from "@/content";
import { cn } from "@/lib/cn";
import styles from "./Services.module.css";

type Props = {
  items: ServiceItem[];
  /** Number shown on the first row; rows count on continuously across groups. */
  firstNumber: number;
  detailsLabel: string;
};

/**
 * Numbered service rows. The title and description are always visible; each row's
 * "What's included" details open from a real button (click, touch, Enter or Space),
 * one row at a time. Nothing depends on hover.
 */
export function ServiceRows({ items, firstNumber, detailsLabel }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ol className={styles.rows}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.title} className={styles.row} data-open={open} data-reveal="">
            <h4 className={styles.rowHeading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(firstNumber + index).padStart(2, "0")}
                </span>
                <span className={cn("type-h3", styles.rowTitle)}>{item.title}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h4>
            <p className={cn("type-body", styles.rowText)}>{item.text}</p>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
              <div className={styles.panelInner}>
                <p className={cn("type-label", styles.detailsLabel)}>{detailsLabel}</p>
                <ul className={styles.details}>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
