/* =====================================================================
   Will Smith - portfolio interactions
   ===================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveals (with auto-stagger) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var step = parseInt(group.getAttribute("data-stagger"), 10) || 90;
    var kids = group.querySelectorAll(":scope > [data-reveal], :scope > * > [data-reveal]");
    kids.forEach(function (el, i) {
      if (!el.style.getPropertyValue("--d")) {
        el.style.setProperty("--d", (i * step) / 1000 + "s");
      }
    });
  });

  /* Reveal on entry. An IntersectionObserver does the work when it can, but a
     geometry sweep runs alongside it so content can never be stranded at
     opacity 0 if the observer is throttled, delayed, or unavailable. The sweep
     list shrinks as elements reveal, so it costs nothing once the page is read. */
  var pending = Array.prototype.slice.call(revealEls);

  function reveal(el) {
    el.classList.add("in");
  }

  function sweepReveals() {
    if (!pending.length) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    pending = pending.filter(function (el) {
      if (el.classList.contains("in")) return false;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > -1) { reveal(el); return false; }
      return true;
    });
  }

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(reveal);
    pending = [];
  }

  sweepReveals();
  window.addEventListener("load", sweepReveals);
  window.setTimeout(sweepReveals, 600);

  /* ---------- Scroll-driven effects ---------- */
  var progress = document.querySelector(".progress");
  var parallax = document.querySelector("[data-parallax]");
  var parallaxImg = parallax ? parallax.querySelector("img") : null;
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    sweepReveals();

    if (nav) {
      nav.classList.toggle("scrolled", y > 8);
      var menuOpen = links && links.classList.contains("open");
      if (!menuOpen) {
        if (y > 320 && y > lastY + 4) nav.classList.add("hide");
        else if (y < lastY - 4 || y < 320) nav.classList.remove("hide");
      }
    }

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", h > 0 ? Math.min(y / h, 1) : 0);
    }

    if (parallaxImg && !reduced) {
      var r = parallax.getBoundingClientRect();
      if (r.bottom > -200 && r.top < window.innerHeight + 200) {
        var p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        var offset = (p - 0.5) * 64;
        parallaxImg.style.transform =
          "translate3d(0," + offset.toFixed(2) + "px,0) scale(1.09)";
      }
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  if (parallaxImg && !reduced) parallaxImg.style.willChange = "transform";
  onScroll();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
