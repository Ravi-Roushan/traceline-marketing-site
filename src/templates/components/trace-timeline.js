// trace-timeline.js
// Renders a row of real-looking deploy/incident events as an accessible
// ordered list dressed as a horizontal timeline. This is Traceline's
// signature visual: the product's own data model (a trace of events)
// used as the design device, not a stock illustration.

const STATUS_LABEL = {
  ok: "Deployed clean",
  watch: "Under observation",
  resolved: "Resolved",
};

function traceTimeline(events, { caption } = {}) {
  const items = events
    .map(
      (e, i) => `
      <li class="trace__item trace__item--${e.status}">
        <span class="trace__time">${e.time}</span>
        <span class="trace__dot" aria-hidden="true"></span>
        <span class="trace__label">${e.label}</span>
        <span class="trace__status">${STATUS_LABEL[e.status] || e.status}</span>
      </li>`
    )
    .join("");

  return `
  <figure class="trace" role="group" aria-label="${caption || "Recent deploy trace"}">
    <ol class="trace__list">
      ${items}
    </ol>
    ${caption ? `<figcaption class="trace__caption">${caption}</figcaption>` : ""}
  </figure>`;
}

module.exports = traceTimeline;
