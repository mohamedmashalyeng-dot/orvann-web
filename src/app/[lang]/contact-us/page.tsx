import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { ReachGlobe } from "@/components/visuals/IntroGraphics";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { ProjectForm } from "@/components/page/ProjectForm";
import { FaqSection } from "@/components/page/FaqSection";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.contact.meta, "/contact-us/");
}

/**
 * Start a Project (#project-form) and Book a Meeting (#direct-contact) both land here.
 * The form posts to a small PHP handler on the host that emails ORVANN.
 */
export default async function ContactPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.contact;
  const { direct } = page;

  const channels = [
    { label: direct.email, value: site.email, href: `mailto:${site.email}`, ltr: true },
    { label: direct.phone, value: site.phone.display, href: site.phone.href, ltr: true },
    { label: direct.headquarters, value: direct.address },
  ];

  return (
    <>
      <PageIntro intro={page.intro} visual={<ReachGlobe place={site.address.locality} />}>
        <ButtonLink href="#project-form" icon="arrow">
          {content.actions.startProject.label}
        </ButtonLink>
      </PageIntro>

      <section id="project-form" className={cn("section", styles.formSection)} aria-labelledby="form-title">
        <div className="container">
          <SectionHead id="form-title" title={page.form.title} />
          <Reveal>
            <div data-reveal="">
              <ProjectForm locale={content.locale} copy={page.form} serviceNames={content.serviceNames} />
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
                    {channel.href ? (
                      <a href={channel.href} className={styles.channelLink} dir={channel.ltr ? "ltr" : undefined}>
                        {channel.value}
                      </a>
                    ) : (
                      channel.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FaqSection title={page.faqTitle} faqs={page.faqs} />
    </>
  );
}
