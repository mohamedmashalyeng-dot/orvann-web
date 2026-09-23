import Image from "next/image";
import { partners } from "@/config/site";
import { cn } from "@/lib/cn";
import styles from "./PartnerLogos.module.css";

/** Logos have very different proportions; scale each to a similar visual weight. */
function logoSize(width: number, height: number) {
  const ratio = width / height;
  const displayHeight = Math.min(44, Math.round(44 * Math.pow(ratio, -0.4)));
  return { height: displayHeight, width: Math.round(displayHeight * ratio) };
}

/** The partner logo wall. Items are marked data-reveal, so wrap it in a Reveal to stagger. */
export function PartnerLogos({ className }: { className?: string }) {
  return (
    <ul className={cn(styles.logos, className)}>
      {partners.map((partner) => {
        const size = logoSize(partner.width, partner.height);
        return (
          <li key={partner.name} data-reveal="">
            <Image src={partner.src} alt={partner.name} width={size.width} height={size.height} className={styles.logo} />
          </li>
        );
      })}
    </ul>
  );
}
