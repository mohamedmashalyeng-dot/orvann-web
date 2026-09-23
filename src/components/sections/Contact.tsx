import type { SiteContent } from "@/content";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ReviewTag } from "@/components/ui/ReviewTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Contact.module.css";

type Props = {
  contact: SiteContent["contact"];
  newTabLabel: string;
  proposedCopyLabel?: string;
};

/** No form: there is no verified backend, so every channel here is a direct, working link. */
export function Contact({ contact, newTabLabel, proposedCopyLabel }: Props) {
  return (
    <section id="contact" className="tone-accent section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal as="header">
          <SectionLabel data-reveal="">{contact.label}</SectionLabel>
          <h2 id="contact-title" className={cn("type-mega", styles.title)} data-reveal="">
            {contact.title}
          </h2>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <p className="type-lede" data-reveal="">
              {contact.lede}
            </p>
            {proposedCopyLabel && <ReviewTag>{proposedCopyLabel}</ReviewTag>}
            <div className={styles.actions} data-reveal="">
              <ButtonLink href={`mailto:${site.email}`} icon="arrow">
                {contact.emailCta}
              </ButtonLink>
              <ButtonLink href={site.whatsapp.href} variant="secondary" icon="external" newTabLabel={newTabLabel}>
                {contact.whatsappCta}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className={styles.detailsWrap}>
            <dl className={styles.details}>
              <div className={styles.detail} data-reveal="">
                <dt className="type-label">{contact.labels.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className={styles.link}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className={styles.detail} data-reveal="">
                <dt className="type-label">{contact.labels.phone}</dt>
                <dd>
                  <a href={site.phone.href} className={styles.link} dir="ltr">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div className={styles.detail} data-reveal="">
                <dt className="type-label">{contact.labels.whatsapp}</dt>
                <dd>
                  <a
                    href={site.whatsapp.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                  >
                    {site.whatsapp.display}
                    <span className="visually-hidden"> {newTabLabel}</span>
                  </a>
                </dd>
              </div>
              <div className={styles.detail} data-reveal="">
                <dt className="type-label">{contact.labels.headquarters}</dt>
                <dd>{contact.address}</dd>
              </div>
              <div className={cn(styles.detail, styles.follow)} data-reveal="">
                <dt className="type-label">{contact.labels.follow}</dt>
                <dd>
                  <ul className={styles.social}>
                    {site.social.map((profile) => (
                      <li key={profile.id}>
                        <a href={profile.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                          {profile.label}
                          <span className="visually-hidden"> {newTabLabel}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
