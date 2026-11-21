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
      const title = hero.querySelector("h1")?.getBoundingClientRect();
      const header = document.querySelector("[data-site-header]")?.getBoundingClientRect().height ?? 72;
      const y = title ? title.top - bounds.top + title.height * 0.45 : height * 0.45;
      const center = width * (width < 768 ? 0.65 : 0.52);
      const radius = Math.max(36, Math.min(130, width * 0.17, (y - header - 65) / 1.7));
      // Matching tangents at every join prevents a sudden bank into or out of the loop.
      const route = `M-240 ${y}
        C${width * 0.12} ${y + 30} ${center - radius * 0.9} ${y + radius * 0.55} ${center} ${y}
        C${center + radius * 0.9} ${y - radius * 0.55} ${center + radius} ${y - radius * 1.7} ${center} ${y - radius * 1.7}
        C${center - radius} ${y - radius * 1.7} ${center - radius * 0.9} ${y - radius * 0.55} ${center} ${y}
        C${center + radius * 0.9} ${y + radius * 0.55} ${width * 0.85} ${y - 35} ${width + 480} ${y - 60}`;

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
