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
})();
