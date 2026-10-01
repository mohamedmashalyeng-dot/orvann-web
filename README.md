# ORVANN website

The ORVANN website (software development and digital marketing) — Next.js 16 (App Router,
Turbopack), React 19, TypeScript, CSS Modules on a shared token system, GSAP for motion.
Every page is exported as static HTML, in English and Arabic, for shared hosting (Hostinger).
English keeps the URLs it has on orvann.com today; Arabic is the same page under `/ar/`
(e.g. `/ar/services/`).

| Route | Page |
| --- | --- |
| `/` | Homepage: hero, client logos, services, about, vision & mission, closing call to action |
| `/services/` | The five service families, why ORVANN, FAQ |
| `/our-projects/` | All 16 projects, filterable by category |
| `/our-projects/<slug>/` | Case study: challenge, solution, results, gallery, next project |
| `/exhibitions-conferences/` | Exhibitions & conferences process, news |
| `/about-us/` | Story, values, partners, FAQ, publications |
| `/about-us/<slug>/` | Publications (company profile, summer giveaway, VIP gifts) as flipbooks |
| `/contact-us/` | Contact channels, social profiles, FAQ |
| `/privacy-policy/` | Privacy policy |

See **RELEASE_NOTES.md** for what was built, what was verified and what is still open before launch.

## Run it

Requires Node.js 20.9 or newer (developed on Node 24.19, npm 11).

```bash
npm install
npm run dev          # http://localhost:3000, with hot reload
npm run build        # static export to out/ (needs network access: fonts are fetched at build time)
npm start            # serve out/ on http://localhost:3000 the way the host does (scripts/preview.mjs)
```

Checks:

```bash
npm run lint         # ESLint (Next.js rules, incl. React Compiler lint rules)
npm run typecheck    # tsc --noEmit
npm test             # release checks against out/ — run `npm run build` first
npm run check        # all of the above, in order
```

## Deploy (Hostinger shared hosting)

The site is plain files, so any shared plan works; no Node.js on the server.

1. Set the variables below for the target (at least `NEXT_PUBLIC_SITE_URL`), then
   `npm run build` and `npm test`.
2. Upload the **contents** of `out/` — including the hidden `.htaccess` and `ar/.htaccess` —
   to the (sub)domain's folder in hPanel's File Manager or over FTP (e.g.
   `public_html/<subdomain>/`), replacing what was there.
3. In hPanel, turn on SSL for the (sub)domain and force HTTPS.

`next build` writes English under `out/en/` and Arabic under `out/ar/`. `public/.htaccess`
serves English at the root, redirects `/en/…` and the old WordPress Arabic URLs, adds the
trailing slash, and answers missing URLs with the 404 page in the right language — what
`src/proxy.ts` does under `npm run dev`. `npm start` mirrors those rules for a local check.
Images are served as they are in `public/` (static hosting has no image resizing).

## Configuration

All variables are optional; see `.env.example`. With none set, a build is production-safe
but asks search engines **not** to index it — the right default for previews and staging.

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and structured data (default `https://orvann.com`). |
| `ORVANN_ALLOW_INDEXING` | `true` on the production deployment only: robots.txt allows crawling, pages carry `index, follow`, the sitemap is listed. |
| `ORVANN_REVIEW_MODE` | `true` shows dashed “Proposed copy” tags on wording that still needs sign-off. |
| `GOOGLE_SITE_VERIFICATION` | Search Console token, if ownership is verified by meta tag. |

These are read at build time (every page is a static file), so rebuild and upload again after changing them.

## Where things live

```
src/
  proxy.ts             npm run dev only: English at the root (rewrite to /en/…), Arabic under /ar/
  app/[lang]/          routes, one folder per page with its page.module.css; root layout, not-found
  app/                 robots, sitemap, icons, share image, globals.css
  content/             every piece of copy — types.ts (shape); en.ts / ar.ts (homepage and shared
                       copy), en-pages.ts / ar-pages.ts (inner pages), en-projects.ts / ar-projects.ts
                       (the 16 projects); index.ts (locales, localePath), server.ts (contentFor)
  fonts/               Druk (English titles) and 29LT Bukra (Arabic), as woff2 — see Fonts
  config/site.ts       verified business facts, partner logos, build-time flags
  lib/metadata.ts      per-page title, canonical URL and sharing metadata
  theme/theme.ts       dark/light theme settings and the pre-paint theme script
  styles/tokens.css    design tokens: colour, type scale, spacing, layout, radii, motion, themes, tones
  app/globals.css      base styles, layout/typography utilities, CSS entrance keyframes
  components/
    ui/                ButtonLink, Logo, BrandPattern, SectionLabel, ReviewTag, ThemeToggle, SocialIcon,
                       RichText, Icons
    layout/            SiteHeader (nav + mobile menu), SiteFooter, TransitionShell (page transitions),
                       FloatingWhatsApp — all mounted once in the root layout
    hero/              Hero, HeroGraphic (SVG), HeroStage (hero motion)
    sections/          homepage sections: Clients, Services, About, VisionMission (the closing band
                       is the shared CtaBand); shared SocialLinks and PartnerLogos
    page/              inner-page building blocks: PageIntro, SectionHead, Statement, FaqList,
                       CtaBand, ProjectsIndex (filterable project grid)
    visuals/           page-intro illustrations (values orbit, reach globe, stage, shield — SVG in
                       the hero graphic's language), ProjectFan, ImageMarquee (moving project strip)
    motion/            Reveal, MediaFrame, StepsProgress, Marquee, ScrubText, MotionRuntime
  motion/              GSAP runtime (lazy-loaded) and motion builders
tests/site.test.mjs    release checks over every exported page in out/ (node:test, no dependencies)
scripts/preview.mjs    npm start: serves out/ with the same rules as public/.htaccess
public/                partner logos, project images, brand mark; .htaccess (host rules)
prototype/             the earlier static HTML concept — not part of the build; safe to delete
```

## Design system

`src/styles/tokens.css` is the source of truth. `<html data-theme>` picks the dark (default)
or light palette; visitors switch with the header toggle and the choice is remembered.
Components read **semantic** tokens (`--surface`, `--text`, `--text-muted`, `--accent`,
`--line` …); a section picks a tone class (`tone-base`, `tone-alt`, `tone-inverse`,
`tone-accent`) that remaps them, so buttons and text work on any background, in either theme,
without per-section overrides. Brand blues and navy are carried over
from orvann.com; neutrals and scales are new. Typography roles are global classes
(`type-display`, `type-mega`, `type-h2`, `type-h3`, `type-lede`, `type-body`, `type-label`,
`type-accent`). Breakpoints: 40em / 48em / 64em / 80em.

**Brand pattern.** `public/brand/ov-pattern.svg` redraws the monogram's O and V as a tile;
`<BrandPattern fade="start|end|corner" />` lays it behind a section as a mask in that
section's text colour, faded out in every direction. It sits on the closing band of the
inner pages and the homepage, the first statement on Services and About, and the
case-study Results — never on two neighbouring sections, and never behind body text.

## Motion

- **Entrances** (header, hero, page intros) — CSS keyframes, so they start at first paint
  with no JavaScript. Timings: the `--entrance-*` tokens in `src/styles/tokens.css`.
- **Page transitions** — `TransitionShell` drops a blue curtain over internal link clicks,
  navigates client-side and lifts it once the new page has rendered; the new page's entrance
  plays as it lifts. Plain links still work without JavaScript.
- **Everything else** — GSAP (ScrollTrigger, SplitText, Flip), loaded lazily in idle time
  through `useMotion()` (`src/motion/useMotion.ts`); none of it is on the critical path.
  Settings: `src/motion/config.ts` (pointer depth, hero → next-section transition, reveals,
  project imagery and filtering, scroll-highlighted text, marquee, magnetic buttons,
  Approach progress line, mobile menu).
- `prefers-reduced-motion: reduce` turns off the entrance, parallax, pointer depth and scroll
  movement; content is visible immediately. If motion code fails to load, the page stays static
  and fully visible. Printing always shows everything.

## Content and languages

Components contain no copy. Every route lives under `app/[lang]` and reads its language's
content with `contentFor(params)`; links inside a page stay in its language
(`localePath(locale, "/services/")`). The header's language switch opens the same page in
the other language, and every page lists both versions as `hreflang` alternates and in the
sitemap. The WordPress site's old Arabic URLs (`/ar/home-ar/`, `/ar/services-ar/` …)
redirect to the new ones (`public/.htaccess`).

Arabic is right-to-left throughout: layout uses logical properties, directional icons flip,
motion reads a `--dir` multiplier, and drawings keep left-to-right coordinates. Its type
tokens (`:root[lang="ar"]` in `tokens.css`) set Bukra for every role, no letter-spacing (it
breaks joined letters) and taller lines.

Copy provenance is marked inline in the content files: `[brief]`, `[site]` (orvann.com or
orvann.com/ar), `[proposed]` (needs sign-off) or `[translation]` (Arabic translated from the
English — needs a native copywriter's review). The Arabic project files take only words;
slugs, images and categories come from the English file, and a missing translation fails the
build.

## Fonts

| Face | Used for | Files | Licence |
| --- | --- | --- | --- |
| Druk (Commercial Type) | English page and section titles | `src/fonts/druk-*-trial.woff2` | **Trial only** — replace with licensed files before launch. The trial maps 74 characters, so `&`, `@`, `+`, `/`, `:` fall back to Archivo. |
| 29LT Bukra (29Letters) | All Arabic text | `src/fonts/29lt-bukra-*.woff2` | **Web licence needed** before launch (the copy supplied came from a free-download site). |
| Archivo, Fragment Mono | English body and mid-level headings, labels | Google Fonts via `next/font` | Open Font License |

One family per line: the accented word in the headline (Growth) is set in the same face as the words around it and picked out by colour (`.type-accent`).

To swap in licensed files, keep the file names (or update the paths in `app/[lang]/layout.tsx`).

## Working in OneDrive

This folder is synced by OneDrive, which can lock or convert files in `.next/` mid-build
(`EPERM … unlink` errors). If that happens, delete `.next/` and rebuild — or better, move the
project outside OneDrive or exclude `.next/`, `out/` and `node_modules/` from sync.
