import type { CSSProperties } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/content";
import styles from "./ProjectFan.module.css";

type Props = {
  images: ImageAsset[];
  /** Names the covers as a group, where nothing nearby introduces them (the homepage hero). */
  label?: string;
};

/**
 * Three project covers fanned like prints on a desk: ORVANN's first three projects, at the
 * top of the homepage and of Our Work (where the grid below links them). Always above the
 * fold, so the covers load at once.
 */
export function ProjectFan({ images, label }: Props) {
  return (
    <div className={styles.fan} role={label ? "group" : undefined} aria-label={label}>
      {images.slice(0, 3).map((image, index) => (
        <div
          key={image.src}
          className={styles.card}
          style={{ "--ratio": `${image.width} / ${image.height}`, "--i": index } as CSSProperties}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            sizes="(min-width: 64em) 26vw, 80vw"
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
}
