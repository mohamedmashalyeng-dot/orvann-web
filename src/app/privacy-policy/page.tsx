import { getContent } from "@/content";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/page/PageIntro";
import { ShieldGraphic } from "@/components/visuals/IntroGraphics";
import styles from "./page.module.css";

const content = getContent();
const page = content.pages.privacy;

export const metadata = pageMetadata(page.meta, "/privacy-policy/");

const sectionId = (index: number) => `policy-${index + 1}`;

/** The privacy policy restated from orvann.com, with a table of contents beside it on desktop. */
export default function PrivacyPage() {
  return (
    <>
      <PageIntro intro={page.intro} visual={<ShieldGraphic />}>
        <p className={cn("type-label", styles.effective)}>{page.effective}</p>
      </PageIntro>

      <div className={styles.policy}>
        <div className={cn("container", styles.layout)}>
          <nav className={styles.toc} aria-label={page.intro.title}>
            <ol className={styles.tocList}>
              {page.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#${sectionId(index)}`} className={styles.tocLink}>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.body}>
            {page.sections.map((section, index) => (
              <section key={section.heading} id={sectionId(index)} className={styles.section} aria-labelledby={`${sectionId(index)}-title`}>
                <h2 id={`${sectionId(index)}-title`} className="type-h3">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="type-body">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className={styles.list}>
                    {section.list.map((item) => (
                      <li key={item} className="type-body">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
