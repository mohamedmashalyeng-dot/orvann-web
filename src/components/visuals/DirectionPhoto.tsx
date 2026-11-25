import Image from "next/image";
import { cn } from "@/lib/cn";
import styles from "./DirectionPhoto.module.css";

/**
 * Photography from ORVANN's new direction (NEW DIRCTION boards, Nov 2026), framed with the
 * blue square the boards set in a corner. The images are cut from the boards themselves and
 * stand in until ORVANN supplies the originals (public/images/direction/).
 */
export const directionPhotos = {
  arch: { src: "/images/direction/arch.webp", width: 700, height: 716 },
  people: { src: "/images/direction/people.webp", width: 696, height: 600 },
  perspective: { src: "/images/direction/perspective.webp", width: 1248, height: 490 },
  detail: { src: "/images/direction/detail.webp", width: 854, height: 382 },
  connected: { src: "/images/direction/connected.webp", width: 1090, height: 384 },
  curve: { src: "/images/direction/curve.webp", width: 944, height: 504 },
} as const;

export type DirectionPhotoId = keyof typeof directionPhotos;

/** A decorative photo (empty alt): the page's text carries the meaning. */
export function DirectionPhoto({
  photo,
  className,
  sizes = "(min-width: 64em) 30vw, 90vw",
  priority,
}: {
  photo: DirectionPhotoId;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const image = directionPhotos[photo];
  return (
    <span className={cn(styles.frame, className)}>
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        width={image.width}
        height={image.height}
        sizes={sizes}
        preload={priority}
        className={styles.image}
      />
      <span className={styles.mark} aria-hidden="true" />
    </span>
  );
}
