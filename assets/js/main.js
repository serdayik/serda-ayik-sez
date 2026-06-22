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

  /* ---------- Carousel (oklu galeri) ---------- */
  function initCarousel(root) {
    var track = root.querySelector(".carousel-track");
    var slides = root.querySelectorAll(".carousel-slide");
    var dots = root.querySelectorAll("[data-dot]");
    var prev = root.querySelector(".carousel-prev");
    var next = root.querySelector(".carousel-next");
    if (!track || slides.length === 0) return;
    var index = 0;
    var count = slides.length;

    function update() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("active", d === index);
      }
    }
    function go(step) {
      index = (index + step + count) % count;
      update();
    }

    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    for (var i = 0; i < dots.length; i++) {
      (function (n) {
        dots[n].addEventListener("click", function () { index = n; update(); });
      })(i);
    }
    update();
  }

  var carousels = document.querySelectorAll("[data-carousel]");
  for (var c = 0; c < carousels.length; c++) initCarousel(carousels[c]);
})();
