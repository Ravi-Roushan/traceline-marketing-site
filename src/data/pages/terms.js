const { breadcrumbSchema } = require("../../templates/components/seo");

const content = `
  <section class="page-hero page-hero--center">
    <div class="wrap wrap--narrow">
      <p class="eyebrow">Legal</p>
      <h1>Terms of service</h1>
      <p class="page-hero__lede">Last updated August 1, 2026.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap wrap--narrow legal-copy">
      <h2>1. Using Traceline</h2>
      <p>By creating a Traceline workspace, you agree to use the service in accordance with these terms and any plan limits described on the pricing page.</p>

      <h2>2. Accounts and billing</h2>
      <p>Paid plans are billed monthly or annually in advance. You may cancel at any time; charges already incurred are non-refundable except where required by law.</p>

      <h2>3. Service availability</h2>
      <p>We target 99.9% uptime for the Traceline platform and will notify workspace admins of planned maintenance in advance where practical.</p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:support@traceline.dev">support@traceline.dev</a>.</p>

      <p class="legal-copy__note">This is placeholder legal copy for a fictional demo product and is not intended for production use without review by counsel.</p>
    </div>
  </section>
`;

module.exports = {
  path: "/terms.html",
  bodyClass: "page-legal",
  seo: {
    title: "Terms of Service — Traceline",
    description: "The terms governing use of the Traceline platform.",
    type: "website",
  },
  structuredData: [
    breadcrumbSchema([
      { name: "Home", path: "/index.html" },
      { name: "Terms of Service", path: "/terms.html" },
    ]),
  ],
  content,
};
