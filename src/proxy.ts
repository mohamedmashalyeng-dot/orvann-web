import { NextResponse, type NextRequest } from "next/server";

/**
 * Both languages are served by app/[lang]. English keeps orvann.com's current URLs
 * ("/services/"), so its requests are rewritten to "/en/…" behind the scenes; Arabic lives
 * under "/ar/". "/en/…" itself redirects to the public URL, so every page has one address.
 * Runs under `next dev` only: the site ships as static files, and public/.htaccess applies
 * the same rules on the host.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/en".length) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next.js internals and anything with a file extension (images in
  // public/, icons, robots.txt, sitemap.xml, the share images).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
