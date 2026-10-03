// Serves the static export in out/ the way public/.htaccess does on the host, to check a
// build locally before uploading it: English at the root (from out/en/), Arabic under /ar/,
// /en/… redirected to its public URL, page URLs ending in a slash, and each language's 404.
//   npm run build && npm start        (PORT=4000 npm start for another port)
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// normalize() on a rooted path resolves every "..", so a request can never leave out/.
const fileFor = (urlPath) => join(root, normalize(`/${decodeURIComponent(urlPath)}`));
const isFile = (urlPath) => {
  try {
    return statSync(fileFor(urlPath)).isFile();
  } catch {
    return false;
  }
};

createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  let path = url.pathname;
  const redirect = (to, status = 301) => response.writeHead(status, { Location: to + url.search }).end();

  if (/^\/en(\/|$)/.test(path)) return redirect(path.slice("/en".length) || "/");
  // Hidden parts (not built) go on as public/.htaccess sends them: Arabic to English, Our Work home.
  if (/^\/ar(\/|$)/.test(path) && !isFile("/ar/index.html")) return redirect(path.slice("/ar".length) || "/", 302);
  if (/^\/our-projects(\/|$)/.test(path) && !isFile("/en/our-projects/index.html")) return redirect("/", 302);
  if (!isFile(path) && !/(\/|\.[^/]*)$/.test(path)) return redirect(`${path}/`);
  if (!/^\/(ar|_next)(\/|$)/.test(path) && !isFile(path)) path = `/en${path}`;
  if (path.endsWith("/")) path += "index.html";

  const [status, file] = isFile(path)
    ? [200, path]
    : [404, path.startsWith("/ar/") ? "/ar/404/index.html" : "/en/404/index.html"];
  response.writeHead(status, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(fileFor(file)).pipe(response);
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}`));
