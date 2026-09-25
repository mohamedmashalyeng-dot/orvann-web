import type { CSSProperties } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/content";
import styles from "./ProjectFan.module.css";

/** Three project covers fanned like prints on a desk (decorative; the grid below links them). */
export function ProjectFan({ images }: { images: ImageAsset[] }) {
  return (
    <div className={styles.fan}>
      {images.slice(0, 3).map((image, index) => (
        <div
          key={image.src}
          className={styles.card}
          style={{ "--ratio": `${image.width} / ${image.height}`, "--i": index } as CSSProperties}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 64em) 26vw, 80vw" className={styles.image} />
        </div>
      ))}
    </div>
  );
}
