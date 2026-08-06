const traceTimeline = require("../../templates/components/trace-timeline");
const { faqSchema, breadcrumbSchema } = require("../../templates/components/seo");

const heroEvents = [
  { time: "09:14", label: "checkout-api v2.9.1", status: "ok" },
  { time: "09:41", label: "billing-worker v1.4.0", status: "watch" },
  { time: "10:02", label: "billing-worker v1.4.1", status: "resolved" },
  { time: "10:30", label: "web-app v6.2.0", status: "ok" },
];

const features = [
  {
    title: "Deploy tracing",
    id: "tracing",
    body:
      "Every deploy is linked to the commits, config changes, and feature flags that shipped with it, so a regression is a two-click investigation instead of a war room.",
  },
  {
    title: "Incident timeline",
    id: "incidents",
    body:
      "When something breaks, Traceline reconstructs the sequence of deploys, alerts, and on-call actions automatically, so the postmortem starts written instead of blank.",
  },
  {
    title: "SLA reporting",
    id: "sla",
    body:
      "Uptime and latency budgets roll up by service and by customer tier, with reports your account team can hand to a customer without editing a spreadsheet first.",
  },
];

const steps = [
  {
    title: "Connect your pipeline",
    body: "Point Traceline at GitHub Actions, CircleCI, or your existing CI in about ten minutes. No agents to run on production hosts.",
  },
  {
    title: "Watch deploys land",
    body: "Every release streams into a live trace: build, rollout, error rate, and the first customer-visible signal, in one line.",
  },
  {
    title: "Close the loop",
    body: "Incidents inherit the trace automatically. Your team spends the retro on the fix, not on reconstructing what happened.",
  },
];

const faqs = [
  {
    question: "Does Traceline require an agent on our production servers?",
    answer:
      "No. Traceline reads deploy events from your CI/CD provider and metrics from your existing observability stack through read-only API connections. There is no agent to install or maintain on production hosts.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams connect their first pipeline in under ten minutes using our GitHub Actions or CircleCI integration, and see their first traced deploy the same day.",
  },
  {
    question: "Can we try Traceline before buying?",
    answer:
      "Yes. Every plan starts with a 14-day free trial with full feature access and no credit card required. You can invite your whole team during the trial.",
  },
];

const content = `
  <section class="hero">
    <div class="wrap hero__grid">
      <div class="hero__copy">
        <p class="eyebrow">Deployment intelligence for engineering teams</p>
        <h1>Ship changes. Watch them land.</h1>
        <p class="hero__lede">
          Traceline connects every deploy to the incident it caused, or didn't,
          so your team spends retros fixing problems instead of reconstructing
          what happened.
        </p>
        <div class="hero__actions">
          <a class="btn btn--primary btn--lg" href="/contact.html#trial">Start free trial</a>
          <a class="btn btn--ghost btn--lg" href="/product.html">See how it works</a>
        </div>
        <p class="hero__meta">14-day trial &middot; no credit card &middot; cancel anytime</p>
      </div>

      <div class="hero__visual">
        ${traceTimeline(heroEvents, { caption: "A live trace from a Traceline workspace" })}
      </div>
    </div>
  </section>

  <section class="section logos" aria-label="Trusted by engineering teams at">
    <div class="wrap">
      <p class="logos__label">Trusted by platform teams at growing software companies</p>
      <ul class="logos__list">
        <li>Fernwood Systems</li>
        <li>Basecamp Freight</li>
        <li>Harlow Data</li>
        <li>Quietroom</li>
        <li>Portside Labs</li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="features-heading">
    <div class="wrap">
      <h2 id="features-heading" class="section__heading">Everything between "merged" and "confirmed working"</h2>
      <div class="feature-grid">
        ${features
          .map(
            (f) => `
          <article class="feature-card" id="${f.id}">
            <h3>${f.title}</h3>
            <p>${f.body}</p>
            <a class="feature-card__link" href="/product.html#${f.id}">Learn more<span class="visually-hidden"> about ${f.title}</span> &rarr;</a>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--muted" aria-labelledby="steps-heading">
    <div class="wrap">
      <h2 id="steps-heading" class="section__heading">How teams get started</h2>
      <ol class="steps">
        ${steps
          .map(
            (s, i) => `
          <li class="steps__item">
            <span class="steps__number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <h3>${s.title}</h3>
            <p>${s.body}</p>
          </li>`
          )
          .join("")}
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="quote-heading">
    <div class="wrap">
      <h2 id="quote-heading" class="visually-hidden">Customer feedback</h2>
      <blockquote class="quote">
        <p>&ldquo;Our last two incident reviews took twenty minutes instead of two hours, because the trace was already there. We spent the time on the actual fix.&rdquo;</p>
        <footer>
          <cite>Priya Raman, Head of Platform Engineering, Harlow Data</cite>
        </footer>
      </blockquote>
    </div>
  </section>

  <section class="section section--muted" aria-labelledby="faq-heading">
    <div class="wrap wrap--narrow">
      <h2 id="faq-heading" class="section__heading">Common questions</h2>
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
      <h2 id="cta-heading">Trace your next deploy in ten minutes</h2>
      <p>No credit card. Full features. Cancel whenever you like.</p>
      <a class="btn btn--primary btn--lg" href="/contact.html#trial">Start free trial</a>
    </div>
  </section>
`;

module.exports = {
  path: "/index.html",
  bodyClass: "page-home",
  seo: {
    title: "Traceline — Deploy tracing and incident timelines for engineering teams",
    description:
      "Traceline connects every deploy to the incidents it causes, so engineering teams spend retros fixing problems instead of reconstructing what happened.",
    type: "website",
  },
  structuredData: [
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Home", path: "/index.html" }]),
  ],
  content,
};
