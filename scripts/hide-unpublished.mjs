// Runs after `next build` (see package.json). Next builds every route of a static export, so
// a temporarily hidden part is taken out of out/ here, using the same switch as the site
// (flags.showWork in src/config/site.ts). public/.htaccess then sends its URLs home.
import { rmSync } from "node:fs";

const out = new URL("../out/", import.meta.url);

if (process.env.ORVANN_SHOW_WORK !== "true") {
  for (const dir of ["en/our-projects/", "ar/our-projects/"]) {
    rmSync(new URL(dir, out), { recursive: true, force: true });
  }
  console.log("Our Work is hidden: removed its pages from out/ (ORVANN_SHOW_WORK=true publishes it).");
}
