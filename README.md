# Serda Ayık Sez — Kişisel Web Sitesi

Yazarlık, blog, kitap ve el emeği atölye ürünlerini bir araya getiren kişisel site.
Saf statik (HTML + CSS + küçük bir JavaScript) — **build adımı yoktur**.

## Sayfalar
- `index.html` — Anasayfa
- `blog.html` — Blog (3 kategori)
  - `blog-yazar-gunlukleri.html` — Yazar Günlüklerim (8 yazı)
  - `blog-okuduklarim-izlediklerim.html` — Okuduklarım & İzlediklerim (yakında)
  - `blog-hobi-gunlukleri.html` — Hobi Günlüklerim (yakında)
  - `yazilar/yazar-not-defteri-1…8.html` — blog yazıları
- `kitabim.html` — Kitabım
- `atolye.html` — Atölye (5 ürün)
- `hakkimda.html` — Hakkımda
- `assets/` — CSS, JS ve web için küçültülmüş görseller

## Cloudflare Pages ile yayınlama
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. GitHub'ı bağla ve `serda-ayik-sez` deposunu seç.
3. Ayarlar:
   - **Framework preset:** None
   - **Build command:** (boş bırak)
   - **Build output directory:** `/`
4. **Save and Deploy.** Site `https://serda-ayik-sez.pages.dev` adresinde yayına girer.
5. (İsteğe bağlı) Kendi alan adın için: Pages projesi → **Custom domains** → alan adını ekle.

Her `git push` sonrası site otomatik güncellenir.

## İçerik ekleme
Yeni blog yazısı, kitap bilgisi veya ürün eklemek istediğinde içerikleri ilet;
sayfalar aynı şablona göre hazırlanır.

- **Kitap:** Kapak görseli + tanıtım yazısı → `kitabim.html`
- **Yeni blog yazısı:** Görsel + başlık + metin → ilgili kategori + `yazilar/` altına yeni sayfa
- **Yeni ürün:** Görsel(ler) + ölçü + açıklama → `atolye.html`

## Görseller hakkında
Sitedeki tüm görseller indirmeye karşı korumalıdır (sağ tık / sürükleme engellenir,
web için küçültülmüş kopyalar kullanılır). Not: hiçbir yöntem %100 koruma sağlamaz;
bu önlemler sıradan indirmeyi caydırır. Tam boyutlu orijinaller `.gitignore` ile
depodan ve yayından dışlanmıştır.
