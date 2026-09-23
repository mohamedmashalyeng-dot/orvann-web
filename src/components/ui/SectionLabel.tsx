import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./SectionLabel.module.css";

type Props = HTMLAttributes<HTMLParagraphElement> & { children: ReactNode };

/** Small mono eyebrow that opens each section. */
export function SectionLabel({ children, className, ...rest }: Props) {
  return (
    <p className={cn("type-label", styles.label, className)} {...rest}>
      {children}
    </p>
  );
}
