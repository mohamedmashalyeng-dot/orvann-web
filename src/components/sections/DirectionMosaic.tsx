import { Reveal } from "@/components/motion/Reveal";
import { DirectionPhoto, type DirectionPhotoId } from "@/components/visuals/DirectionPhoto";
import styles from "./DirectionMosaic.module.css";

// The four themes of ORVANN's visual direction, named as on its boards (in English, like the
// hero's "YOUR GROWTH PARTNER", in both languages).
const tiles: { photo: DirectionPhotoId; label: string }[] = [
  { photo: "perspective", label: "Perspective" },
  { photo: "people", label: "People" },
  { photo: "detail", label: "Detail" },
  { photo: "connected", label: "Connected work" },
];

/** A band of the direction's photography between the solutions and the work. Decorative. */
export function DirectionMosaic() {
  return (
    <div className="tone-base" aria-hidden="true">
      <Reveal className={`container ${styles.mosaic}`}>
        {tiles.map((tile) => (
          <div key={tile.photo} className={styles.tile} data-tile={tile.photo} data-reveal="">
            <DirectionPhoto photo={tile.photo} className={styles.photo} sizes="(min-width: 64em) 55vw, 92vw" />
            <span className={styles.label} lang="en">
              {tile.label}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
