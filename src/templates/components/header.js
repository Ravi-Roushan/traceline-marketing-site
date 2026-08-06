const { company, nav, navCta } = require("../../data/site");

// Deliberately root-absolute here ("/product.html", not "product.html").
// build.js decides at the very end, per page, whether to rewrite these to
// document-relative (normal pages) or fully domain-absolute (404.html) —
// see makeLinksRelative()/makeLinksAbsolute() in build.js for why.
function header(activePath) {
  const navItems = nav
    .map((item) => {
      const isActive = item.href === activePath;
      return `
        <li class="nav__item">
          <a class="nav__link${isActive ? " nav__link--active" : ""}" href="${item.href}"${
        isActive ? ' aria-current="page"' : ""
      }>${item.label}</a>
        </li>`;
    })
    .join("");

  return `
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header">
    <div class="wrap site-header__inner">
      <a class="brand" href="/index.html" aria-label="${company.name} home">
        <svg class="brand__mark" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
          <path d="M3 20 L9 10 L14 16 L19 6 L25 14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="25" cy="14" r="2.3" fill="currentColor"/>
        </svg>
        <span class="brand__word">${company.name}</span>
      </a>

      <button
        class="nav-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="primary-nav"
        id="nav-toggle"
      >
        <span class="visually-hidden">Menu</span>
        <span class="nav-toggle__bars" aria-hidden="true"></span>
      </button>

      <nav class="primary-nav" id="primary-nav" aria-label="Primary">
        <ul class="nav__list">
          ${navItems}
        </ul>
        <a class="btn btn--primary btn--nav" href="${navCta.href}">${navCta.label}</a>
      </nav>
    </div>
  </header>`;
}

module.exports = header;
