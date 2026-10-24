"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/motion/useReducedMotion";
import { cssToken, useTheme } from "@/theme/useTheme";

// WebGL code, loaded only where the rays actually run (not for reduced motion).
const LightRays = dynamic(() => import("@/components/visuals/LightRays"), { ssr: false });

/**
 * The hero's moving light: React Bits' Light Rays in ORVANN blue, falling slowly from the
 * top and fading out before the headline. Decorative and quiet: no cursor shadow or click
 * pulses, only a slight lean towards the pointer. Left out entirely for reduced motion (the
 * hero is then exactly as before), and it pauses whenever it is off screen.
 */
export function HeroRays({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const theme = useTheme();
  if (reduced) return null;

  const light = theme === "light";
  return (
    <div className={className} aria-hidden="true">
      <LightRays
        raysOrigin="top-center"
        raysColor={cssToken(light ? "--color-blue-500" : "--color-blue-400")}
        lightMode={light}
        raysSpeed={0.45}
        lightSpread={0.9}
        rayLength={1.4}
        fadeDistance={0.9}
        intensity={light ? 0.55 : 0.7}
        glow={0.35}
        haze={0.15}
        opacity={light ? 0.5 : 0.7}
        followMouse
        mouseInfluence={0.04}
        cursorShadow={false}
        clickPulse={false}
        maxDevicePixelRatio={1.5}
      />
    </div>
  );
}
