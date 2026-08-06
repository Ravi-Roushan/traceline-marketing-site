const {
  contactPageSchema,
  breadcrumbSchema,
} = require("../../templates/components/seo");
const { company } = require("../../data/site");

const content = `
  <section class="page-hero page-hero--center">
    <div class="wrap wrap--narrow">
      <p class="eyebrow">Contact</p>
      <h1>Talk to the team, or start your trial</h1>
      <p class="page-hero__lede">
        Tell us a bit about your pipeline and on-call setup. A Traceline
        engineer, not a bot, replies to every message within one business day.
      </p>
    </div>
  </section>

  <section class="section" aria-labelledby="contact-heading">
    <div class="wrap contact-grid">
      <div class="contact-form-wrap" id="trial">
        <h2 id="contact-heading">Send us a message</h2>

        <form
          class="contact-form"
          id="contact-form"
          name="contact"
          method="POST"
          action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID"
          novalidate
        >
          <p id="form-status" class="form-status" role="status" aria-live="polite"></p>

          <div class="field">
            <label for="name">Full name</label>
            <input type="text" id="name" name="name" autocomplete="name" required />
            <span class="field__error" id="name-error" aria-live="polite"></span>
          </div>

          <div class="field">
            <label for="email">Work email</label>
            <input type="email" id="email" name="email" autocomplete="email" required />
            <span class="field__error" id="email-error" aria-live="polite"></span>
          </div>

          <div class="field">
            <label for="company">Company</label>
            <input type="text" id="company" name="company" autocomplete="organization" />
          </div>

          <div class="field">
            <label for="team-size">Engineering team size</label>
            <select id="team-size" name="team_size">
              <option value="1-10">1&ndash;10</option>
              <option value="11-50">11&ndash;50</option>
              <option value="51-200">51&ndash;200</option>
              <option value="200+">200+</option>
            </select>
          </div>

          <div class="field">
            <label for="message">What are you hoping to trace?</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            <span class="field__error" id="message-error" aria-live="polite"></span>
          </div>

          <fieldset class="field field--fieldset">
            <legend>What are you interested in?</legend>
            <div class="radio-row">
              <label><input type="radio" name="interest" value="trial" checked /> Starting a free trial</label>
              <label><input type="radio" name="interest" value="demo" /> Booking a demo</label>
              <label><input type="radio" name="interest" value="enterprise" /> Enterprise / Scale plan</label>
            </div>
          </fieldset>

          <button type="submit" class="btn btn--primary btn--lg btn--block">Send message</button>
          <p class="form-note">
            By submitting, you agree to be contacted about Traceline. See our
            <a href="/privacy.html">privacy policy</a>.
          </p>
        </form>
      </div>

      <aside class="contact-info" aria-labelledby="other-ways-heading">
        <h2 id="other-ways-heading">Other ways to reach us</h2>
        <ul class="contact-info__list">
          <li>
            <h3>Sales</h3>
            <p><a href="mailto:${company.salesEmail}">${company.salesEmail}</a></p>
          </li>
          <li>
            <h3>Support</h3>
            <p><a href="mailto:${company.supportEmail}">${company.supportEmail}</a></p>
          </li>
          <li>
            <h3>Phone</h3>
            <p><a href="tel:${company.phone}">${company.phone}</a></p>
          </li>
          <li>
            <h3>Office</h3>
            <address>
              ${company.address.street}<br />
              ${company.address.city}, ${company.address.region} ${company.address.postalCode}
            </address>
          </li>
        </ul>
      </aside>
    </div>
  </section>
`;

module.exports = {
  path: "/contact.html",
  bodyClass: "page-contact",
  seo: {
    title: "Contact Traceline — Start a trial or talk to sales",
    description:
      "Get in touch with Traceline to start a free trial, book a demo, or ask about Team and Scale plans. A response from a real engineer within one business day.",
    type: "website",
  },
  structuredData: [
    contactPageSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/index.html" },
      { name: "Contact", path: "/contact.html" },
    ]),
  ],
  content,
};
