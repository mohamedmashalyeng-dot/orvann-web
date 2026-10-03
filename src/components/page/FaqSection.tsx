import type { Faq } from "@/content";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { FaqList } from "./FaqList";

type Props = {
  title: string;
  faqs: Faq[];
  tone?: "tone-base" | "tone-alt";
};

/** A page's questions and answers: a title over the accordion. */
export function FaqSection({ title, faqs, tone = "tone-base" }: Props) {
  return (
    <section className={`${tone} section`} aria-labelledby="faq-title">
      <div className="container">
        <SectionHead id="faq-title" title={title} />
        <Reveal>
          <FaqList faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
