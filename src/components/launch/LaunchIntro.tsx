import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo";
import type { SiteContent } from "@/content";
import styles from "./LaunchIntro.module.css";

const INTRO_STORAGE_KEY = "orvann-intro";

/**
 * Runs in <head> before paint. Plays the intro once per browser session (not with reduced
 * motion) by setting html[data-intro="play"]; Skip or Escape switches it to "skip", and the
 * attribute is removed when the intro's lift animation ends (or after 10s at most).
 */
export const launchIntroScript = `(function(){try{
var d=document.documentElement,k="${INTRO_STORAGE_KEY}";
if(sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
sessionStorage.setItem(k,"1");
d.dataset.intro="play";
var offs=[],timer;
var end=function(){clearTimeout(timer);delete d.dataset.intro;offs.forEach(function(off){off()})};
var on=function(type,fn){document.addEventListener(type,fn);offs.push(function(){document.removeEventListener(type,fn)})};
var own=function(e){return e.target.hasAttribute&&e.target.hasAttribute("data-launch-intro")};
var skip=function(){if(d.dataset.intro==="play")d.dataset.intro="skip"};
on("animationstart",function(e){if(own(e)&&d.dataset.intro==="play")d.dataset.intro="leave"});
on("animationend",function(e){if(own(e))end()});
on("click",function(e){if(e.target.closest&&e.target.closest("[data-intro-skip]"))skip()});
on("keydown",function(e){if(e.key==="Escape")skip()});
on("DOMContentLoaded",function(){if(!document.querySelector("[data-launch-intro]"))end()});
timer=setTimeout(end,10000);
}catch(e){}})();`;

const ROUTE = "M90.4 273.2A500 500 0 0 1 909.6 273.2";

/** The full-screen UAE launch opening: a flight from Cairo to the UAE, then "Coming soon". */
export function LaunchIntro({ intro }: { intro: SiteContent["launch"]["intro"] }) {
  return (
    <div className={styles.intro} data-launch-intro="" data-lenis-prevent="">
      <div className={styles.bar}>
        <Logo variant="mark" className={styles.logo} />
        <button type="button" className={styles.skip} data-intro-skip="">
          {intro.skip}
        </button>
      </div>
      <div className={styles.scene}>
        <div className={styles.map} aria-hidden="true">
          <svg viewBox="0 0 1000 320" focusable="false">
            <defs>
              <mask id="launch-intro-trail">
                <path d={ROUTE} className={styles.reveal} pathLength={1} />
              </mask>
              <radialGradient id="launch-intro-glow">
                <stop offset="0" stopColor="#3c69f1" stopOpacity="0.55" />
                <stop offset="1" stopColor="#3c69f1" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle className={styles.glow} cx="909.6" cy="273.2" r="110" fill="url(#launch-intro-glow)" />
            <path d={ROUTE} className={styles.route} />
            <path d={ROUTE} className={styles.trail} mask="url(#launch-intro-trail)" />
            <g className={styles.origin}>
              <circle cx="90.4" cy="273.2" r="15" className={styles.ring} />
              <circle cx="90.4" cy="273.2" r="6" />
            </g>
            <circle cx="909.6" cy="273.2" r="15" className={styles.target} />
            <circle cx="909.6" cy="273.2" r="8" className={styles.pulse} />
            <circle cx="909.6" cy="273.2" r="8" className={styles.pulse} style={{ "--i": 1 } as CSSProperties} />
            <circle cx="909.6" cy="273.2" r="8" className={styles.pin} />
            <g className={styles.flight}>
              <g transform="translate(500 60) scale(1.4)">
                <g className={styles.plane}>
                  <path d="M22 0C22-1.8 20-2.6 17-2.6H5L-5-19H-10L-4.5-2.6H-14L-18-8.5H-21L-19.5 0L-21 8.5H-18L-14 2.6H-4.5L-10 19H-5L5 2.6H17C20 2.6 22 1.8 22 0Z" />
                </g>
              </g>
            </g>
          </svg>
          <span className={styles.city} data-city="from">
            {intro.from}
          </span>
          <span className={styles.city} data-city="to">
            {intro.to}
          </span>
        </div>
        <p className={styles.message}>
          <span className={styles.eyebrow}>{intro.eyebrow}</span>
          <span className={styles.title}>{intro.title}</span>
          <span className={styles.place}>{intro.place}</span>
        </p>
      </div>
    </div>
  );
}
