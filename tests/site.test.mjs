// Release checks against the production build output. Run after `npm run build`:
//   npm test
// They read the prerendered HTML of every page (the whole site is static), so they test
// exactly what ships.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const APP = new URL("../.next/server/app/", import.meta.url);
const read = (name) => {
  const url = new URL(name, APP);
  assert.ok(existsSync(url), `${name} is missing — run "npm run build" first`);
  return readFileSync(url, "utf8");
};

/** Every prerendered page, keyed by its URL path ("index.html" → "/", "a/b.html" → "/a/b/"). */
const pages = new Map(
  readdirSync(APP, { recursive: true })
    .map((file) => file.replaceAll("\\", "/"))
    .filter((file) => file.endsWith(".html") && !file.startsWith("_"))
    .map((file) => [file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}/`, read(file)]),
);
const home = pages.get("/");

const text = (fragment) => fragment.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const decode = (value) => value.replace(/&amp;/g, "&");
/** Runs `check` on every page, naming the page in any failure. */
const eachPage = (check) => {
  for (const [path, html] of pages) {
    try {
      check(html, path);
    } catch (error) {
      error.message = `${path}: ${error.message}`;
      throw error;
    }
  }
};

test("the build contains every page of the site", () => {
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
  }
  assert.equal([...pages.keys()].filter((path) => path.startsWith("/our-projects/") && path !== "/our-projects/").length, 16);
});

test("every page has exactly one h1; the homepage's is the approved headline", () => {
  eachPage((html) => assert.equal([...html.matchAll(/<h1\b/g)].length, 1, "expected one h1"));
  const [, h1] = home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
  assert.equal(text(h1), "We build digital experiences. We grow ambitious brands.");
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

test("every internal link leads to a page that exists", () => {
  const assets = /\.(png|jpe?g|webp|svg|ico|xml|txt|webmanifest)$/;
  eachPage((html) => {
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
      const path = decode(href).split(/[?#]/)[0];
      if (path.startsWith("/_next/") || assets.test(path)) continue;
      assert.ok(pages.has(path), `link to ${href} has no page`);
    }
  });
});

test("contact channels are real, working link formats", () => {
  for (const path of ["/", "/contact-us/"]) {
    const html = pages.get(path);
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
    assert.ok(!/Proposed copy/i.test(html), "review tags leaked into the build");
    assert.ok(!/Concept project/i.test(html), "concept work leaked into the build");
  });
});

test("structured data is valid JSON with verified facts only", () => {
  const match = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, "Organization JSON-LD is missing");
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
});

test("indexing settings agree across robots.txt, every page's robots meta and the sitemap", () => {
  const robots = read("robots.txt.body");
  const blocked = /Disallow: \/\s*$/m.test(robots);
  eachPage((html) => {
    const noindex = /<meta name="robots" content="noindex/.test(html);
    assert.equal(noindex, blocked, "robots.txt and the page's robots meta disagree");
  });
  if (!blocked) assert.ok(/Sitemap: https?:\/\/\S+\/sitemap\.xml/.test(robots), "robots.txt should list the sitemap");

  const sitemap = read("sitemap.xml.body");
  const listed = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual([...listed].sort(), [...pages.keys()].sort(), "the sitemap should list every page, and only pages");
});

test("every page has its own canonical URL and complete sharing metadata", () => {
  eachPage((html, path) => {
    const canonical = html.match(/<link rel="canonical" href="https?:\/\/[^/"]+([^"]*)"/);
    assert.ok(canonical, "canonical link missing");
    // Next writes the root canonical as the bare origin, which is equivalent to "/".
    assert.equal(canonical[1] || "/", path, "canonical points at another page");
    for (const property of ["og:title", "og:description", "og:site_name", "og:url", "og:image", "og:image:alt"]) {
      assert.ok(new RegExp(`<meta property="${property}" content="[^"]+"`).test(html), `${property} missing`);
    }
    assert.ok(/<meta property="og:image" content="[^"]+opengraph-image/.test(html), "og:image is not the share image");
    assert.ok(/<meta name="twitter:card" content="summary_large_image"/.test(html), "twitter card missing");
    assert.ok(/<meta name="twitter:image" content="[^"]+"/.test(html), "twitter:image missing");
  });
});
