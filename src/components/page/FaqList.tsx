"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content";
import { cn } from "@/lib/cn";
import styles from "./FaqList.module.css";

/**
 * Questions and answers as an accordion: each question is a real button (click, touch,
 * Enter or Space) that controls its answer region. Several can be open at once.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <ul className={styles.list}>
      {faqs.map((faq, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <li key={faq.question} className={styles.item} data-open={isOpen} data-reveal="">
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.text}>{faq.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
              <div className={styles.panelInner}>
                <p className="type-body">{faq.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
