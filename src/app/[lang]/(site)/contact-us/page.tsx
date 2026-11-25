import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { DirectionPhoto } from "@/components/visuals/DirectionPhoto";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { ProjectForm } from "@/components/page/ProjectForm";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.contact.meta, "/contact-us/");
}

/**
 * The contact form (#project-form, a free discovery session) and the direct channels
 * (#direct-contact) are both here.
 * The form posts to a small PHP handler on the host that records the lead in the CRM and
 * emails ORVANN.
 */
export default async function ContactPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.contact;
  const { direct } = page;

  const channels = [
    { label: direct.email, value: site.email, href: `mailto:${site.email}` },
    { label: direct.phone, value: site.phone.display, href: site.phone.href },
  ];

  return (
    <>
      <PageIntro intro={page.intro} visual={<DirectionPhoto photo="people" priority />}>
        <ButtonLink href="#project-form" icon="arrow">
          {page.form.submit}
        </ButtonLink>
      </PageIntro>

      <section id="project-form" className={cn("section", styles.formSection)} aria-labelledby="form-title">
        <div className="container">
          <SectionHead id="form-title" title={page.form.title} />
          <Reveal>
            <div data-reveal="">
              <ProjectForm locale={content.locale} copy={page.form} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="direct-contact" className={cn("tone-alt section", styles.formSection)} aria-labelledby="direct-title">
        <div className="container">
          <SectionHead id="direct-title" title={direct.title} />
          <Reveal>
            <dl className={styles.channels}>
              {channels.map((channel) => (
                <div key={channel.label} className={styles.channel} data-reveal="">
                  <dt className={cn("type-label", styles.channelLabel)}>{channel.label}</dt>
                  <dd className={styles.channelValue}>
                    <a href={channel.href} className={styles.channelLink} dir="ltr">
                      {channel.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
