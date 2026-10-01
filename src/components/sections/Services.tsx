import Link from "next/link";
import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Services.module.css";

/** The five services as numbered rows; each opens the services page where it is covered. */
export function Services({ services }: { services: SiteContent["services"] }) {
  return (
    <section id="services" className="tone-alt section" aria-labelledby="services-title">
      <div className={cn("container", styles.layout)}>
        <Reveal as="header" className={styles.head}>
          <h2 id="services-title" className="type-h2" data-reveal="">
            {services.title}
          </h2>
        </Reveal>

        <Reveal className={styles.listWrap}>
          <ol className={styles.list}>
            {services.items.map((item, index) => (
              <li key={item.label} data-reveal="">
                <Link href={item.href} className={styles.row}>
                  <span className={cn("type-label", styles.number)} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("type-h3", styles.title)}>{item.label}</span>
                  <ArrowIcon className={styles.arrow} />
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
