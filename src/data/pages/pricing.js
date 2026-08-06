const {
  faqSchema,
  productOffersSchema,
  breadcrumbSchema,
} = require("../../templates/components/seo");

const plans = [
  {
    slug: "starter",
    name: "Starter",
    monthlyPrice: "0",
    priceLabel: "$0",
    priceNote: "per workspace / month",
    description: "For small teams trying Traceline on one or two services.",
    features: [
      "Up to 2 traced services",
      "7-day trace history",
      "Slack notifications",
      "Community support",
    ],
    cta: { label: "Start free", href: "/contact.html#trial" },
    featured: false,
  },
  {
    slug: "team",
    name: "Team",
    monthlyPrice: "29",
    priceLabel: "$29",
    priceNote: "per service / month",
    description: "For teams running production services with real on-call.",
    features: [
      "Unlimited traced services",
      "90-day trace history",
      "Incident timeline + postmortem export",
      "SLA dashboards, 1 customer tier",
      "Email + chat support",
    ],
    cta: { label: "Start free trial", href: "/contact.html#trial" },
    featured: true,
  },
  {
    slug: "scale",
    name: "Scale",
    monthlyPrice: "79",
    priceLabel: "$79",
    priceNote: "per service / month",
    description: "For platform teams with SLA commitments to enforce.",
    features: [
      "Everything in Team",
      "Unlimited trace history",
      "Unlimited customer tiers",
      "SSO and audit log",
      "Dedicated onboarding engineer",
    ],
    cta: { label: "Talk to sales", href: "/contact.html" },
    featured: false,
  },
];

const faqs = [
  {
    question: "How is a 'traced service' counted?",
    answer:
      "A traced service is any deployable unit you connect to Traceline, such as an API, worker, or frontend app. You can rename or reconnect services at any time without changing your bill mid-cycle.",
  },
  {
    question: "Can we switch plans later?",
    answer:
      "Yes. You can upgrade at any time and the change applies immediately with prorated billing. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes, annual billing is available on the Team and Scale plans at a 15% discount versus monthly pricing. Contact sales to switch an existing workspace to annual billing.",
  },
  {
    question: "What happens to our data if we cancel?",
    answer:
      "Your trace history remains exportable for 30 days after cancellation. After that window, workspace data is permanently deleted from Traceline's systems.",
  },
];

const content = `
  <section class="page-hero page-hero--center">
    <div class="wrap wrap--narrow">
      <p class="eyebrow">Pricing</p>
      <h1>Straightforward pricing, per service</h1>
      <p class="page-hero__lede">
        Every plan includes deploy tracing. Higher tiers add trace history,
        incident tooling, and SLA reporting as your on-call gets more serious.
      </p>
    </div>
  </section>

  <section class="section" aria-labelledby="plans-heading">
    <h2 id="plans-heading" class="visually-hidden">Pricing plans</h2>
    <div class="wrap">
      <div class="plans">
        ${plans
          .map(
            (p) => `
          <article class="plan-card${p.featured ? " plan-card--featured" : ""}" id="${p.slug}">
            ${p.featured ? '<p class="plan-card__badge">Most popular</p>' : ""}
            <h3>${p.name}</h3>
            <p class="plan-card__price">
              <span class="plan-card__amount">${p.priceLabel}</span>
              <span class="plan-card__note">${p.priceNote}</span>
            </p>
            <p class="plan-card__desc">${p.description}</p>
            <ul class="checklist">
              ${p.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
            <a class="btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block" href="${p.cta.href}">${p.cta.label}</a>
          </article>`
          )
          .join("")}
      </div>
      <p class="plans__note">Prices in USD. All plans include a 14-day free trial. <a href="/contact.html">Need a custom or on-prem plan?</a></p>
    </div>
  </section>

  <section class="section section--muted" aria-labelledby="compare-heading">
    <div class="wrap">
      <h2 id="compare-heading" class="section__heading">Compare plans</h2>
      <div class="table-scroll">
        <table class="compare-table">
          <caption class="visually-hidden">Feature comparison across Starter, Team, and Scale plans</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Starter</th>
              <th scope="col">Team</th>
              <th scope="col">Scale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Traced services</th>
              <td>2</td>
              <td>Unlimited</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <th scope="row">Trace history</th>
              <td>7 days</td>
              <td>90 days</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <th scope="row">Incident timeline</th>
              <td>&mdash;</td>
              <td>Included</td>
              <td>Included</td>
            </tr>
            <tr>
              <th scope="row">SLA dashboards</th>
              <td>&mdash;</td>
              <td>1 tier</td>
              <td>Unlimited tiers</td>
            </tr>
            <tr>
              <th scope="row">SSO / audit log</th>
              <td>&mdash;</td>
              <td>&mdash;</td>
              <td>Included</td>
            </tr>
            <tr>
              <th scope="row">Support</th>
              <td>Community</td>
              <td>Email + chat</td>
              <td>Dedicated engineer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="faq-heading">
    <div class="wrap wrap--narrow">
      <h2 id="faq-heading" class="section__heading">Pricing questions</h2>
      <dl class="faq">
        ${faqs
          .map(
            (f) => `
          <div class="faq__item">
            <dt>${f.question}</dt>
            <dd>${f.answer}</dd>
          </div>`
          )
          .join("")}
      </dl>
    </div>
  </section>

  <section class="section cta-band" aria-labelledby="cta-heading">
    <div class="wrap cta-band__inner">
      <h2 id="cta-heading">Start tracing deploys today</h2>
      <p>Free for small teams. No credit card required.</p>
      <a class="btn btn--primary btn--lg" href="/contact.html#trial">Start free trial</a>
    </div>
  </section>
`;

module.exports = {
  path: "/pricing.html",
  bodyClass: "page-pricing",
  seo: {
    title: "Traceline Pricing — Plans for teams of any size",
    description:
      "Traceline pricing starts free for small teams. Team and Scale plans add incident timelines, SLA dashboards, and SSO as your on-call scales.",
    type: "website",
  },
  structuredData: [
    faqSchema(faqs),
    productOffersSchema(plans),
    breadcrumbSchema([
      { name: "Home", path: "/index.html" },
      { name: "Pricing", path: "/pricing.html" },
    ]),
  ],
  content,
};
