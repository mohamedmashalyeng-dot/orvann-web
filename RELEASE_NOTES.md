# ORVANN website — release notes

Release candidate prepared 23 Sep 2026. Not deployed. Nothing on orvann.com (DNS, hosting,
WordPress files or content) has been changed.

## Update, 25 Sep 2026 — Arabic version, new type, partner carousel, visuals

- **Arabic site** at `/ar/…`: all 26 pages, right-to-left, set in 29LT Bukra. Copy reuses
  orvann.com/ar wherever it exists (home, about, services, contact, exhibitions, privacy);
  the rest — the 16 case studies, new homepage sections, interface labels — is translated and
  marked `[translation]` for a native copywriter's review. The privacy page keeps the Arabic
  site's own effective date (21 July 2025; the English page says 14 July 2025).
- **Language switch** in the header and mobile menu (same page, other language); `hreflang`
  alternates on every page and in the sitemap (52 URLs). The old WordPress Arabic URLs
  redirect (308) to the new pages.
- **Druk** for English page and section titles.
- **Home** added to the navigation and the footer's Explore list.
- **Partner carousel:** logos run on their own, stop on hover or focus, and show their own
  colours on a paper tile. Each opens the partner's case study; the case studies of the four
  partners with a verified website (Eagles, Tucano, Al Marefa Tech, Plaza Gardens) carry a
  "Visit website" button.
- **Visuals:** illustrations in every inner-page intro, a photo per service family, a moving
  project strip on About, icons for the Approach steps. The full-width footer logo is gone.

**Checks — actual results:** `npm run check` passes: lint, typecheck, build (52 pages), 14/14
tests, now run over both languages (language and direction, language switch and hreflang,
links staying in their language, sitemap = pages). Browser QA against the production server:
0 px overflow on 15 pages × 5 widths (280–1440 px), no page errors, interactions pass in both
languages (switch both ways, Arabic filters and plural counts, Arabic navigation and menu).

**New launch blockers**
1. **Font licences.** Druk is a *trial* (not licensed for a live site, 74 characters only),
   and the 29LT Bukra files have no web licence. Buy both, or choose other faces, before
   launch.
2. **Arabic copy review** by a native copywriter (everything marked `[translation]`).
3. **Partner colour logos and websites.** Colour files exist for Eagles, Tucano and Al Marefa
   Tech only; the others brighten to ink on hover. No website was verified for RGC, Alnour
   Optical, Diwanyah Culture or Modern Fix — add `href` and `colorSrc` in `config/site.ts`.

## Update, 23 Sep 2026 — multi-page site

The single page became a full site. Every page is prerendered and **keeps its current
orvann.com URL**, so existing links and search results keep working without redirects.

- **Pages:** `/services/`, `/our-projects/` (all 16 projects, filterable by category),
  16 case studies at `/our-projects/<slug>/`, `/exhibitions-conferences/`, `/about-us/`,
  3 publications at `/about-us/<slug>/` (Heyzine flipbooks, as on the live site),
  `/contact-us/` and `/privacy-policy/`. The homepage now links Selected Work to the case
  studies and adds a service marquee.
- **Shared chrome** in the root layout: header with current-page state, footer, WhatsApp
  shortcut, page-transition curtain, dark/light theme toggle (remembered, applied before
  first paint).
- **Metadata:** every page has its own title, description, canonical URL and complete Open
  Graph / Twitter tags, including the share image. The sitemap lists all 34 pages.
- **Fixes along the way:**
  - partner logos had been inverted to black on the (now default) dark theme; they now
    invert only in light mode;
  - on the homepage, Open Graph title, description and site name had been dropped;
  - the About values list overflowed by 20 px on 280 px screens.

**Checks — actual results**

| Check | Result |
| --- | --- |
| `npm run check` (lint, typecheck, build, tests) | Pass. 34 prerendered pages |
| `npm test` | 12/12 pass. The tests now run over **every** page (one h1, heading order, in-page anchors, internal links resolve to real pages, alt text, iframe titles, `noopener`, no forms, no review tags, per-page canonical and sharing tags, sitemap = pages) |
| Browser QA, headless Edge, dev **and** production server | No console errors on any page. 0 px horizontal overflow on all pages at 280, 390, 768, 1024 and 1440 px. No duplicate ids. Nothing left hidden by scroll reveals |
| Interactions | Project filters (count announced, no leftover animation styles), FAQ by click and Enter, page transition via client-side navigation, homepage card → case study, theme toggle + reload, mobile menu (focus, inert page, Escape, navigation), privacy contents links, back to top, flipbook embed — all pass |

**Not re-checked for this update:** Lighthouse, axe-core, the `ORVANN_ALLOW_INDEXING=true`
build, and everything under "Not verified — needs manual checking" below.

**What this changes below:** blocker 1 (privacy page) now has a page — the policy text is
restated from the live site and still needs confirming with counsel. Blocker 4 (redirects)
mostly falls away: every old English URL now exists at the same path, except `/hello-world/`
(let it 404) and the Arabic `/ar/…` pages (keep WordPress serving them until an Arabic version
exists). The redirect table and the "sitemap lists only /" launch check below describe the
earlier single-page build.

## What was completed

**Phase 1 — homepage and design system.** Next.js 16 + TypeScript app, with all copy in typed
content files (`src/content`) and verified facts in `src/config/site.ts`. The token system
(colour, type scale, spacing, containers, radii, motion) and tone classes live in
`src/styles/tokens.css`. The shared components are ButtonLink, SectionLabel, Wordmark,
ReviewTag and Icons.

**Phase 2 — hero and motion system.** An art-directed hero with a four-line editorial
composition and responsive type steps. It has one coordinated CSS entrance (navigation →
headline → lede → CTAs → graphic) that runs at first paint. The SVG graphic reworks the O/V
monogram and has depth layers. On fine pointers it responds to the pointer and returns to
rest. A scrubbed ScrollTrigger transition carries the page from the hero into Services. The
mobile menu animates open and closed, and buttons and links share hover/focus feedback.

**Phase 3 — sections.**
- **Services:** grouped into Software Development / Digital Marketing, with 9 numbered rows and
  an accessible accordion (buttons with `aria-expanded`; click, touch, Enter and Space).
- **Selected Work:** **6 verified projects** from orvann.com/our-projects, with their own images
  and factual summaries.
- **Approach:** Discover → Design → Build → Grow, with a desktop scroll-progress line.
- **About:** verified facts and partner logos.
- **Contact and footer:** verified channels only.
- **Motion:** consistent heading reveals and staggered rows.

**Phase 4 — release preparation.**
- **Performance:** GSAP moved off the critical path, and the headline paints on the first frame.
- **Accessibility and responsiveness:** fixes for enlarged text and tiny screens, plus larger
  touch targets.
- **SEO:** metadata, canonical URL, Open Graph/Twitter image (built from ORVANN's logo), icons,
  environment-gated robots.txt and sitemap, verified Organization JSON-LD, and a 404 page.
- **Tests:** 10 release tests.
- **Docs:** `.env.example`, README and these notes.

## Checks performed — actual results

| Check | Result |
| --- | --- |
| `npm run lint` | Pass, 0 problems |
| `npm run typecheck` | Pass |
| `npm run build` | Pass. 8 static routes: `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/icon.png`, `/apple-icon.png`, `/opengraph-image.png`, `/twitter-image.png` |
| `npm test` (10 tests) | 10/10 pass on the default build **and** on a build with `ORVANN_ALLOW_INDEXING=true` |

The tests check:
- one H1 with the approved headline
- no skipped heading levels
- every `#anchor` resolves
- mailto/tel/WhatsApp links present and no form without a backend
- `rel=noopener` on new-tab links
- alt text on every image
- no review-only content in the build
- JSON-LD holds verified facts only
- robots.txt, the robots meta tag and the sitemap agree
- canonical and sharing metadata present

**Browser QA.** Run in headless Microsoft Edge 153 (Chromium) on Windows 11 via puppeteer-core,
against `next start`:

- **Horizontal overflow:** 0 px at 280, 360, 390, 768, 1024, 1440 and 1920 px wide. Also 0 px at
  **200% text size** at 390 and 1440 px (this was 97 px before the fixes).
- **Headings and targets:** no clipped headings; no interactive target under 24 × 24 px.
- **Mobile menu:**
  - opens, moves focus to the first link, and makes the page behind inert and scroll-locked
  - Tab stays in the menu; Escape closes it and returns focus to the toggle
  - menu links land sections 88 px from the top, clear of the 73 px header
- **Services accordion:** works by mouse, Enter, Space and touch. Closed panels are hidden from
  assistive technology.
- **Reduced motion** (emulated): no entrance, pointer or scroll movement, and all content visible
  at 150 ms.
- **Hero graphic:** pointer depth returns exactly to rest.
- **Console:** no errors or warnings on the homepage. The 404 page logs only its own 404 response,
  as expected.
- **Automated accessibility (axe-core 4.13.0):** 0 violations in 6 states — the top of the page,
  after scrolling (desktop and mobile), menu open, accordion open, and 404. axe flagged some
  colour pairs as "needs review" because it can't compute contrast through pseudo-element
  backgrounds or the SVG. They were checked by hand:
  - white on #3C69F1 buttons: 4.68 : 1
  - #1463B8 on white: 6 : 1
  - muted text on paper: 6.3 : 1
  - labels on ink: 8.3 : 1

  Automated checks do not prove full WCAG conformance. See the manual checks below.
- **External links:**
  - LinkedIn, Instagram, WhatsApp (`wa.me`) and the current privacy page: HTTP 200.
  - Facebook: loads as “Orvann | Facebook” in a browser. It returns 400 to command-line
    requests, which is normal for Facebook.

**Lighthouse 13.5.0 (lab data).** Local production server, headless Edge 153. Mobile uses
simulated throttling (150 ms RTT, 1.6 Mbps, 4× CPU slowdown); desktop uses the desktop preset.

| Build | Form factor | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Before Phase 4 (no Work section yet) | Mobile | 77 | 100 | 100 | 100 | 0.9 s | 3.5 s | 530 ms | 0 |
| Final, default (noindex) — run 1 / run 2 | Mobile | 83 / 82 | 100 | 100 | 69 ¹ | 1.5 s | 3.5 / 3.4 s | 350 / 370 ms | 0 |
| Final, default (noindex) | Desktop | 100 | 100 | 100 | 69 ¹ | 0.4 s | 0.8 s | 10 ms | 0 |
| Final, `ORVANN_ALLOW_INDEXING=true` | Mobile | 85 | 100 | 100 | 100 | 1.5 s | 3.4 s | 280 ms | 0 |
| Final, `ORVANN_ALLOW_INDEXING=true` | Desktop | 100 | 100 | 100 | 100 | 0.4 s | 0.7 s | 10 ms | 0 |

¹ SEO 69 is expected: the default build is deliberately `noindex`.

Without throttling, the first paint and the largest paint happen at the same moment (318 ms
locally). The 3.4 s mobile LCP is Lighthouse's simulated slow-4G estimate for the headline's
web fonts. These are lab numbers only, not real-user Core Web Vitals. Watch field data (Search
Console / CrUX) after launch.

**Not verified — needs manual checking:**
- real iPhone/Safari and Android/Chrome devices, and Firefox (only Chromium was automated)
- a screen-reader pass (NVDA or VoiceOver) through the header, menu, accordion and contact links
- the deployed environment itself (hosting, HTTPS, caching headers)
- how `mailto:` and `tel:` links behave on the target devices

Before launch, walk the page with keyboard only and with a screen reader, check the menu and
accordion on a real phone, and view the site in Safari and Firefox.

## Remaining blockers and missing information

**Launch blockers**
1. **Privacy policy.** The footer links to `orvann.com/privacy-policy/` on the current WordPress
   site. That page will 404 once the new site replaces WordPress. The new site needs an approved
   privacy page (legal text was not copied automatically), or the old page must stay reachable.
2. **Positioning versus current wording.** The approved headline and the “Software Development”
   group say ORVANN builds software. But orvann.com's services page and FAQ say websites are
   implemented by developers or partners “under our direction”, and the case studies say ORVANN
   “directed” or “supervised” development. The project summaries follow that wording. Confirm
   the positioning, or adjust the headline and service copy.
3. **Copy sign-off.** Wording marked `[proposed]` in `src/content/en.ts` needs approval:
   - the Services title, intro and group summaries
   - the whole Approach section
   - the About title and second paragraph
   - the contact lede and the 404 copy

   Build with `ORVANN_REVIEW_MODE=true` to see these marked on the page.
4. **Redirect decisions** for the old URLs (see below). Without them, 25 indexed URLs will 404 at
   cut-over.

**Confirm before launch**
- Permission to feature the six client projects and the eight partner logos on the new site.
  All of them are already published on orvann.com.
- Partner names were read from the logos and matched to project pages. Check the spelling.

**Missing assets (the site works without them)**
- **Vector logo (SVG).** The header and footer use a typeset “ORVANN” wordmark. The sharing
  image uses the raster logo, which includes the old “Creativity Hub” line; regenerate it if that
  line is retired.
- **Higher-resolution project images.** The current covers are 1344 px wide, which looks slightly
  soft on large high-density screens.
- **Arabic version.** The code is structured for it, but it isn't built and no language switch is
  shown.
- **Full case-study pages.** Optional; the old pages hold more detail than the homepage cards.

**Contact form (not included)**
There is no form, because there is no verified backend; email, phone and WhatsApp links are
used instead. To add one:
- a server route (Next.js Route Handler) posting to an email or CRM service
- that service's API key stored only in server environment variables
- server-side validation and spam protection (honeypot plus rate limiting, or a CAPTCHA such as
  Turnstile)
- accessible inline errors, and a success message shown only after the service confirms
  delivery

## Local preview

```bash
npm install
npm run build && npm start      # production build at http://localhost:3000
# review build with proposed-copy tags:
#   ORVANN_REVIEW_MODE=true npm run build && npm start   (PowerShell: $env:ORVANN_REVIEW_MODE="true")
```

## Deployment steps

**Runtime.** Node.js ≥ 20.9. `next start` serves the prerendered pages and handles image
optimisation. The build needs network access, because `next/font` downloads Google Fonts at
build time and then self-hosts them. At runtime there are no external services and no secrets.

1. **Put the project under version control.** It isn't a Git repository yet. The existing
   `.gitignore` already excludes `.env*` (except `.env.example`), `.next/` and `node_modules/`.
2. **Choose a host.** Either:
   - **Vercel** (zero-config for Next.js): import the repository with the Next.js preset
     (build `npm run build`, install `npm ci`), or
   - **any Node host:** `npm ci && npm run build && npm start` behind HTTPS (a reverse proxy),
     with `PORT` set as needed.
3. **Staging / preview.** Set no indexing variable; the site sends `noindex` and robots.txt
   disallows crawling. Review there.
4. **Production environment:**
   - `NEXT_PUBLIC_SITE_URL=https://orvann.com`
   - `ORVANN_ALLOW_INDEXING=true`
   - optionally `GOOGLE_SITE_VERIFICATION=KQjvqatSqeCWhhZ694wADmh8PEEu2sZHuAODhkOvYA` — the
     token the live site publishes, if Search Console relies on it
5. **Cut-over.** Only after the blockers above are cleared. Keep WordPress (or at least its
   privacy page and Arabic pages) available until their replacements exist. Pointing DNS at the
   new host is a manual decision for ORVANN.

## Proposed redirects (not configured)

> **Superseded by the multi-page update (top of this file).** Every old English URL below now
> has its own page at the same path, so no redirects are needed for them. Still open:
> `/hello-world/` (let it 404) and the Arabic `/ar/…` pages (keep them on WordPress until an
> Arabic version exists). The original single-page proposal is kept for reference.

These URLs come from the live sitemap (`orvann.com/sitemap.xml`, 26 URLs; the Arabic sitemap
returned none). The site becomes a single page, so a redirect is proposed only where there is a
real equivalent.

| Old URL | Proposal |
| --- | --- |
| `/` | Unchanged |
| `/about-us/` | 301 → `/#about` |
| `/services/` | 301 → `/#services` |
| `/contact-us/` | 301 → `/#contact` |
| `/exhibitions-conferences/` | 301 → `/#services` (events and exhibitions are listed under “Also from ORVANN”), or keep a dedicated page if exhibitions stay a main offer |
| `/our-projects/al-nour-optics/`, `/sami-alsalmi-law-office/`, `/rgc-brokerage/`, `/tucano-2/`, `/plaza-garden-real-estate-development/`, `/al-marefah-tech/` | 301 → `/#work` (featured there), or rebuild as case-study pages (better for SEO) |
| `/our-projects/` for domivento, azdan-dental-center, akam, suncrete, alkholy-lights, diwanyah-culture, eagles-real-estate-development, geocell-keystone, iconic, modern-fix | **Decision needed.** Not on the new homepage. Recommended: rebuild as case-study pages. Don't send them to the homepage. |
| `/about-us/company-profile/` | **Decision needed** (company-profile flipbook). Host the PDF and link to it from About, or keep the page. |
| `/about-us/summer-giveaway/`, `/about-us/vip-gifts/` | **Decision needed** (campaign pages). Likely retire as 410. |
| `/privacy-policy/` | **Must exist** on the new site (blocker 1). |
| `/hello-world/` | WordPress sample post. Let it 404; don't redirect. |
| `/ar/…` (Arabic pages, e.g. `/ar/home-ar/`) | Keep until an Arabic version exists. Don't redirect to the English page. |

To implement the confirmed rows, add them to `next.config.ts`:

```ts
async redirects() {
  return [
    { source: "/about-us", destination: "/#about", permanent: true },
    { source: "/services", destination: "/#services", permanent: true },
    { source: "/contact-us", destination: "/#contact", permanent: true },
  ];
},
```

Next.js removes trailing slashes by default, so `/about-us/` matches too. Redirects that target
a `#section` aren't covered in the bundled Next.js docs, so verify on staging that browsers land
on the section.

## Launch checks

- [ ] Blockers 1–4 resolved and copy signed off. The review-mode build shows no unapproved tags.
- [ ] Production variables set. `https://orvann.com/robots.txt` allows crawling and lists the
      sitemap; the page source shows `index, follow`.
- [ ] `https://orvann.com/sitemap.xml` lists the 34 pages of the new site, all on `https://orvann.com/`.
- [ ] Privacy page reachable from the footer.
- [ ] Redirects return 301 to the intended sections. Decided 410s are in place.
- [ ] Search Console: ownership still verified; sitemap submitted.
- [ ] Share preview checked (LinkedIn Post Inspector, Facebook Sharing Debugger).
- [ ] Manual checks done: keyboard, screen reader, real iOS and Android, Safari, Firefox.
- [ ] Email, phone and WhatsApp links tested on a phone — without sending real enquiries.
- [ ] Core Web Vitals monitored in field data for the first weeks.
