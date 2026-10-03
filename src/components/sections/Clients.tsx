import type { Locale, SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { PartnerLogos } from "./PartnerLogos";
import styles from "./Clients.module.css";

type Props = {
  locale: Locale;
  clients: SiteContent["clients"];
};

/** The client logos as a strip right under the hero; each opens that client's case study. */
export function Clients({ locale, clients }: Props) {
  return (
    <section className={cn("tone-base", styles.section)} aria-labelledby="clients-title">
      <Reveal className={cn("container", styles.layout)}>
        <div className={styles.head}>
          <h2 id="clients-title" className={cn("type-label", styles.title)} data-reveal="">
            {clients.title}
          </h2>
          <p className="type-body" data-reveal="">
            {clients.text}
          </p>
        </div>
        <PartnerLogos locale={locale} className={styles.logos} />
      </Reveal>
    </section>
  );
}
