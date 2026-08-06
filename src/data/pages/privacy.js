const { breadcrumbSchema } = require("../../templates/components/seo");

const content = `
  <section class="page-hero page-hero--center">
    <div class="wrap wrap--narrow">
      <p class="eyebrow">Legal</p>
      <h1>Privacy policy</h1>
      <p class="page-hero__lede">Last updated August 1, 2026.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap wrap--narrow legal-copy">
      <h2>What we collect</h2>
      <p>When you use Traceline, we collect the account and workspace information you provide directly, plus deploy metadata your team connects from your CI/CD provider. We do not collect application source code or customer data from your production systems.</p>

      <h2>How we use it</h2>
      <p>We use collected information to operate the Traceline platform, respond to support requests, and send product updates you can opt out of at any time.</p>

      <h2>Data retention</h2>
      <p>Trace history is retained according to your plan's history window. Account data is retained for 30 days after cancellation, after which it is permanently deleted.</p>

      <h2>Contact</h2>
      <p>Questions about this policy can be sent to <a href="mailto:support@traceline.dev">support@traceline.dev</a>.</p>

      <p class="legal-copy__note">This is placeholder legal copy for a fictional demo product and is not intended for production use without review by counsel.</p>
    </div>
  </section>
`;

module.exports = {
  path: "/privacy.html",
  bodyClass: "page-legal",
  seo: {
    title: "Privacy Policy — Traceline",
    description: "How Traceline collects, uses, and retains data.",
    type: "website",
  },
  structuredData: [
    breadcrumbSchema([
      { name: "Home", path: "/index.html" },
      { name: "Privacy Policy", path: "/privacy.html" },
    ]),
  ],
  content,
};
