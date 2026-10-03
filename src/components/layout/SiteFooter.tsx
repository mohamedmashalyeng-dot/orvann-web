import Link from "next/link";
import { localePath, serviceIds, type SiteContent } from "@/content";
import { isPublishedHref, site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import styles from "./SiteFooter.module.css";

type Props = {
  content: SiteContent;
};

export function SiteFooter({ content }: Props) {
  const { footer, a11y, serviceNames, actions } = content;

  return (
    <footer id="site-footer" className={cn("tone-alt", styles.footer)}>
      <div className="container">
        <div className={styles.lead}>
          <a href={`mailto:${site.email}`} className={styles.email} data-magnetic="">
            <span data-magnetic-inner="">{site.email}</span>
          </a>
          <a href={site.phone.href} className={cn(styles.link, styles.phone)} dir="ltr">
            {site.phone.display}
          </a>
        </div>

        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href={localePath(content.locale, "/")} className={styles.brandLink} aria-label={a11y.home}>
              <Logo className={styles.brandLogo} />
            </Link>
            <p className={styles.tagline}>{footer.tagline}</p>
            <p className="type-body">{footer.description}</p>
            <ButtonLink href={actions.startProject.href} size="sm" icon="arrow">
              {actions.startProject.label}
            </ButtonLink>
          </div>

          <nav className={cn(styles.column, styles.services)} aria-label={a11y.footerServices}>
            <ul className={styles.list}>
              {serviceIds.map((id) => (
                <li key={id}>
                  <Link href={localePath(content.locale, `/services/#${id}`)} className={styles.link}>
                    {serviceNames[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={cn(styles.column, styles.explore)} aria-label={a11y.footerNav}>
            <ul className={styles.list}>
              {footer.explore.filter((item) => isPublishedHref(item.href)).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {site.name}. {footer.rights}
          </p>
          <Link href={localePath(content.locale, site.privacyPolicyUrl)} className={styles.link}>
            {footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
