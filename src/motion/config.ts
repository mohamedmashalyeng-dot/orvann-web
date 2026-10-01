/**
 * ORVANN motion settings for everything GSAP drives: pointer depth, the hero → next-section
 * scroll transition, section and heading reveals, scroll-highlighted text, marquees,
 * magnetic buttons, project imagery and filtering, the Approach progress line and the mobile
 * menu. (Page transitions: TransitionShell. Entrances: tokens.css.)
 * Durations are in seconds. Distances are px unless noted.
 */
export const motion = {
  ease: {
    /** Entrances and reveals. */
    out: "expo.out",
    /** Menu panel and larger two-way moves. */
    inOut: "power3.inOut",
    /** Small follow-ups (labels, nodes, pointer follow). */
    soft: "power3.out",
  },

  // The hero entrance is CSS (it must start at first paint, before any script runs):
  // its timings are the --entrance-* tokens in src/styles/tokens.css.

  /** Pointer-responsive depth on the hero graphic (fine pointers only). */
  pointer: {
    /** Layer shift at depth 1, in SVG units (the graphic is 640 units wide). */
    shift: 22,
    /** Maximum tilt of the whole graphic, in degrees. */
    tilt: 7,
    /** Follow time; longer feels heavier. Also used for the return to rest. */
    duration: 1.1,
    perspective: 1100,
    depths: { grid: 0.2, ring: 0.45, foundation: 0.75, growth: 1 },
  },

  /** Hero → next-section scroll transition (scrubbed to scroll position, never pinned). */
  heroExit: {
    /** Graphic drift, in % of its own height. */
    graphicY: -18,
    graphicScale: 0.9,
    graphicOpacity: 0.3,
    /** Extra drift of the grid layer, in SVG units, for parallax depth. */
    gridY: -60,
    /** Smoothing between scroll position and the animation (seconds). */
    scrub: 0.6,
  },

  /** Section heading and content reveals, shared by every section. */
  reveal: {
    duration: 0.95,
    distance: 36,
    stagger: 0.08,
    start: "top 85%",
  },

  /** Project imagery in Selected Work: unclips and settles once, ending on the full image. */
  media: {
    /** Starting clip inset on each side, in %. */
    clipInset: 7,
    /** Starting scale of the picture inside the frame. */
    settleScale: 1.08,
    duration: 1.3,
  },

  /** Approach progress line (desktop only). ScrollTrigger start/end positions. */
  progress: { start: "top 70%", end: "bottom 60%", scrub: 0.4 },

  /** Headings whose words rise out of line masks (SplitText). */
  split: { duration: 1.1, stagger: 0.045 },

  /** Scroll-highlighted paragraphs: where the brightening starts and ends. */
  scrub: { start: "top 80%", end: "bottom 45%" },

  /** Marquee bands: scroll speeds them up (and reverses them); they settle back. */
  marquee: { velocityDivisor: 700, maxBoost: 5, settle: 1.2 },

  /** Magnetic buttons: share of the pointer offset followed, capped in px. */
  magnetic: { strength: 0.35, max: 14, duration: 0.6 },

  /** Projects filter: cards glide to their new places. */
  flip: { duration: 0.7, stagger: 0.04 },

  menu: { open: 0.5, close: 0.28, stagger: 0.05, distance: 28 },
} as const;
