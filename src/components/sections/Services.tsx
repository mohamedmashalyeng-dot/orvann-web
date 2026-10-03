import Link from "next/link";
import { localePath, type Locale, type ServiceId, type SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Services.module.css";

type Props = {
  locale: Locale;
  services: SiteContent["services"];
  serviceNames: Record<ServiceId, string>;
};

/** The five services as numbered rows; each links to its section on the services page. */
export function Services({ locale, services, serviceNames }: Props) {
  return (
    <section id="services" className="tone-alt section" aria-labelledby="services-title">
      <div className={cn("container", styles.layout)}>
        <Reveal as="header" className={styles.head}>
          <SectionLabel data-reveal="">{services.label}</SectionLabel>
          <h2 id="services-title" className="type-h2" data-reveal="">
            {services.title}
          </h2>
          <p className="type-lede" data-reveal="">
            {services.intro}
          </p>
        </Reveal>

        <Reveal className={styles.listWrap}>
          <ol className={styles.list}>
            {services.items.map((item, index) => (
              <li key={item.id} className={styles.row} data-reveal="">
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.body}>
                  <h3 className={cn("type-h3", styles.title)}>{serviceNames[item.id]}</h3>
                  <p className="type-body">{item.text}</p>
                  <Link href={localePath(locale, `/services/#${item.id}`)} className={styles.link}>
                    {item.link}
                    <ArrowIcon className={styles.arrow} />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
