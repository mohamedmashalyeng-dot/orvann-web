import type { Metadata } from "next";
import { contentFor, type LangParams } from "@/content/server";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { ReachGlobe } from "@/components/visuals/IntroGraphics";
import { PageIntro } from "@/components/page/PageIntro";
import { SectionHead } from "@/components/page/SectionHead";
import { FaqList } from "@/components/page/FaqList";
import styles from "./page.module.css";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const content = await contentFor(params);
  return pageMetadata(content, content.pages.contact.meta, "/contact-us/");
}

/** No form: there is no verified backend, so every channel here is a direct, working link. */
export default async function ContactPage({ params }: LangParams) {
  const content = await contentFor(params);
  const page = content.pages.contact;
  const { contact, social, a11y } = content;

  const channels = [
    { label: contact.labels.email, value: site.email, href: `mailto:${site.email}` },
    { label: contact.labels.phone, value: site.phone.display, href: site.phone.href, ltr: true },
    { label: contact.labels.whatsapp, value: site.whatsapp.display, href: site.whatsapp.href, ltr: true, newTab: true },
    { label: contact.labels.headquarters, value: contact.address },
  ];

  return (
    <>
      <PageIntro intro={page.intro} visual={<ReachGlobe place={site.address.locality} />}>
        <ButtonLink href={`mailto:${site.email}`} icon="arrow">
          {contact.emailCta}
        </ButtonLink>
        <ButtonLink href={site.whatsapp.href} variant="secondary" icon="external" newTabLabel={a11y.newTab}>
          {contact.whatsappCta}
        </ButtonLink>
      </PageIntro>

      <section className="section" aria-labelledby="channels-title">
        <div className="container">
          <SectionHead id="channels-title" title={page.channelsTitle} />
          <Reveal>
            <dl className={styles.channels}>
              {channels.map((channel) => (
                <div key={channel.label} className={styles.channel} data-reveal="">
                  <dt className={cn("type-label", styles.channelLabel)}>{channel.label}</dt>
                  <dd className={styles.channelValue}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className={styles.channelLink}
                        dir={channel.ltr ? "ltr" : undefined}
                        {...(channel.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {channel.value}
                        {channel.newTab && <span className="visually-hidden"> {a11y.newTab}</span>}
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

      <section className="tone-alt section" aria-labelledby="social-title">
        <div className="container">
          <SectionHead id="social-title" label={social.label} title={social.title} />
          <Reveal>
            <div data-reveal="">
              <SocialLinks profiles={social.profiles} newTabLabel={a11y.newTab} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead id="faq-title" title={page.faqTitle} />
          <Reveal>
            <FaqList faqs={page.faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
