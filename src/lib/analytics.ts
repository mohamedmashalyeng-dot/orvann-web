/**
 * Google Analytics 4, when the build has a measurement ID (analyticsId in config/site.ts).
 * Without one, gtag is never defined and these calls do nothing.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** The page that loads gtag.js and starts it (inline, after hydration). */
export const analyticsScript = (id: string) =>
  `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",${JSON.stringify(id)});`;

/** Records an event (GA4's recommended names where one fits, e.g. generate_lead). */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.("event", name, params);
}
