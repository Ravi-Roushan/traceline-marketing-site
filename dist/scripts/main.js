(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    // Close the menu when a nav link is activated (mobile).
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 780px)").matches) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  var required = [
    { id: "name", message: "Enter your full name." },
    {
      id: "email",
      message: "Enter a valid work email address.",
      validate: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
    },
    { id: "message", message: "Tell us a little about what you're hoping to trace." },
  ];

  function setError(id, message) {
    var errorEl = document.getElementById(id + "-error");
    var inputEl = document.getElementById(id);
    if (errorEl) errorEl.textContent = message || "";
    if (inputEl) inputEl.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validate() {
    var firstInvalid = null;
    var valid = true;

    required.forEach(function (field) {
      var el = document.getElementById(field.id);
      var value = el ? el.value.trim() : "";
      var ok = value.length > 0 && (!field.validate || field.validate(value));
      setError(field.id, ok ? "" : field.message);
      if (!ok) {
        valid = false;
        firstInvalid = firstInvalid || el;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!validate()) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.classList.add("form-status--error");
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    var endpoint = form.getAttribute("action");
    var placeholder = endpoint.indexOf("REPLACE_WITH_YOUR_FORM_ID") !== -1;

    if (placeholder) {
      // No real backend wired up in this deliverable — see README
      // "Wiring the contact form" for the one-line fix.
      window.setTimeout(function () {
        status.textContent =
          "Demo mode: this form isn't connected to a backend yet. See README \u201cWiring the contact form.\u201d";
        status.classList.add("form-status--error");
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 400);
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks — a Traceline engineer will reply within one business day.";
          status.classList.add("form-status--success");
        } else {
          status.textContent = "Something went wrong sending your message. Please email hello@traceline.dev instead.";
          status.classList.add("form-status--error");
        }
      })
      .catch(function () {
        status.textContent = "Something went wrong sending your message. Please email hello@traceline.dev instead.";
        status.classList.add("form-status--error");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
