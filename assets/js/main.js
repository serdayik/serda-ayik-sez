/* ===========================================================
   Serda Ayık Sez — site etkileşimleri
   1) Mobil menü
   2) Görsel indirme koruması (caydırıcı önlemler)
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Mobil menü ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- Görsel indirme koruması ----------
     Not: Hiçbir yöntem %100 koruma sağlamaz; bu önlemler
     sıradan kullanıcının sağ tık / sürükle ile kaydetmesini engeller. */

  // Tüm görselleri sürüklenemez yap
  function hardenImages() {
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("draggable", "false");
      imgs[i].oncontextmenu = function () { return false; };
    }
  }
  hardenImages();

  // Görsel ve medya alanlarında sağ tık menüsünü engelle
  document.addEventListener("contextmenu", function (e) {
    var t = e.target;
    if (t && (t.tagName === "IMG" || (t.closest && t.closest(".media")))) {
      e.preventDefault();
    }
  });

  // Sürükle-bırak ile kaydetmeyi engelle
  document.addEventListener("dragstart", function (e) {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });

  // Yıl bilgisini footer'a yaz
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Carousel (Instagram tarzı) ---------- */
  function initCarousel(root) {
    var track = root.querySelector(".carousel-track");
    var slides = root.querySelectorAll(".carousel-slide");
    var dots = root.querySelectorAll("[data-dot]");
    var prev = root.querySelector(".carousel-prev");
    var next = root.querySelector(".carousel-next");
    if (!track || slides.length === 0) return;

    function index() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    function sync() {
      var i = index();
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("active", d === i);
      }
      if (prev) prev.hidden = i <= 0;
      if (next) next.hidden = i >= slides.length - 1;
    }
    function go(step) {
      track.scrollBy({ left: step * track.clientWidth, behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });

    var raf;
    track.addEventListener("scroll", function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    });
    window.addEventListener("resize", sync);
    sync();
  }

  var carousels = document.querySelectorAll("[data-carousel]");
  for (var c = 0; c < carousels.length; c++) initCarousel(carousels[c]);
})();

/* ===========================================================
   Çerez onayı + Microsoft Clarity (yalnızca onaydan sonra yüklenir)
   KVKK/GDPR: analiz çerezleri açık rıza ile çalışır.
   =========================================================== */
(function () {
  "use strict";
  var KEY = "cookie-consent-v1";

  function loadClarity() {
    if (window.__clarityLoaded) return;
    window.__clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "xbzxdrfzdf");
  }

  var consent = null;
  try { consent = localStorage.getItem(KEY); } catch (e) {}
  if (consent === "accepted") { loadClarity(); return; }
  if (consent === "declined") { return; }

  function showBar() {
    var bar = document.createElement("div");
    bar.className = "cookie-bar";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Çerez bilgilendirmesi");
    bar.innerHTML =
      '<p>Bu sitede, ziyaretçi deneyimini anlamak için çerezler ve etkileşim/oturum kayıtları (Microsoft Clarity) kullanılabilir. ' +
      'Ayrıntılar için <a href="/gizlilik">Gizlilik &amp; Çerez Politikası</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="c-btn c-accept">Kabul Et</button>' +
      '<button type="button" class="c-btn c-decline">Reddet</button>' +
      '</div>';
    function close() { if (bar.parentNode) bar.parentNode.removeChild(bar); }
    document.body.appendChild(bar);
    bar.querySelector(".c-accept").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (e) {}
      loadClarity(); close();
    });
    bar.querySelector(".c-decline").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "declined"); } catch (e) {}
      close();
    });
  }

  if (document.body) showBar();
  else document.addEventListener("DOMContentLoaded", showBar);
})();
