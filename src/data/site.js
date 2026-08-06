// site.js
// Global, cross-page content. A content editor can change copy, links,
// and contact details here without touching any template or CSS.

module.exports = {
  company: {
    name: "Traceline",
    legalName: "Traceline Software, Inc.",
    tagline: "Ship changes. Watch them land.",
    domain: "https://www.traceline.dev",
    logoText: "Traceline",
    foundedYear: "2021",
    email: "hello@traceline.dev",
    supportEmail: "support@traceline.dev",
    salesEmail: "sales@traceline.dev",
    phone: "+1-415-555-0119",
    address: {
      street: "548 Market St, PMB 62109",
      city: "San Francisco",
      region: "CA",
      postalCode: "94104",
      country: "US",
    },
    social: {
      twitter: "https://twitter.com/tracelinehq",
      linkedin: "https://www.linkedin.com/company/traceline",
      github: "https://github.com/traceline",
    },
  },

  nav: [
    { label: "Product", href: "/product.html" },
    { label: "Pricing", href: "/pricing.html" },
    { label: "Contact", href: "/contact.html" },
  ],

  navCta: { label: "Start free trial", href: "/contact.html#trial" },

  footerColumns: [
    {
      heading: "Product",
      links: [
        { label: "Deploy tracing", href: "/product.html#tracing" },
        { label: "Incident timeline", href: "/product.html#incidents" },
        { label: "SLA reporting", href: "/product.html#sla" },
        { label: "Pricing", href: "/pricing.html" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Contact sales", href: "/contact.html" },
        { label: "Support", href: "mailto:support@traceline.dev" },
        { label: "Status", href: "#", note: "external status page" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy.html" },
        { label: "Terms of service", href: "/terms.html" },
      ],
    },
  ],
};
