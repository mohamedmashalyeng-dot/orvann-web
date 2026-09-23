import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./ReviewTag.module.css";

/** Dashed annotation marking copy that still needs sign-off. Shown only in review builds. */
export function ReviewTag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("type-label", styles.tag, className)}>{children}</span>;
}
