# Taslaklar (Drafts)

Bu klasör, **henüz yayınlanmamış** yazılar/sayfalar için "taslak" alanıdır.

- Bu klasörün içindekiler `.gitignore` ile **yayına gönderilmez** — yani canlı
  sitede (serdayiksez.com) görünmez, linki sızmaz, arama motorları görmez.
- Yalnızca bu `README.md` depoda tutulur; taslak `.html` ve görseller yerelde kalır.

## Akış

**Taslağa ekle:** Yeni içerik (ör. Substack yazısı) önce `_drafts/` altında hazırlanır.
Hazır ama yayında değil.

**Yayınla:** "X yazısını yayınla" denildiğinde:
1. Yazı dosyası `_drafts/` → `yazilar/` (veya ilgili konuma) taşınır.
2. Görseli `assets/img/...` altına alınır.
3. İlgili kategori sayfasına kart, `sitemap.xml`, blog sayacı ve BlogPosting/OG eklenir.
4. commit + push → **canlıya çıkar.**

**Yayından kaldır (geri taslağa al):** "X yazısını taslağa al" denildiğinde yukarıdaki
adımlar tersine alınır; yazı `_drafts/`'a geri taşınır, karttan/sitemap'ten çıkarılır,
push edilir → canlıdan kalkar. İçerik silinmez, burada durur.
