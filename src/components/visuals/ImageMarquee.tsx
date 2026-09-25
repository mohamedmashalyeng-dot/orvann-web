import type { CSSProperties } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/content";
import { Marquee } from "@/components/motion/Marquee";
import styles from "./ImageMarquee.module.css";

/**
 * A moving band of project imagery. Decorative (every image appears with its project on
 * the Work pages), so the whole band is hidden from assistive technology.
 */
export function ImageMarquee({ images, reverse }: { images: ImageAsset[]; reverse?: boolean }) {
  return (
    <div className={styles.band} aria-hidden="true">
      <Marquee duration={images.length * 6} reverse={reverse}>
        {images.map((image) => (
          <span
            key={image.src}
            className={styles.frame}
            style={{ "--ratio": `${image.width} / ${image.height}` } as CSSProperties}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 64em) 36vw, 70vw" className={styles.image} />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
