const traceTimeline = require("../../templates/components/trace-timeline");
const {
  softwareApplicationSchema,
  breadcrumbSchema,
} = require("../../templates/components/seo");

const tracingEvents = [
  { time: "14:02", label: "api-gateway v3.1.0", status: "ok" },
  { time: "14:07", label: "search-svc v2.0.4", status: "watch" },
  { time: "14:19", label: "search-svc v2.0.5", status: "resolved" },
];

const modules = [
  {
    id: "tracing",
    title: "Deploy tracing",
    kicker: "See the whole release, not just the commit",
    body:
      "Traceline stitches together the commit range, config diffs, and feature flag changes behind every deploy. When error rates move, you start from what actually shipped, not from a guess.",
    bullets: [
      "Automatic linkage between CI runs, deploys, and flag changes",
      "Per-service deploy history with rollback in two clicks",
      "Slack and email digests scoped to the services your team owns",
    ],
  },
  {
    id: "incidents",
    title: "Incident timeline",
    kicker: "The postmortem starts written",
    body:
      "The moment an alert fires, Traceline assembles the deploy trace, the on-call actions taken, and the customer-facing impact into one timeline your team can annotate together in real time.",
    bullets: [
      "Auto-generated timeline from alert to resolution",
      "Shared annotation during the incident, not after",
      "One-click export to your postmortem template",
    ],
  },
  {
    id: "sla",
    title: "SLA reporting",
    kicker: "Uptime numbers your account team can trust",
    body:
      "Availability and latency budgets roll up automatically by service and by customer tier, matched against the commitments in your contracts, so a support ticket is never the first place you learn about a breach.",
    bullets: [
      "Per-tier SLA dashboards with breach alerting",
      "Exportable reports formatted for customer hand-off",
      "Historical trend view across quarters",
    ],
  },
];

const integrations = [
  "GitHub Actions",
  "CircleCI",
  "GitLab CI",
  "PagerDuty",
  "Datadog",
  "Slack",
];

const content = `
  <section class="page-hero">
    <div class="wrap">
      <p class="eyebrow">Product</p>
      <h1>One trace, from commit to customer impact</h1>
      <p class="page-hero__lede">
        Traceline is the record of what shipped, what it touched, and what
        happened next. Built for platform and backend teams who are tired of
        rebuilding that record by hand during an incident.
      </p>
      ${traceTimeline(tracingEvents, { caption: "A trace mid-incident, updating live" })}
    </div>
  </section>

  ${modules
    .map(
      (m, i) => `
  <section class="section${i % 2 === 1 ? " section--muted" : ""}" id="${m.id}" aria-labelledby="${m.id}-heading">
    <div class="wrap module module--${i % 2 === 0 ? "left" : "right"}">
      <div class="module__text">
        <p class="eyebrow">${m.kicker}</p>
        <h2 id="${m.id}-heading">${m.title}</h2>
        <p>${m.body}</p>
        <ul class="checklist">
          ${m.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>
      <div class="module__figure" aria-hidden="true">
        <div class="module__panel module__panel--${m.id}"></div>
      </div>
    </div>
  </section>`
    )
    .join("")}

  <section class="section" aria-labelledby="integrations-heading">
    <div class="wrap">
      <h2 id="integrations-heading" class="section__heading">Works with what you already run</h2>
      <p class="section__lede">Traceline reads from your existing CI/CD, alerting, and chat tools. There is nothing to install on production hosts.</p>
      <ul class="chip-list">
        ${integrations.map((i) => `<li class="chip">${i}</li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="section cta-band" aria-labelledby="cta-heading">
    <div class="wrap cta-band__inner">
      <h2 id="cta-heading">See your own deploys traced</h2>
      <p>Connect one pipeline and watch the first trace appear in minutes.</p>
      <a class="btn btn--primary btn--lg" href="/contact.html#trial">Start free trial</a>
    </div>
  </section>
`;

module.exports = {
  path: "/product.html",
  bodyClass: "page-product",
  seo: {
    title: "Traceline Product — Deploy tracing, incident timelines, SLA reporting",
    description:
      "See how Traceline links deploys to incidents automatically, with deploy tracing, live incident timelines, and per-tier SLA reporting.",
    type: "website",
  },
  structuredData: [
    softwareApplicationSchema({
      name: "Traceline",
      description:
        "Deployment intelligence platform that links deploys to incidents automatically, with incident timelines and SLA reporting for engineering teams.",
      offers: {
        "@type": "AggregateOffer",
        lowCurrency: "USD",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "79",
        offerCount: "3",
      },
      ratingValue: "4.8",
      ratingCount: "126",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/index.html" },
      { name: "Product", path: "/product.html" },
    ]),
  ],
  content,
};
