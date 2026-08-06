// seo.js
// Pure functions that turn page-level SEO data into <head> markup.
// Keeping this separate means a content editor only ever fills in a
// small `seo` object per page (see src/data/pages/*.js) instead of
// hand-writing meta/OG/JSON-LD tags on every page.

const { company } = require("../../data/site");

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function metaTags({ title, description, path, image, type = "website" }) {
  const url = `${company.domain}${path}`;
  const ogImage = image || `${company.domain}/assets/og-default.svg`;
  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${escapeHtml(company.name)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:alt" content="${escapeHtml(company.name)} — ${escapeHtml(company.tagline)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:site" content="@tracelinehq" />
  `.trim();
}

function organizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: company.domain,
    logo: `${company.domain}/assets/logo.svg`,
    foundingDate: company.foundedYear,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    sameAs: Object.values(company.social),
  };
  return jsonLd(schema);
}

function softwareApplicationSchema({ name, description, offers, ratingValue, ratingCount }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${company.domain}/product.html`,
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: company.domain,
    },
    ...(offers ? { offers } : {}),
    ...(ratingValue
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount,
          },
        }
      : {}),
  };
  return jsonLd(schema);
}

function productOffersSchema(plans) {
  // Used on the pricing page: an OfferCatalog under the Organization/Product.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${company.name} platform subscription`,
    brand: { "@type": "Brand", name: company.name },
    description:
      "Deploy tracing, incident timelines, and SLA reporting for engineering teams.",
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.monthlyPrice,
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      url: `${company.domain}/pricing.html#${plan.slug}`,
      availability: "https://schema.org/InStock",
    })),
  };
  return jsonLd(schema);
}

function faqSchema(faqs) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return jsonLd(schema);
}

function breadcrumbSchema(items) {
  // items: [{ name, path }]
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${company.domain}${item.path}`,
    })),
  };
  return jsonLd(schema);
}

function contactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${company.name}`,
    url: `${company.domain}/contact.html`,
    about: { "@type": "Organization", name: company.name },
  };
  return jsonLd(schema);
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

module.exports = {
  metaTags,
  organizationSchema,
  softwareApplicationSchema,
  productOffersSchema,
  faqSchema,
  breadcrumbSchema,
  contactPageSchema,
  jsonLd,
};
