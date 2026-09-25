/**
 * The motion runtime: GSAP, ScrollTrigger and every ORVANN motion builder.
 * Only ever loaded through loadMotion() (a dynamic import), so none of it is on the
 * critical path — first paint, the CSS hero entrance and hydration never wait for it.
 */
export { gsap, ScrollTrigger, conditions } from "./gsap";
export { revealSplitHeading, scrubWords } from "./text";
export { animateLayout, attachMagnetic, captureLayout, driveMarqueeWithScroll } from "./interaction";
export { attachPointerDepth, createHeroExit } from "./hero";
export { revealOnScroll } from "./reveal";
export { animateMediaFrame, trackStepProgress } from "./scroll";
export { animateMenuClose, animateMenuOpen } from "./menu";
