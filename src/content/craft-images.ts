import type { ImageAsset } from "./types";

/**
 * Photographs of ORVANN's handmade pieces (Drive folder supplied 26 Nov 2026), for the Bespoke
 * Artistry & Heritage Craftsmanship page. Each language gives its own alt text.
 */
const craftImages = {
  "oval-boxes": { width: 1200, height: 675 },
  "mosaic-boxes": { width: 1200, height: 600 },
  "brass-plaques": { width: 1200, height: 614 },
  "walnut-abalone": { width: 1200, height: 900 },
  "lattice-chest": { width: 1200, height: 675 },
  "ivory-set": { width: 1200, height: 600 },
  "arabesque-oval": { width: 1200, height: 900 },
  "rosette-chest": { width: 1200, height: 900 },
  "inlay-panel": { width: 1200, height: 900 },
  "wooden-boxes": { width: 1200, height: 600 },
  "amber-silver": { width: 1200, height: 600 },
  "floral-star": { width: 1200, height: 900 },
  "turquoise-boxes": { width: 1200, height: 614 },
  "walnut-chests": { width: 1200, height: 675 },
  "diamond-inlay": { width: 1200, height: 900 },
} as const;

export type CraftImageId = keyof typeof craftImages;

export const craftImage = (id: CraftImageId, alt: string): ImageAsset => ({
  src: `/images/craft/${id}.webp`,
  alt,
  ...craftImages[id],
});
