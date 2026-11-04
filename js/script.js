// K Explore — Main application script
// Handles: theme toggle, mobile nav, smooth scrolling, event rendering,
// search, category filtering, countdown timer, registration form + validation,
// and Local Storage persistence of registrations.

import { EVENTS, CATEGORIES } from "./events.js";

(function () {
  "use strict";

  /* ---------------------------------------------------------------
   * Theme (dark / light) toggle — persisted in Local Storage
   * ------------------------------------------------------------- */
  const THEME_KEY = "kexplore-theme";

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const theme = saved || (prefersLight ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  /* ---------------------------------------------------------------
   * Mobile navigation toggle
   * ------------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;
    const onScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded);
    });

    // Close menu after clicking a link (mobile UX).
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------
   * Smooth scrolling for in-page anchor links
   * ------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const id = this.getAttribute("href");
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------------------------------------------------------------
   * Homepage: render event cards, search + category filter
   * ------------------------------------------------------------- */
  let activeCategory = "All";
  let searchQuery = "";

  function renderEvents() {
    const grid = document.getElementById("eventsGrid");
    if (!grid) return;

    const query = searchQuery.trim().toLowerCase();
    const filtered = EVENTS.filter(function (ev) {
      const matchesCategory =
        activeCategory === "All" || ev.category === activeCategory;
      const matchesSearch =
        !query ||
        ev.name.toLowerCase().indexOf(query) !== -1 ||
        ev.venue.toLowerCase().indexOf(query) !== -1 ||
        ev.category.toLowerCase().indexOf(query) !== -1 ||
        ev.description.toLowerCase().indexOf(query) !== -1;
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML =
        '<p class="no-results">No events match your search. Try a different keyword or category.</p>';
      return;
    }

    grid.innerHTML = filtered
      .map(function (ev) {
        return (
          '<article class="event-card" data-category="' + ev.category + '">' +
          '<div class="event-card__image">' +
          '<img src="' + ev.image + '" alt="' + escapeAttr(ev.name) + '" loading="lazy" />' +
          '<span class="event-card__badge">' + ev.category + "</span>" +
          "</div>" +
          '<div class="event-card__body">' +
          "<h3>" + escapeHtml(ev.name) + "</h3>" +
          '<p class="event-card__meta"><span>📅</span> ' +
          formatDate(ev.date) + " · " + ev.time + "</p>" +
          '<p class="event-card__meta"><span>📍</span> ' + escapeHtml(ev.venue) + "</p>" +
          "<p class=\"event-card__desc\">" + escapeHtml(ev.description) + "</p>" +
          '<div class="event-card__footer">' +
          '<span class="event-card__price">' + ev.price + "</span>" +
          '<a class="btn btn--small" href="event-details.html?id=' + ev.id + '">View Details</a>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderCategoryPills() {
    const wrap = document.getElementById("categoryPills");
    if (!wrap) return;

    wrap.innerHTML = CATEGORIES
      .map(function (cat) {
        const active = cat === activeCategory ? " active" : "";
        return (
          '<button class="pill' + active + '" data-category="' + cat + '">' +
          cat +
          "</button>"
        );
      })
      .join("");

    wrap.querySelectorAll(".pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        activeCategory = this.getAttribute("data-category");
        renderCategoryPills();
        renderEvents();
      });
    });
  }

  function initSearch() {
    const input = document.getElementById("searchInput");
    const btn = document.getElementById("searchBtn");
    if (!input) return;

    function runSearch() {
      searchQuery = input.value;
      renderEvents();
      // Scroll to events section so the result is visible.
      const section = document.getElementById("events");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }

    input.addEventListener("input", function () {
      searchQuery = input.value;
      renderEvents();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") runSearch();
    });
    if (btn) btn.addEventListener("click", runSearch);
  }

  /* ---------------------------------------------------------------
   * Hero "Explore Events" button
   * ------------------------------------------------------------- */
  function initHeroButton() {
    const btn = document.getElementById("exploreBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const section = document.getElementById("events");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------
   * Event details page
   * ------------------------------------------------------------- */
  function initEventDetails() {
    const container = document.getElementById("eventDetail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    const ev = EVENTS.find(function (e) {
      return e.id === id;
    });

    if (!ev) {
      container.innerHTML =
        '<div class="state-message"><h2>Event not found</h2>' +
        '<p>The event you are looking for does not exist.</p>' +
        '<a class="btn" href="index.html">Back to Home</a></div>';
      return;
    }

    document.title = ev.name + " — K Explore";

    container.innerHTML =
      '<div class="detail-card">' +
      '<div class="detail-card__image">' +
      '<img src="' + ev.image + '" alt="' + escapeAttr(ev.name) + '" />' +
      '<span class="event-card__badge">' + ev.category + "</span>" +
      "</div>" +
      '<div class="detail-card__body">' +
      "<h1>" + escapeHtml(ev.name) + "</h1>" +
      '<div class="detail-card__meta">' +
      '<div class="detail-meta-item"><span>📅</span><div><strong>Date</strong><p>' +
      formatDate(ev.date) + "</p></div></div>" +
      '<div class="detail-meta-item"><span>⏰</span><div><strong>Time</strong><p>' +
      ev.time + "</p></div></div>" +
      '<div class="detail-meta-item"><span>📍</span><div><strong>Venue</strong><p>' +
      escapeHtml(ev.venue) + "</p></div></div>" +
      '<div class="detail-meta-item"><span>🎟️</span><div><strong>Price</strong><p>' +
      ev.price + "</p></div></div>" +
      "</div>" +
      '<div class="detail-card__countdown" id="countdown"></div>' +
      "<h2>About this event</h2>" +
      "<p>" + escapeHtml(ev.description) + "</p>" +
      '<a class="btn btn--primary" href="register.html?id=' + ev.id + '">Register Now</a>' +
      "</div>" +
      "</div>";

    initCountdown(ev.date + "T" + to24h(ev.time));
  }

  /* ---------------------------------------------------------------
   * Countdown timer
   * ------------------------------------------------------------- */
  function initCountdown(targetISO) {
    const el = document.getElementById("countdown");
    if (!el) return;
    const target = new Date(targetISO).getTime();
    if (isNaN(target)) return;

    function update() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        el.innerHTML = "<span>This event has started!</span>";
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      el.innerHTML =
        '<div class="countdown-block"><span>' + d + "</span><small>Days</small></div>" +
        '<div class="countdown-block"><span>' + h + "</span><small>Hours</small></div>" +
        '<div class="countdown-block"><span>' + m + "</span><small>Minutes</small></div>" +
        '<div class="countdown-block"><span>' + s + "</span><small>Seconds</small></div>";
    }

    update();
    setInterval(update, 1000);
  }

  /* ---------------------------------------------------------------
   * Registration form: validation + Local Storage
   * ------------------------------------------------------------- */
  const REG_KEY = "kexplore-registrations";

  function getRegistrations() {
    try {
      return JSON.parse(localStorage.getItem(REG_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveRegistration(record) {
    const list = getRegistrations();
    list.push(record);
    localStorage.setItem(REG_KEY, JSON.stringify(list));
  }

  function initRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    // Pre-select the event if ?id= is present.
    const select = document.getElementById("eventSelect");
    if (select) {
      select.innerHTML =
        '<option value="">Select an event</option>' +
        EVENTS
          .map(function (ev) {
            return (
              '<option value="' + ev.id + '">' +
              escapeHtml(ev.name) + " — " + formatDate(ev.date) +
              "</option>"
            );
          })
          .join("");

      const params = new URLSearchParams(window.location.search);
      const preId = params.get("id");
      if (preId) select.value = preId;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      const record = {
        id: Date.now(),
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        eventId: parseInt(form.eventSelect.value, 10),
        eventName:
          select.options[select.selectedIndex].textContent.split(" — ")[0],
        registeredAt: new Date().toISOString()
      };

      saveRegistration(record);
      showConfirmation(record);
      form.reset();
    });
  }

  function validateForm(form) {
    clearErrors(form);

    let ok = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const eventId = form.eventSelect.value;

    if (name.length < 2) {
      showError(form.name, "Please enter your full name (at least 2 characters).");
      ok = false;
    }
    // Basic email pattern.
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showError(form.email, "Please enter a valid email address.");
      ok = false;
    }
    // Phone: 7-15 digits, allow spaces, dashes, parentheses, leading +.
    const phoneRe = /^\+?[\d\s()-]{7,15}$/;
    if (!phoneRe.test(phone)) {
      showError(form.phone, "Please enter a valid phone number (7-15 digits).");
      ok = false;
    }
    if (!eventId) {
      showError(form.eventSelect, "Please choose an event to register for.");
      ok = false;
    }
    return ok;
  }

  function showError(field, message) {
    const group = field.closest(".form-group");
    if (!group) return;
    let err = group.querySelector(".form-error");
    if (!err) {
      err = document.createElement("p");
      err.className = "form-error";
      group.appendChild(err);
    }
    err.textContent = message;
    field.classList.add("invalid");
  }

  function clearErrors(form) {
    form.querySelectorAll(".form-error").forEach(function (el) {
      el.textContent = "";
    });
    form.querySelectorAll(".invalid").forEach(function (el) {
      el.classList.remove("invalid");
    });
  }

  function showConfirmation(record) {
    const box = document.getElementById("confirmation");
    const formWrap = document.getElementById("formWrap");
    if (!box || !formWrap) return;

    box.innerHTML =
      '<div class="confirmation-card">' +
      '<div class="confirmation-icon">✅</div>' +
      "<h2>Registration Confirmed!</h2>" +
      "<p>Thank you, <strong>" + escapeHtml(record.name) + "</strong>. Your spot for " +
      "<strong>" + escapeHtml(record.eventName) + "</strong> has been reserved.</p>" +
      '<p class="confirmation-detail">A confirmation has been saved to this browser. We can\'t wait to see you there!</p>' +
      '<div class="confirmation-actions">' +
      '<a class="btn btn--primary" href="index.html">Back to Home</a>' +
      '<button class="btn" id="registerAnother">Register for Another Event</button>' +
      "</div>" +
      "</div>";
    box.classList.add("show");
    formWrap.classList.add("hide");
    box.scrollIntoView({ behavior: "smooth", block: "center" });

    const another = document.getElementById("registerAnother");
    if (another) {
      another.addEventListener("click", function () {
        box.classList.remove("show");
        formWrap.classList.remove("hide");
        box.innerHTML = "";
      });
    }
  }

  /* ---------------------------------------------------------------
   * Contact form (homepage) — front-end only confirmation
   * ------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg = document.getElementById("contactSuccess");
      if (msg) {
        msg.textContent =
          "Thanks for reaching out! We'll get back to you within 24 hours.";
        msg.classList.add("show");
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------
   * Helpers
   * ------------------------------------------------------------- */
  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  // Convert "09:00 AM" -> "09:00:00" for ISO construction.
  function to24h(time) {
    const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return "00:00:00";
    let h = parseInt(m[1], 10);
    const min = m[2];
    const ap = m[3].toUpperCase();
    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return (h < 10 ? "0" + h : h) + ":" + min + ":00";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  /* ---------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMobileNav();
    initHeaderScroll();
    initSmoothScroll();

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    // Homepage pieces.
    renderCategoryPills();
    renderEvents();
    initSearch();
    initHeroButton();
    initContactForm();

    // Sub-pages.
    initEventDetails();
    initRegisterForm();
  });
})();
