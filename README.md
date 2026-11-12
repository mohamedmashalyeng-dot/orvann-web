# ORVANN website

The ORVANN website (software development and digital marketing) — Next.js 16 (App Router,
Turbopack), React 19, TypeScript, CSS Modules on a shared token system, GSAP for motion.
Every page is exported as static HTML, in English and Arabic, for shared hosting (Hostinger).
English keeps the URLs it has on orvann.com today; Arabic is the same page under `/ar/`
(e.g. `/ar/services/`).

| Route | Page |
| --- | --- |
| `/` | Homepage: hero, UAE launch bar and intro, client logos, the five services, integrated model, Selected Work, proof of execution, why ORVANN, vision & mission, FAQ, closing call to action |
| `/services/` | The five service areas (anchors `#strategy`, `#branding`, `#marketing`, `#digital`, `#events`), each with its deliverables and a link to its page, how they work together, FAQ |
| `/services/<service>/` | One page per service (`strategy-consulting`, `branding-creative`, `marketing-media`, `digital-experiences`, `events-outdoor-production`): who it is for, what you get, how it works, related work, FAQ, and Start a Project with the service ticked (`/contact-us/?need=<id>#project-form`) |
| `/our-projects/` | All 18 projects, filterable by the five services |
| `/our-projects/<slug>/` | Case study: services, the challenge, ORVANN's role, execution, outcome, images from the work, next project |
| `/about-us/` | Who ORVANN is, story, capabilities, how we work, model, values, vision & mission, FAQ |
| `/about-us/<slug>/` | Publications (company profile, summer giveaway, VIP gifts) as flipbooks |
| `/careers/` | Careers & Internships, a standalone page (no header, footer or launch bar; it sits outside `src/app/[lang]/(site)/`, the group whose layout holds them): job and internship tracks, the hiring steps, the application form (`#application-form`, with CV and portfolio uploads), FAQ |
| `/contact-us/` | Start a Project form (`#project-form`), direct contact (`#direct-contact`), FAQ |
| `/privacy-policy/` | Privacy policy |

The five service areas are the single list of services everywhere (`serviceIds` and each
language's `serviceNames`; their page slugs are `serviceSlugs`): homepage, services page,
service pages, project categories and footer. Links to a service open its own page. The old
`/exhibitions-conferences/` page redirects to `/services/#events`.

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
3. In hPanel, turn on SSL for the (sub)domain and force HTTPS. `public/.htaccess` sends
   `www.orvann.com` to `https://orvann.com` (same path) in one permanent redirect.

**Start a Project form.** `public/api/project.php` (exported as `out/api/project.php`) is the
only server code: the host runs it with PHP and emails the form to info@orvann.com, sent from
that address through Hostinger's mail (orvann.com's mail and SPF are there), with Reply-To set
to the visitor. It works on the host only: under `npm run dev` and `npm start` the form
cannot send.

**CRM.** The same handler records each enquiry as a lead in ORVANN's CRM (`POST /api/leads`
there), and the form asks what the CRM sorts leads by: job title, governorate or country,
city, service, timeline and budget. Those lists send the CRM's own ids. They are written in
three places that must agree — `src/content/lead-options.ts` (with each language's names in
`contact.form`), `public/api/project.php` (named for the email; `npm test` checks the form
against it) and the CRM's `app/config.php`. The source is recorded as `orvann.com (en)` or
`(ar)`.

To connect it, copy `crm-config.example.php` to `public/api/crm-config.php`, fill in the
CRM's address and its `integration_key` (`app/settings.php` there), then build and upload.
That file is not committed
(the key is a secret), so it has to exist on whichever machine builds the release; without
it the form only emails. Every email carries a `CRM:` line — recorded, not recorded, or not
connected — and the visitor is told the form was sent if either the CRM or the email took
it, so a CRM that is down costs nothing but a lead to add by hand.

**Careers & Internships form.** `public/api/careers.php` works the same way: it emails each
application to info@orvann.com with the CV (PDF, DOC or DOCX, up to 5 MB) and portfolio
(PDF, up to 10 MB) attached, and records it in the CRM's **Applications** section
(`POST /api/applications`, the address next to `/api/leads` in `crm-config.php`; set
`applications_url` there to override it). It uses the same `crm-config.php` and key, so no
extra setup. Its lists (academic status, experience, employment status, interest, work
arrangement) are in `src/content/career-options.ts`, `careers.php` and the CRM's
`app/config.php` (`applications`); `npm test` checks the form against `careers.php`. Both
the handler and the CRM check each file's content, not only its name. The host's PHP must
accept uploads of that size (`upload_max_filesize` and `post_max_size` of at least 16M,
Hostinger's defaults are higher).

`next build` writes English under `out/en/` and Arabic under `out/ar/`. `public/.htaccess`
serves English at the root, redirects `/en/…` and the old WordPress Arabic URLs, adds the
trailing slash, and answers missing URLs with the 404 page in the right language — what
`src/proxy.ts` does under `npm run dev`. `npm start` mirrors those rules for a local check.
Images are served as they are in `public/` (static hosting has no image resizing).

## Configuration

All variables are optional; see `.env.example`. With none set, a build is the public release
for orvann.com, open to search engines. **Staging and preview builds must set
`ORVANN_ALLOW_INDEXING=false`.**

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and structured data (default `https://orvann.com`). |
| `ORVANN_ALLOW_INDEXING` | `false` on staging and previews: robots.txt blocks crawling and pages carry `noindex, nofollow`. Otherwise (the default, since 24 Oct 2026) robots.txt allows crawling and lists the sitemap, and pages carry `index, follow`. |
| `ORVANN_SHOW_WORK` | `false` hides Our Work (`/our-projects/` and the case studies): not published, not linked, its URLs redirect (302) to the homepage. Published by default. |
| `ORVANN_SHOW_ARABIC` | `false` hides the Arabic site under `/ar/`: not built, no language switch, `/ar/…` redirects (302) to the same English page. Published by default. |
| `ORVANN_REVIEW_MODE` | `true` shows dashed “Proposed copy” tags on wording that still needs sign-off. |
| `GOOGLE_SITE_VERIFICATION` | Search Console token, if ownership is verified by meta tag. |
| `ORVANN_GA_ID` | Google Analytics 4 measurement ID (`G-…`). Loads analytics on every page; a project form that reaches ORVANN is recorded as `generate_lead` (service and language as parameters), apart from clicks. Without it, no analytics code ships. |

These are read at build time (every page is a static file), so rebuild and upload again after changing them.

## Where things live

```
src/
  proxy.ts             npm run dev only: English at the root (rewrite to /en/…), Arabic under /ar/
  app/[lang]/          routes, one folder per page with its page.module.css; root layout, not-found
  app/                 robots, sitemap, icons, share image, globals.css
  content/             every piece of copy — types.ts (shape); en.ts / ar.ts (homepage and shared
                       copy), en-pages.ts / ar-pages.ts (inner pages), en-projects.ts / ar-projects.ts
                       (the 18 projects); index.ts (locales, localePath), server.ts (contentFor)
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
    hero/              Hero (with the first three project covers), HeroStage (hero motion)
    sections/          homepage sections: Clients, Services, Integrated, Work, Deliverables, Why,
                       VisionMission (the closing band is the shared CtaBand); PartnerLogos
    page/              page building blocks: PageIntro, SectionHead, FaqList, FaqSection,
                       CtaBand, ProjectsIndex (filterable project grid), ProjectForm
    visuals/           page-intro illustrations (values orbit, reach globe, shield — SVG in
                       the brand's line language), ProjectFan, ImageMarquee (moving project strip)
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
section's text colour, faded out in every direction. It sits on the closing band of every
page and on the case-study Results — never on two neighbouring sections, and never behind
body text.

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
  Approach progress line, mobile menu, smooth scrolling, counting numbers).
- **Smooth scrolling** — Lenis (`src/motion/smooth.ts`), started with the motion runtime and
  driven by GSAP's ticker, so it and every ScrollTrigger move on the same frame. Wheel only:
  touch keeps the device's own scrolling. Same-page links jump natively (focus moves with
  them); the mobile menu pauses it.
- **From React Bits** (reactbits.dev, MIT + Commons Clause): *Light Rays* behind the hero
  (`components/visuals/LightRays.tsx`, raw WebGL, loaded only where it runs, paused off
  screen) and *Star Border* round the primary Start a Project buttons (`components/ui/
  StarBorder.tsx`, through `StarButton`) are its own code, adapted to CSS Modules. *Blur Text*
  on the homepage headline (`components/motion/BlurText.tsx`) and *Count Up* on the numbers
  strip (`components/motion/CountUp.tsx`) follow its components' effects but run in CSS and
  GSAP: React Bits' versions need the `motion` library and render the headline hidden until
  scripts load.
- `prefers-reduced-motion: reduce` turns off the entrance, parallax, pointer depth, scroll
  movement, smooth scrolling, the hero's light rays and the buttons' star; numbers show their
  final value. Content is visible immediately. If motion code fails to load, the page stays
  static and fully visible. Printing always shows everything.

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
| Poppins | All English text: titles, body and labels | Google Fonts via `next/font` | Open Font License |
| 29LT Bukra (29Letters) | All Arabic text | `src/fonts/29lt-bukra-*.woff2` | **Web licence needed** before the Arabic site is published (the copy supplied came from a free-download site). |

One family per line: the accented word in the headline (Growth) is set in the same face as the words around it and picked out by colour (`.type-accent`).

To swap in licensed files, keep the file names (or update the paths in `app/[lang]/layout.tsx`).

## Working in OneDrive

This folder is synced by OneDrive, which can lock or convert files in `.next/` mid-build
(`EPERM … unlink` errors). If that happens, delete `.next/` and rebuild — or better, move the
project outside OneDrive or exclude `.next/`, `out/` and `node_modules/` from sync.
