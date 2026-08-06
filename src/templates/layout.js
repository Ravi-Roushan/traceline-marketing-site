const header = require("./components/header");
const footer = require("./components/footer");
const { metaTags, organizationSchema } = require("./components/seo");
// Root-absolute asset paths here on purpose — build.js rewrites them
// per page (relative for normal pages, domain-absolute for 404.html).
// See makeLinksRelative()/makeLinksAbsolute() in build.js.
/**
 * layout({ seo, path, bodyClass, structuredData, content })
 * seo: { title, description, image?, type? }
 * path: current page path e.g. "/product.html" (for canonical + active nav)
 * structuredData: array of extra JSON-LD <script> strings for this page
 * content: page body HTML (string)
 */
function layout({ seo, path, bodyClass = "", structuredData = [], content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0F1720" />
  ${metaTags({ ...seo, path })}

  <link rel="preload" as="style" href="/styles/main.css" />
  <link rel="stylesheet" href="/styles/main.css" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="manifest" href="/site.webmanifest" />

  ${organizationSchema()}
  ${structuredData.join("\n  ")}
</head>
<body class="${bodyClass}">
  ${header(path)}
  <main id="main" tabindex="-1">
    ${content}
  </main>
  ${footer()}
  <script src="/scripts/main.js" defer></script>
</body>
</html>`;
}

module.exports = layout;
