# ORVANN website

The ORVANN website (software development and digital marketing) — Next.js 16 (App Router,
Turbopack), React 19, TypeScript, CSS Modules on a shared token system, GSAP for motion.
Every page is prerendered as static HTML and keeps the URL it has on orvann.com today.

| Route | Page |
| --- | --- |
| `/` | Homepage: hero, services, Selected Work, approach, about, contact |
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
npm run build        # production build (needs network access: fonts are fetched at build time)
npm start            # serve the production build on http://localhost:3000
```

Checks:

```bash
npm run lint         # ESLint (Next.js rules, incl. React Compiler lint rules)
npm run typecheck    # tsc --noEmit
npm test             # release checks against the production build — run `npm run build` first
npm run check        # all of the above, in order
```

## Configuration

All variables are optional; see `.env.example`. With none set, a build is production-safe
but asks search engines **not** to index it — the right default for previews and staging.

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and structured data (default `https://orvann.com`). |
| `ORVANN_ALLOW_INDEXING` | `true` on the production deployment only: robots.txt allows crawling, pages carry `index, follow`, the sitemap is listed. |
| `ORVANN_REVIEW_MODE` | `true` shows dashed “Proposed copy” tags on wording that still needs sign-off. |
| `ORVANN_HIDE_WORK` | `true` leaves Selected Work off the homepage (the project pages stay). |
| `GOOGLE_SITE_VERIFICATION` | Search Console token, if ownership is verified by meta tag. |

These are read at build time (every page is statically prerendered), so rebuild after changing them.

## Where things live

```
src/
  app/                 routes (one folder per page, with its page.module.css), layout, not-found,
                       robots, sitemap, icons, share image
  content/             every piece of copy — types.ts (shape), en.ts (homepage and shared copy),
                       en-pages.ts (inner pages), en-projects.ts (the 16 projects), index.ts (locale lookup)
  config/site.ts       verified business facts, partner logos, build-time flags
  lib/metadata.ts      per-page title, canonical URL and sharing metadata
  theme/theme.ts       dark/light theme settings and the pre-paint theme script
  styles/tokens.css    design tokens: colour, type scale, spacing, layout, radii, motion, themes, tones
  app/globals.css      base styles, layout/typography utilities, CSS entrance keyframes
  components/
    ui/                ButtonLink, Logo, SectionLabel, ReviewTag, ThemeToggle, SocialIcon, RichText, Icons
    layout/            SiteHeader (nav + mobile menu), SiteFooter, TransitionShell (page transitions),
                       FloatingWhatsApp — all mounted once in the root layout
    hero/              Hero, HeroGraphic (SVG), HeroStage (hero motion)
    sections/          homepage sections: MarqueeBand, Services (+ ServiceRows), Work, Approach,
                       About, Contact; shared SocialLinks and PartnerLogos
    page/              inner-page building blocks: PageIntro, SectionHead, Statement, FaqList,
                       CtaBand, ProjectsIndex (filterable project grid)
    visuals/           page-intro illustrations (values orbit, reach globe, stage, shield — SVG in
                       the hero graphic's language), ProjectFan, ImageMarquee (moving project strip)
    motion/            Reveal, MediaFrame, StepsProgress, Marquee, ScrubText, FooterSignature, MotionRuntime
  motion/              GSAP runtime (lazy-loaded) and motion builders
tests/site.test.mjs    release checks over every prerendered page (node:test, no dependencies)
public/                partner logos, project images, brand mark
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

## Motion

- **Entrances** (header, hero, page intros) — CSS keyframes, so they start at first paint
  with no JavaScript. Timings: the `--entrance-*` tokens in `src/styles/tokens.css`.
- **Page transitions** — `TransitionShell` drops a blue curtain over internal link clicks,
  navigates client-side and lifts it once the new page has rendered; the new page's entrance
  plays as it lifts. Plain links still work without JavaScript.
- **Everything else** — GSAP (ScrollTrigger, SplitText, Flip), loaded lazily in idle time
  through `useMotion()` (`src/motion/useMotion.ts`); none of it is on the critical path.
  Settings: `src/motion/config.ts` (pointer depth, hero → services transition, reveals,
  project imagery and filtering, scroll-highlighted text, marquee, magnetic buttons,
  Approach progress line, footer signature, mobile menu).
- `prefers-reduced-motion: reduce` turns off the entrance, parallax, pointer depth and scroll
  movement; content is visible immediately. If motion code fails to load, the page stays static
  and fully visible. Printing always shows everything.

## Content and languages

Components contain no copy. To add Arabic later: add `"ar"` to `Locale`, create
`src/content/ar.ts` with `dir: "rtl"` and register it in `src/content/index.ts`, then add
locale routing. Layout uses logical properties throughout, directional icons flip in RTL and
motion reads a `--dir` multiplier; Arabic fonts would be added as new `--font-*` tokens.
No language switch is shown until an Arabic version exists.

Copy provenance is marked inline in the content files: `[brief]`, `[site]` (orvann.com) or
`[proposed]` (needs sign-off).

## Working in OneDrive

This folder is synced by OneDrive, which can lock or convert files in `.next/` mid-build
(`EPERM … unlink` errors). If that happens, delete `.next/` and rebuild — or better, move the
project outside OneDrive or exclude `.next/` and `node_modules/` from sync.
