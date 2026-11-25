import Image from "next/image";
import { cn } from "@/lib/cn";
import styles from "./DirectionPhoto.module.css";

/**
 * Photography from ORVANN's new direction (NEW DIRCTION boards, Nov 2026), framed with the
 * blue square the boards set in a corner. The images are cut from the boards themselves, at
 * their own (small) size, and stand in until ORVANN supplies the originals
 * (public/images/direction/): they are shown no larger than about their own size, so they stay
 * sharp, and a fine grain gives them a photographic finish.
 */
export const directionPhotos = {
  arch: { src: "/images/direction/arch.webp", width: 350, height: 358 },
  people: { src: "/images/direction/people.webp", width: 348, height: 300 },
  perspective: { src: "/images/direction/perspective.webp", width: 624, height: 245 },
  detail: { src: "/images/direction/detail.webp", width: 427, height: 191 },
  connected: { src: "/images/direction/connected.webp", width: 545, height: 192 },
  curve: { src: "/images/direction/curve.webp", width: 472, height: 252 },
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
