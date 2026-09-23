import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowIcon, ArrowUpRightIcon } from "./Icons";
import styles from "./ButtonLink.module.css";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  icon?: "arrow" | "external" | "none";
  /** Opens in a new tab; pass the localized "(opens in a new tab)" text. */
  newTabLabel?: string;
  /** Inner content drifts toward the pointer (fine pointers only; the target never moves). */
  magnetic?: boolean;
};

/**
 * Every call to action on the site is a link styled from the shared button tokens.
 * Internal routes use next/link, so they prefetch and navigate client-side.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "none",
  newTabLabel,
  magnetic,
  className,
  ...rest
}: Props) {
  const external = newTabLabel !== undefined;
  const classes = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <span className={styles.inner} data-magnetic-inner={magnetic ? "" : undefined}>
      <span>{children}</span>
      {external && <span className="visually-hidden"> {newTabLabel}</span>}
      {icon === "arrow" && <ArrowIcon className={styles.icon} />}
      {icon === "external" && <ArrowUpRightIcon className={styles.icon} />}
    </span>
  );

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={classes} data-magnetic={magnetic ? "" : undefined} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      data-magnetic={magnetic ? "" : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
