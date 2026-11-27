import { Reveal } from "@/components/motion/Reveal";
import { DirectionPhoto, type DirectionPhotoId } from "@/components/visuals/DirectionPhoto";
import type { SiteContent } from "@/content";
import styles from "./DirectionMosaic.module.css";

// The four themes of ORVANN's visual direction, as on its boards; each language names them.
const tiles: { photo: DirectionPhotoId; key: keyof SiteContent["direction"] }[] = [
  { photo: "perspective", key: "perspective" },
  { photo: "people", key: "people" },
  { photo: "detail", key: "detail" },
  { photo: "connected", key: "connected" },
];

/** A band of the direction's photography between the solutions and the work. Decorative. */
export function DirectionMosaic({ labels }: { labels: SiteContent["direction"] }) {
  return (
    <div className="tone-base" aria-hidden="true">
      <Reveal className={`container ${styles.mosaic}`}>
        {tiles.map((tile) => (
          <div key={tile.photo} className={styles.tile} data-tile={tile.photo} data-reveal="">
            <DirectionPhoto photo={tile.photo} className={styles.photo} sizes="(min-width: 64em) 55vw, 92vw" />
            <span className={styles.label}>{labels[tile.key]}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
