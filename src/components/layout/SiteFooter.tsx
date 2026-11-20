import Link from "next/link";
import { localePath, type SiteContent } from "@/content";
import { isPublishedHref, site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./SiteFooter.module.css";

type Props = {
  content: SiteContent;
};

/** The brand, then Explore, Contact and Follow, then the privacy policy and copyright. */
export function SiteFooter({ content }: Props) {
  const { footer, a11y } = content;
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className={cn("tone-alt", styles.footer)}>
      <div className="container">
        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href={localePath(content.locale, "/")} className={styles.brandLink} aria-label={a11y.home}>
              <Logo className={styles.brandLogo} />
            </Link>
            <p className={styles.name} lang="en">
              {footer.name}
            </p>
            {footer.taglines.map((line) => (
              <p key={line} className={styles.tagline}>
                <bdi>{line}</bdi>
              </p>
            ))}
          </div>

          <nav className={cn(styles.column, styles.explore)} aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={cn("type-label", styles.heading)}>
              {footer.explore.title}
            </h2>
            <ul className={styles.list}>
              {footer.explore.links.filter((item) => isPublishedHref(item.href)).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={cn(styles.column, styles.contact)}>
            <h2 className={cn("type-label", styles.heading)}>{footer.contact.title}</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${site.email}`} className={styles.link}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phone.href} className={styles.link} dir="ltr">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <address className={styles.address}>{footer.contact.address}</address>
              </li>
            </ul>
          </div>

          <div className={cn(styles.column, styles.follow)}>
            <h2 className={cn("type-label", styles.heading)}>{footer.follow}</h2>
            <ul className={styles.list}>
              {site.social.map((profile) => (
                <li key={profile.id}>
                  <a href={profile.href} className={cn(styles.link, styles.social)} target="_blank" rel="noopener noreferrer">
                    <SocialIcon id={profile.id} className={styles.socialIcon} />
                    {profile.label}
                    <span className="visually-hidden"> {a11y.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            <bdi>
              © {year} {footer.name}.
            </bdi>{" "}
            {footer.rights}
          </p>
          <Link href={localePath(content.locale, site.privacyPolicyUrl)} className={styles.link}>
            {footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
