import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/Logo";
import styles from "./IntroGraphics.module.css";

/**
 * Illustrations for the inner-page intros, drawn in the hero graphic's language. All are
 * decorative (PageIntro hides them from assistive technology); labels come from content.
 * Hooks for the CSS entrance: data-part (fade / ring / rise), data-draw, data-node, --i.
 */

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

function Grid({ id, r }: { id: string; r: number }) {
  return (
    <>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="240" cy="240" r={r} />
        </clipPath>
        <pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" className={styles.gridPath} />
        </pattern>
      </defs>
      <g data-part="fade">
        <rect x="0" y="0" width="480" height="480" fill={`url(#${id}-grid)`} clipPath={`url(#${id}-clip)`} />
      </g>
    </>
  );
}

/** About: the ORVANN mark at the centre, its four core values orbiting it. */
export function ValuesOrbit({ values }: { values: string[] }) {
  // Clockwise from top left, on the dashed orbit (r = 150).
  const points = [
    { x: 134, y: 134, labelY: 110 },
    { x: 346, y: 134, labelY: 110 },
    { x: 346, y: 346, labelY: 378 },
    { x: 134, y: 346, labelY: 378 },
  ];

  return (
    <div className={styles.frame}>
      <svg className={styles.graphic} viewBox="0 0 480 480" focusable="false">
        <Grid id="values" r={210} />
        <g data-part="ring">
          <circle cx="240" cy="240" r="210" className={styles.ring} />
          <g className={styles.spin}>
            <circle cx="240" cy="240" r="150" className={styles.orbit} />
          </g>
          <path d="M240 22v16M240 442v16M22 240h16M442 240h16" className={styles.ticks} />
        </g>
        <g data-part="fade" style={stagger(1)}>
          {points.map((point) => (
            <path
              key={`${point.x}-${point.y}`}
              d={`M${240 + Math.sign(point.x - 240) * 59} ${240 + Math.sign(point.y - 240) * 59}L${point.x} ${point.y}`}
              className={styles.link}
            />
          ))}
          <circle cx="240" cy="240" r="84" className={styles.surface} />
        </g>
        {points.slice(0, values.length).map((point, index) => (
          <g key={values[index]} data-node="" style={stagger(index)}>
            {index === 1 ? (
              <>
                <circle cx={point.x} cy={point.y} r="18" className={`${styles.halo} ${styles.pulse}`} />
                <circle cx={point.x} cy={point.y} r="8" className={styles.nodeActive} />
              </>
            ) : (
              <circle cx={point.x} cy={point.y} r="7" className={styles.node} />
            )}
            <text x={point.x} y={point.labelY} textAnchor="middle" className={styles.label}>
              {values[index]}
            </text>
          </g>
        ))}
      </svg>
      <span className={styles.center}>
        <Logo variant="mark" className={styles.mark} />
      </span>
    </div>
  );
}

/** Contact: a wireframe globe, ORVANN pinned in Giza, reaching out across the region. */
export function ReachGlobe({ place }: { place: string }) {
  const pin = { x: 268, y: 206 };
  const reach = [
    { d: `M${pin.x} ${pin.y}Q330 118 382 150`, x: 382, y: 150 },
    { d: `M${pin.x} ${pin.y}Q196 96 146 142`, x: 146, y: 142 },
    { d: `M${pin.x} ${pin.y}Q372 246 336 322`, x: 336, y: 322 },
  ];

  return (
    <div className={styles.frame}>
      <svg className={styles.graphic} viewBox="0 0 480 480" focusable="false">
        <g data-part="ring">
          <g className={styles.spin}>
            <circle cx="240" cy="240" r="222" className={styles.orbit} />
          </g>
          <circle cx="240" cy="240" r="180" className={styles.ring} />
          {/* Meridians */}
          <path d="M240 60V420" className={styles.faint} />
          <ellipse cx="240" cy="240" rx="92" ry="180" className={styles.faint} />
          <ellipse cx="240" cy="240" rx="156" ry="180" className={styles.faint} />
          {/* Parallels */}
          <ellipse cx="240" cy="240" rx="180" ry="34" className={styles.faint} />
          <ellipse cx="240" cy="170" rx="166" ry="30" className={styles.faint} />
          <ellipse cx="240" cy="310" rx="166" ry="30" className={styles.faint} />
          <ellipse cx="240" cy="110" rx="124" ry="22" className={styles.faint} />
          <ellipse cx="240" cy="370" rx="124" ry="22" className={styles.faint} />
        </g>
        {reach.map((line, index) => (
          <path key={line.d} d={line.d} pathLength={1} className={styles.arc} data-draw="" style={stagger(index)} />
        ))}
        {reach.map((line, index) => (
          <circle
            key={`${line.x}-${line.y}`}
            cx={line.x}
            cy={line.y}
            r="6"
            className={styles.node}
            data-node=""
            style={stagger(index + 2)}
          />
        ))}
        <g data-node="" style={stagger(0)}>
          <circle cx={pin.x} cy={pin.y} r="20" className={`${styles.halo} ${styles.pulse}`} />
          <circle cx={pin.x} cy={pin.y} r="9" className={styles.nodeActive} />
        </g>
        <text x={pin.x - 20} y={pin.y + 30} textAnchor="end" className={styles.label} data-part="fade" style={stagger(4)}>
          {place}
        </text>
      </svg>
    </div>
  );
}

/** Exhibitions: a lit stage, its LED wall carrying the ORVANN ring and growth line. */
export function StageGraphic() {
  // Floor lines run from a vanishing point behind the stage to the bottom edge.
  const floorLines = [-120, -40, 40, 120, 200, 280, 360, 440, 520, 600];

  return (
    <div className={styles.frame}>
      <svg className={styles.graphic} viewBox="0 0 480 480" focusable="false">
        <defs>
          <linearGradient id="stage-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--color-blue-400)", stopOpacity: 0.5 }} />
            <stop offset="1" style={{ stopColor: "var(--color-blue-400)", stopOpacity: 0 }} />
          </linearGradient>
          <clipPath id="stage-floor">
            <rect x="0" y="352" width="480" height="128" />
          </clipPath>
        </defs>

        <g data-part="fade">
          <g clipPath="url(#stage-floor)">
            {floorLines.map((x) => (
              <path key={x} d={`M240 200L${x} 480`} className={styles.faint} />
            ))}
            <path d="M0 368H480M0 392H480M0 424H480M0 466H480" className={styles.faint} />
          </g>
          <path d="M30 34H450" className={styles.ring} />
        </g>

        <g data-part="fade" style={stagger(2)}>
          <polygon points="72,42 88,42 250,300 150,300" fill="url(#stage-beam)" />
          <polygon points="392,42 408,42 330,300 230,300" fill="url(#stage-beam)" />
          <rect x="62" y="30" width="36" height="14" rx="3" className={styles.surface} />
          <rect x="382" y="30" width="36" height="14" rx="3" className={styles.surface} />
        </g>

        <g data-part="rise">
          <path d="M170 250V300M310 250V300" className={styles.ring} />
          <rect x="118" y="108" width="244" height="146" rx="4" className={styles.ring} />
          <rect x="132" y="122" width="216" height="118" rx="2" className={styles.accent} />
          <circle cx="240" cy="181" r="36" className={styles.onAccent} />
          <path d="M212 212L270 150" pathLength={1} className={styles.onAccent} data-draw="" />
          <circle cx="270" cy="150" r="5" className={styles.onAccentFill} data-node="" style={stagger(3)} />
        </g>

        <g data-part="rise" style={stagger(1)}>
          <polygon points="92,300 388,300 428,338 52,338" className={styles.surface} />
          <polygon points="52,338 428,338 428,352 52,352" className={styles.accentDeep} />
          <polygon points="222,262 258,262 254,300 226,300" className={styles.solid} />
          <rect x="216" y="256" width="48" height="7" rx="2" className={styles.nodeActive} />
        </g>
      </svg>
    </div>
  );
}

/** Privacy: a shield with a keyhole inside the brand's rings. */
export function ShieldGraphic() {
  return (
    <div className={styles.frame}>
      <svg className={styles.graphic} viewBox="0 0 480 480" focusable="false">
        <Grid id="shield" r={200} />
        <g data-part="ring">
          <circle cx="240" cy="240" r="200" className={styles.ring} />
          <g className={styles.spin}>
            <circle cx="240" cy="240" r="228" className={styles.orbit} />
          </g>
          <path d="M240 26v16M240 438v16M26 240h16M438 240h16" className={styles.ticks} />
        </g>
        <g data-part="rise" style={stagger(1)}>
          <path
            d="M240 104L344 144V236C344 308 300 350 240 378C180 350 136 308 136 236V144Z"
            className={styles.surface}
          />
          <path d="M240 128L322 160V236C322 294 288 328 240 352C192 328 158 294 158 236V160Z" className={styles.link} />
          <circle cx="240" cy="220" r="24" className={styles.accent} />
          <path d="M229 234H251L260 296H220Z" className={styles.accent} />
        </g>
        <circle cx="40" cy="240" r="7" className={styles.node} data-node="" style={stagger(0)} />
        <g data-node="" style={stagger(1)}>
          <circle cx="381" cy="381" r="18" className={`${styles.halo} ${styles.pulse}`} />
          <circle cx="381" cy="381" r="8" className={styles.nodeActive} />
        </g>
      </svg>
    </div>
  );
}
