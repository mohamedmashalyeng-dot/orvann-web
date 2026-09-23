import Link from "next/link";
import type { SiteContent } from "@/content";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { FooterSignature } from "@/components/motion/FooterSignature";
import styles from "./SiteFooter.module.css";

type Props = {
  content: SiteContent;
};

export function SiteFooter({ content }: Props) {
  const { footer, a11y, social } = content;
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className={cn("tone-alt", styles.footer)}>
      <div className="container">
        <div className={styles.lead}>
          <p className={cn("type-label", styles.leadLabel)}>{footer.contactTitle}</p>
          <a href={`mailto:${site.email}`} className={styles.email} data-magnetic="">
            <span data-magnetic-inner="">{site.email}</span>
          </a>
        </div>

        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink} aria-label={a11y.home}>
              <Logo className={styles.brandLogo} />
            </Link>
            <p className="type-body">{footer.tagline}</p>
          </div>

          <nav className={cn(styles.column, styles.explore)} aria-label={a11y.footerNav}>
            <h2 className={cn("type-label", styles.columnTitle)}>{footer.exploreTitle}</h2>
            <ul className={styles.list}>
              {footer.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={cn(styles.column, styles.more)}>
            <h2 className={cn("type-label", styles.columnTitle)}>{footer.moreTitle}</h2>
            <ul className={styles.list}>
              {footer.more.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={cn(styles.column, styles.reach)}>
            <h2 className={cn("type-label", styles.columnTitle)}>{footer.followTitle}</h2>
            <SocialLinks profiles={social.profiles} newTabLabel={a11y.newTab} variant="orbs" />
            <ul className={styles.list}>
              <li>
                <a href={site.phone.href} className={styles.link} dir="ltr">
                  {site.phone.display}
                </a>
              </li>
              <li className={styles.address}>{content.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <Link href={site.privacyPolicyUrl} className={styles.link}>
            {footer.privacy}
          </Link>
          <a href="#top" className={cn(styles.link, styles.toTop)}>
            {footer.backToTop}
            <ArrowUpIcon className={styles.toTopIcon} />
          </a>
        </div>
      </div>

      <FooterSignature label={a11y.logo} />
    </footer>
  );
}
