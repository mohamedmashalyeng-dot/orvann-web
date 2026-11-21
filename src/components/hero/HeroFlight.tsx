"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroFlight.module.css";

/** A flight above the existing hero content; it never takes up layout space. */
export function HeroFlight({ message }: { message: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const hero = scene?.closest<HTMLElement>("[data-hero-stage]");
    const sky = scene?.querySelector("svg");
    if (!scene || !hero || !sky) return;

    const measure = () => {
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      const bounds = hero.getBoundingClientRect();
      const title = hero.querySelector("h1")?.getBoundingClientRect();
      const header = document.querySelector("[data-site-header]")?.getBoundingClientRect().height ?? 72;
      const y = title ? title.top - bounds.top + title.height * 0.45 : height * 0.45;
      const center = width * (width < 768 ? 0.65 : 0.52);
      const radius = Math.max(36, Math.min(130, width * 0.17, (y - header - 65) / 1.7));
      const route = `M-240 ${y}
        C${width * 0.12} ${y + 30} ${width * 0.3} ${y + 65} ${center} ${y}
        C${center + radius} ${y - radius * 0.65} ${center + radius} ${y - radius * 1.7} ${center} ${y - radius * 1.7}
        C${center - radius} ${y - radius * 1.7} ${center - radius} ${y - radius * 0.2} ${center} ${y}
        C${center + radius} ${y + radius * 0.6} ${width * 0.85} ${y - 35} ${width + 480} ${y - 60}`;

      sky.setAttribute("viewBox", `0 0 ${width} ${height}`);
      scene.style.setProperty("--flight-route", `path('${route.replace(/\s+/g, " ")}')`);
      scene.querySelectorAll("[data-flight-route]").forEach((path) => path.setAttribute("d", route));
      scene.dataset.ready = "true";
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    const title = hero.querySelector("h1");
    if (title) observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} data-hero-flight="">
      <p className="visually-hidden">{message}</p>
      <svg className={styles.sky} viewBox="0 0 1440 900" aria-hidden="true" focusable="false">
        <defs>
          <mask id="hero-flight-trail" maskUnits="userSpaceOnUse" x="-500" y="-500" width="5000" height="5000">
            <path data-flight-route="" className={styles.reveal} pathLength={1} />
          </mask>
        </defs>
        <path data-flight-route="" className={styles.trail} mask="url(#hero-flight-trail)" />
        <g className={styles.flight}>
          <g className={styles.payload}>
            <path className={styles.rope} d="M-67 10Q-86 24-108 12" />
            <foreignObject x="-388" y="-16" width="282" height="60" className={styles.tow}>
              <div className={styles.message}>
                <span className={styles.flag} aria-hidden="true"><span /><span /><span /></span>
                <span>{message}</span>
              </div>
            </foreignObject>
            <image className={styles.aircraft} href="/images/hero-airplane.webp" x="-90" y="-58" width="180" height="116" />
          </g>
        </g>
      </svg>
      <p className={styles.stillMessage} aria-hidden="true">{message}</p>
    </div>
  );
}
