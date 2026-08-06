#!/usr/bin/env node
// build.js
// Generates the static site into /dist from:
//   - src/templates  (layout + shared header/footer/seo - "layout code")
//   - src/data/pages (per-page copy + seo metadata - what a content editor edits)
//   - src/styles, src/scripts, src/assets (copied as-is)
//
// Run: node build.js

const fs = require("fs");
const path = require("path");
const layout = require("./src/templates/layout");
const { company } = require("./src/data/site");
const { toRelHref } = require("./src/lib/paths");

// Page copy (src/data/pages/*.js) writes internal links the natural way —
// href="/contact.html#trial" — rather than every content author having to
// remember to call toRelHref() themselves. This single pass rewrites every
// such href/src in the fully rendered HTML to be document-relative, so the
// same output works at a domain root AND under a GitHub Pages subpath.
// External URLs (http/https/mailto/tel) and same-page "#anchors" are left
// untouched by toRelHref().
function makeLinksRelative(html) {
  return html.replace(/(href|src)="([^"]+)"/g, (match, attr, value) => {
    return `${attr}="${toRelHref(value)}"`;
  });
}

// 404.html is a special case: GitHub Pages serves it for ANY unmatched
// URL, at any depth (e.g. a broken /repo/some/deep/link still renders
// 404.html's content, but the browser's address bar still says
// /repo/some/deep/link). A document-relative link on that page would
// resolve against the broken URL, not against 404.html's real location,
// and 404 again. So the 404 page — and only the 404 page — needs fully
// absolute links instead of relative ones.
function makeLinksAbsolute(html) {
  return html.replace(/(href|src)="(\/[^/][^"]*)"/g, (match, attr, value) => {
    return `${attr}="${company.domain}${value}"`;
  });
}

const DIST = path.join(__dirname, "dist");
const PAGES_DIR = path.join(__dirname, "src", "data", "pages");

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function buildPages() {
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".js"));
  const routes = [];

  for (const file of files) {
    const page = require(path.join(PAGES_DIR, file));
    const rawHtml = layout({
      seo: page.seo,
      path: page.path,
      bodyClass: page.bodyClass,
      structuredData: page.structuredData || [],
      content: page.content,
    });
    const html = makeLinksRelative(rawHtml);
    const outPath = path.join(DIST, page.path.replace(/^\//, ""));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    routes.push(page.path);
    console.log("built:", page.path);
  }
  return routes;
}

function build404() {
  const content = `
  <section class="section page-hero page-hero--center" style="padding-top:6rem;">
    <div class="wrap wrap--narrow">
      <p class="eyebrow">404</p>
      <h1>We couldn't trace this page</h1>
      <p class="page-hero__lede">The page you're looking for may have moved. Try the homepage, or one of the links below.</p>
      <a class="btn btn--primary btn--lg" href="/index.html">Back to home</a>
    </div>
  </section>`;
  const rawHtml = layout({
    seo: {
      title: "Page not found — Traceline",
      description: "The page you requested could not be found.",
    },
    path: "/404.html",
    bodyClass: "page-404",
    content,
  });
  // Absolute links here, not relative — see makeLinksAbsolute() above.
  const html = makeLinksAbsolute(rawHtml);
  fs.writeFileSync(path.join(DIST, "404.html"), html);
  console.log("built: /404.html");
}

function buildRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${company.domain}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST, "robots.txt"), txt);
}

function buildSitemap(routes) {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${company.domain}${r}</loc>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml);
}

function buildManifest() {
  const manifest = {
    name: company.name,
    short_name: company.name,
    start_url: "/index.html",
    display: "standalone",
    background_color: "#0F1720",
    theme_color: "#0F1720",
    icons: [{ src: "assets/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
  fs.writeFileSync(
    path.join(DIST, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
}

function run() {
  rimraf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  copyDir(path.join(__dirname, "src", "styles"), path.join(DIST, "styles"));
  copyDir(path.join(__dirname, "src", "scripts"), path.join(DIST, "scripts"));
  copyDir(path.join(__dirname, "src", "assets"), path.join(DIST, "assets"));

  const routes = buildPages();
  build404();
  buildRobots();
  buildSitemap(routes);
  buildManifest();

  // Convenience alias so "/" resolves locally the same as index.html
  fs.copyFileSync(path.join(DIST, "index.html"), path.join(DIST, "index.html"));

  console.log(`\nDone. ${routes.length} pages built to /dist.`);
}

run();
