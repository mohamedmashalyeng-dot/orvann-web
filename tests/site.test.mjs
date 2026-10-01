// Release checks against the static export in out/. Run after `npm run build`:
//   npm test
// They read the exported HTML of every page in both languages — the files that are uploaded
// to the host — so they test exactly what ships.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const OUT = new URL("../out/", import.meta.url);
const read = (name) => {
  const url = new URL(name, OUT);
  assert.ok(existsSync(url), `${name} is missing — run "npm run build" first`);
  return readFileSync(url, "utf8");
};

/**
 * Every exported page, keyed by its public URL. English is built under /en/ and served at
 * the root by public/.htaccess ("en/services/index.html" → "/services/"); Arabic keeps its
 * prefix ("ar/services/index.html" → "/ar/services/"). The 404 pages are not site pages.
 */
const toPath = (file) => {
  const path = `/${file.replace(/index\.html$/, "")}`;
  return path.startsWith("/en/") ? path.slice("/en".length) : path;
};
const pages = new Map(
  readdirSync(OUT, { recursive: true })
    .map((file) => file.replaceAll("\\", "/"))
    .filter((file) => /^(en|ar)\/(.+\/)?index\.html$/.test(file) && !/^(en|ar)\/404\//.test(file))
    .map((file) => [toPath(file), { html: read(file), locale: file.split("/")[0] }]),
);
const localeOf = (path) => (path === "/ar/" || path.startsWith("/ar/") ? "ar" : "en");
const otherPath = (path) => (localeOf(path) === "ar" ? path.replace(/^\/ar/, "") || "/" : `/ar${path}`);

const text = (fragment) => fragment.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const decode = (value) => value.replace(/&amp;/g, "&");
/** Runs `check` on every page, naming the page in any failure. */
const eachPage = (check) => {
  for (const [path, { html, locale }] of pages) {
    try {
      check(html, path, locale);
    } catch (error) {
      error.message = `${path}: ${error.message}`;
      throw error;
    }
  }
};

test("the build contains every page of the site, in both languages", () => {
  for (const path of [
    "/",
    "/services/",
    "/our-projects/",
    "/our-projects/tucano-2/",
    "/exhibitions-conferences/",
    "/about-us/",
    "/about-us/company-profile/",
    "/contact-us/",
    "/privacy-policy/",
  ]) {
    assert.ok(pages.has(path), `${path} was not prerendered`);
    assert.ok(pages.has(otherPath(path)), `${otherPath(path)} was not prerendered`);
  }
  for (const prefix of ["/our-projects/", "/ar/our-projects/"]) {
    const studies = [...pages.keys()].filter((path) => path.startsWith(prefix) && path !== prefix);
    assert.equal(studies.length, 16, `${prefix}: expected 16 case studies`);
  }
  const english = [...pages.keys()].filter((path) => localeOf(path) === "en");
  assert.deepEqual(english.map(otherPath).sort(), [...pages.keys()].filter((path) => localeOf(path) === "ar").sort());
});

test("every page declares its language and direction", () => {
  eachPage((html, path, locale) => {
    const tag = html.match(/<html\b[^>]*>/)?.[0] ?? "";
    assert.equal(locale, localeOf(path));
    assert.ok(tag.includes(`lang="${locale}"`), `expected lang="${locale}"`);
    assert.ok(tag.includes(`dir="${locale === "ar" ? "rtl" : "ltr"}"`), "wrong text direction");
  });
});

test("every page links to its other-language version and lists hreflang alternates", () => {
  eachPage((html, path) => {
    const other = otherPath(path);
    const switches = [...html.matchAll(/<a\b[^>]*hrefLang="(en|ar)"[^>]*>/g)].map(([tag]) => tag.match(/href="([^"]+)"/)[1]);
    assert.ok(switches.length > 0, "language switch missing");
    for (const href of switches) assert.equal(href, other, "language switch points at the wrong page");
    for (const locale of ["en", "ar"]) {
      assert.ok(new RegExp(`<link rel="alternate" hrefLang="${locale}" href="[^"]+"`).test(html), `hreflang ${locale} missing`);
    }
  });
});

test("every page has exactly one h1; the homepages carry the approved headline", () => {
  eachPage((html) => assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "expected one h1"));
  const headline = (path) => text(pages.get(path).html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
  assert.equal(headline("/"), "Your Growth Partner.");
  assert.equal(headline("/ar/"), "شريكك في النمو.");
});

test("heading levels never skip", () => {
  eachPage((html) => {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    levels.forEach((level, index) => {
      if (index > 0) assert.ok(level <= levels[index - 1] + 1, `h${levels[index - 1]} is followed by h${level}`);
    });
  });
});

test("every in-page link points at an element that exists", () => {
  eachPage((html) => {
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    assert.ok(anchors.length > 0, "no in-page links found (the skip link should be one)");
    for (const anchor of anchors) assert.ok(ids.has(anchor), `#${anchor} has no matching id`);
  });
});

test("every internal link leads to a page that exists, in the page's own language", () => {
  const assets = /\.(png|jpe?g|webp|svg|ico|xml|txt|webmanifest)$/;
  eachPage((html, path) => {
    for (const [tag, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"[^>]*>/g)) {
      const target = decode(href).split(/[?#]/)[0];
      if (target.startsWith("/_next/") || assets.test(target)) continue;
      assert.ok(pages.has(target), `link to ${href} has no page`);
      // Only the language switch may cross languages.
      if (!/hrefLang=/.test(tag)) assert.equal(localeOf(target), localeOf(path), `link to ${href} leaves the language`);
    }
  });
});

test("contact channels are real, working link formats", () => {
  for (const path of ["/", "/contact-us/", "/ar/", "/ar/contact-us/"]) {
    const { html } = pages.get(path);
    assert.ok(/href="mailto:info@orvann\.com"/.test(html), `${path}: email link missing`);
    assert.ok(/href="tel:\+201080784465"/.test(html), `${path}: phone link missing`);
    assert.ok(/href="https:\/\/wa\.me\/201080784465"/.test(html), `${path}: WhatsApp link missing`);
  }
  eachPage((html) => assert.ok(!/<form\b/.test(html), "a form needs a real backend before it can ship"));
});

test("links that open a new tab are protected with rel=noopener", () => {
  eachPage((html) => {
    for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.ok(/rel="[^"]*noopener[^"]*"/.test(tag), `missing rel=noopener: ${tag}`);
    }
  });
});

test("every image has alt text and every frame a title", () => {
  eachPage((html) => {
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      // Empty alt only for decorative duplicates that are also hidden from assistive technology.
      const decorative = /\salt=""/.test(tag) && /\saria-hidden="true"/.test(tag);
      assert.ok(decorative || /\salt="[^"]+"/.test(tag), `missing alt: ${tag.slice(0, 120)}`);
    }
    for (const [tag] of html.matchAll(/<iframe\b[^>]*>/g)) {
      assert.ok(/\stitle="[^"]+"/.test(tag), `missing title: ${tag.slice(0, 120)}`);
    }
  });
});

test("review-only content never reaches a default build", () => {
  eachPage((html) => {
    assert.ok(!/Proposed copy|نص مقترح/i.test(html), "review tags leaked into the build");
    assert.ok(!/Concept project/i.test(html), "concept work leaked into the build");
  });
});

test("structured data is valid JSON with verified facts only", () => {
  for (const path of ["/", "/ar/"]) {
    const match = pages.get(path).html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match, `${path}: Organization JSON-LD is missing`);
    const data = JSON.parse(match[1]);
    assert.equal(data["@type"], "Organization");
    assert.equal(data.name, "ORVANN");
    assert.equal(data.email, "info@orvann.com");
    assert.equal(data.telephone, "+201080784465");
    assert.equal(data.address.addressLocality, "Giza");
    assert.equal(data.address.addressCountry, "EG");
    assert.deepEqual(data.sameAs, [
      "https://www.linkedin.com/company/orvann/",
      "https://www.instagram.com/orvann.eg/",
      "https://www.facebook.com/orvann.eg",
    ]);
    for (const key of ["aggregateRating", "review", "award", "numberOfEmployees", "foundingDate"]) {
      assert.ok(!(key in data), `${key} is not a verified fact`);
    }
  }
});

test("indexing settings agree across robots.txt, every page's robots meta and the sitemap", () => {
  const robots = read("robots.txt");
  const blocked = /Disallow: \/\s*$/m.test(robots);
  eachPage((html) => {
    const noindex = /<meta name="robots" content="noindex/.test(html);
    assert.equal(noindex, blocked, "robots.txt and the page's robots meta disagree");
  });
  if (!blocked) assert.ok(/Sitemap: https?:\/\/\S+\/sitemap\.xml/.test(robots), "robots.txt should list the sitemap");

  const sitemap = read("sitemap.xml");
  const listed = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual([...listed].sort(), [...pages.keys()].sort(), "the sitemap should list every page, and only pages");
});

test("every page has its own canonical URL and complete sharing metadata", () => {
  eachPage((html, path) => {
    const canonical = html.match(/<link rel="canonical" href="https?:\/\/[^/"]+([^"]*)"/);
    assert.ok(canonical, "canonical link missing");
    // Next writes the root canonical as the bare origin, which is equivalent to "/".
    assert.equal(canonical[1] || "/", path, "canonical points at another page");
    for (const property of ["og:title", "og:description", "og:site_name", "og:url", "og:locale", "og:image", "og:image:alt"]) {
      assert.ok(new RegExp(`<meta property="${property}" content="[^"]+"`).test(html), `${property} missing`);
    }
    assert.ok(/<meta property="og:image" content="[^"]+opengraph-image/.test(html), "og:image is not the share image");
    assert.ok(/<meta name="twitter:card" content="summary_large_image"/.test(html), "twitter card missing");
    assert.ok(/<meta name="twitter:image" content="[^"]+"/.test(html), "twitter:image missing");
  });
});

test("the export carries the host's rewrite rules and a 404 page per language", () => {
  assert.ok(/^RewriteEngine On$/m.test(read(".htaccess")), ".htaccess (English at the root) is missing");
  assert.ok(read("ar/.htaccess").includes("ErrorDocument 404 /ar/404/index.html"), "Arabic 404 rule is missing");
  for (const locale of ["en", "ar"]) {
    const html = read(`${locale}/404/index.html`);
    assert.ok(html.includes(`lang="${locale}"`), `${locale} 404 page is in the wrong language`);
    assert.ok(/<meta name="robots" content="noindex/.test(html), `${locale} 404 page must not be indexed`);
  }
});
