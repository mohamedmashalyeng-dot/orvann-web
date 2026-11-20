import type { SiteContent } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Philosophy.module.css";

/** How ORVANN works with clients: a title, then its four principles. */
export function Philosophy({ philosophy }: { philosophy: SiteContent["philosophy"] }) {
  return (
    <section className="tone-base section" aria-labelledby="philosophy-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="philosophy-title" className="type-h2" data-reveal="">
            {philosophy.title}
          </h2>
        </Reveal>

        <Reveal>
          <ul className={styles.points}>
            {philosophy.points.map((point, index) => (
              <li key={point.title} className={styles.point} data-reveal="">
                <span className={cn("type-label", styles.number)} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h3">{point.title}</h3>
                <p className="type-body">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
