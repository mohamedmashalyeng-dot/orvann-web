"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./HeroFlight.module.css";

const PAPER_STRIPS = 24;
const PAPER_WIDTH = 282;
const STRIP_WIDTH = PAPER_WIDTH / PAPER_STRIPS;

/** A flight above the existing hero content; it never takes up layout space. */
export function HeroFlight({ message }: { message: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const hero = scene?.closest<HTMLElement>("[data-hero-stage]");
    const sky = scene?.querySelector("svg");
    if (!scene || !hero || !sky) return;

    let disposed = false;
    let frame = 0;
    let previousGeometry = "";
    const image = new Image();
    image.src = "/images/hero-airplane.webp";

    const measure = () => {
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      const bounds = hero.getBoundingClientRect();
      // Across the middle of the screen (as seen with the page at the top), in one gentle
      // wave with no loop: a slight dip, then back to the middle on the way out.
      const heroTop = bounds.top + window.scrollY;
      const screenMiddle = document.documentElement.clientHeight / 2 - heroTop;
      const y = Math.min(Math.max(screenMiddle, 80), height - 80);
      const route = `M-240 ${y}
        C${width * 0.3} ${y + 30} ${width * 0.6} ${y - 30} ${width + 480} ${y}`;

      const geometry = `${width} ${height} ${route}`;
      if (geometry === previousGeometry) return;
      previousGeometry = geometry;
      sky.setAttribute("viewBox", `0 0 ${width} ${height}`);
      scene.style.setProperty("--flight-route", `path('${route.replace(/\s+/g, " ")}')`);
      scene.querySelectorAll("[data-flight-route]").forEach((path) => path.setAttribute("d", route));
      const trail = scene.querySelector<SVGPathElement>("[data-flight-route]");
      if (trail) {
        const count = Math.ceil(trail.getTotalLength() / 18);
        // A dashed half followed by an equally long gap reveals the trail from its
        // start as the offset falls from 1 to 0, without a full-hero animated mask.
        trail.setAttribute("stroke-dasharray", Array.from({ length: count }, (_, index) =>
          `${0.45 / count} ${0.55 / count + (index === count - 1 ? 1 : 0)}`,
        ).join(" "));
      }
      scene.dataset.ready = "true";
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    // Start with decoded artwork and settled fonts, so neither changes the flight midair.
    void Promise.all([image.decode().catch(() => undefined), document.fonts.ready]).then(() => {
      if (disposed) return;
      measure();
      observer.observe(hero);
      const title = hero.querySelector("h1");
      if (title) observer.observe(title);
    });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} data-hero-flight="">
      <p className="visually-hidden">{message}</p>
      <svg className={styles.sky} viewBox="0 0 1440 900" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-paper-strip">
            <rect width={STRIP_WIDTH + 0.5} height="52" />
          </clipPath>
          <linearGradient id="hero-paper-fold">
            <stop offset="0" stopColor="#192031" stopOpacity="0" />
            <stop offset="0.5" stopColor="#192031" stopOpacity="0.07" />
            <stop offset="1" stopColor="#192031" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-paper-material" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f3f4f6" />
            <stop offset="1" stopColor="#dfe7f5" />
          </linearGradient>
        </defs>
        <path data-flight-route="" className={styles.trail} pathLength={1} />
        <g
          className={styles.flight}
          data-flight-aircraft=""
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && sceneRef.current) {
              sceneRef.current.dataset.finished = "true";
            }
          }}
        >
          <g className={styles.payload}>
            <path className={styles.rope} d="M-67 10Q-86 15-108 3M-67 10Q-86 24-108 31" />
            <g className={styles.tow}>
              <g transform="translate(-388 -14)" style={{ "--paper-strips": PAPER_STRIPS } as CSSProperties}>
                {Array.from({ length: PAPER_STRIPS }, (_, index) => (
                  <g key={index} transform={`translate(${index * STRIP_WIDTH} 0)`}>
                    <g className={styles.strip} data-paper-strip="" style={{ "--strip": index } as CSSProperties}>
                      <g clipPath="url(#hero-paper-strip)">
                        <g transform={`translate(${-index * STRIP_WIDTH} 0)`}>
                          <rect width={PAPER_WIDTH} height="52" rx="2" fill="url(#hero-paper-material)" className={styles.paperFace} />
                          <text x={PAPER_WIDTH / 2} y="27" textAnchor="middle" dominantBaseline="middle" className={styles.message}>
                            {message}
                          </text>
                        </g>
                        <rect width={STRIP_WIDTH + 0.5} height="52" fill="url(#hero-paper-fold)" className={styles.fold} />
                      </g>
                    </g>
                  </g>
                ))}
              </g>
            </g>
            <g className={styles.airframe}>
              <image href="/images/hero-airplane.webp" x="-90" y="-58" width="180" height="116" />
              <g transform="translate(80 -3)">
                <ellipse className={styles.propeller} rx="2.5" ry="19" />
              </g>
            </g>
          </g>
        </g>
      </svg>
      <p className={styles.stillMessage} aria-hidden="true">{message}</p>
    </div>
  );
}
