// paths.js
// Every page in dist/ lives flat at the top level (index.html,
// product.html, pricing.html, ...), so a root-absolute link like
// "/product.html" and a document-relative link like "product.html"
// resolve to the exact same place *as long as the site is served from
// its own root*. They stop being equivalent the moment the site is
// served from a subpath, e.g. GitHub Pages project sites at
// https://user.github.io/repo-name/ — a root-absolute link there
// resolves to https://user.github.io/product.html (wrong) instead of
// https://user.github.io/repo-name/product.html (right).
//
// toRelHref() strips the leading "/" from internal links (and internal
// anchors like "/product.html#tracing") so every generated href is
// document-relative and therefore correct at any base path — a domain
// root, a GitHub Pages subpath, or a preview deploy under a random
// prefix. External URLs, mailto:, tel:, and same-page "#anchor" links
// are left untouched.

function toRelHref(href) {
  if (!href) return href;
  const isInternalRootLink =
    href.startsWith("/") && !href.startsWith("//");
  return isInternalRootLink ? href.slice(1) : href;
}

module.exports = { toRelHref };
