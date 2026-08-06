const { company, footerColumns } = require("../../data/site");

// Root-absolute hrefs here on purpose — see the comment in header.js.
function footer() {
  const columns = footerColumns
    .map(
      (col) => `
      <div class="footer__col">
        <h2 class="footer__heading">${col.heading}</h2>
        <ul class="footer__list">
          ${col.links
            .map(
              (l) =>
                `<li><a href="${l.href}">${l.label}</a></li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");

  const year = new Date().getFullYear();

  return `
  <footer class="site-footer">
    <div class="wrap footer__inner">
      <div class="footer__brand">
        <a class="brand" href="/index.html" aria-label="${company.name} home">
          <svg class="brand__mark" width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
            <path d="M3 20 L9 10 L14 16 L19 6 L25 14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="25" cy="14" r="2.3" fill="currentColor"/>
          </svg>
          <span class="brand__word">${company.name}</span>
        </a>
        <address class="footer__address">
          ${company.address.street}<br />
          ${company.address.city}, ${company.address.region} ${company.address.postalCode}<br />
          <a href="mailto:${company.email}">${company.email}</a>
        </address>
      </div>

      ${columns}
    </div>

    <div class="wrap footer__bottom">
      <p>&copy; ${year} ${company.legalName}. All rights reserved.</p>
      <ul class="footer__social" aria-label="Social media">
        <li><a href="${company.social.twitter}">Twitter</a></li>
        <li><a href="${company.social.linkedin}">LinkedIn</a></li>
        <li><a href="${company.social.github}">GitHub</a></li>
      </ul>
    </div>
  </footer>`;
}

module.exports = footer;
