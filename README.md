# MOOD Studio — Landing Page (Next.js 16 + Tailwind CSS v4 + JavaScript)

Website giới thiệu **MOOD Studio** (TP. Hồ Chí Minh) — studio chụp ảnh concept cá nhân, nghệ thuật, cổ trang, chân dung
và theo chủ đề riêng. Làm theo brief trong `docs/demo.docx`: tông **hồng pastel – trắng kem – be**, phong cách
Feminine · Elegant · Artistic. Cấu trúc & hiệu ứng (header kính mờ, cuộn mượt Lenis) tham khảo project Bụt Studio.

## 1. Chạy project

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL = domain thật khi deploy; ADMIN_KEY = mật khẩu trang quản lý
npm run dev                  # http://localhost:3000
npm run build && npm start
```

| Script                 | Mô tả                       |
| ---------------------- | --------------------------- |
| `npm run dev`          | Môi trường phát triển       |
| `npm run build`        | Build production            |
| `npm run start`        | Chạy bản build              |
| `npm run lint`         | ESLint                      |
| `npm run format`       | Prettier (tự sắp xếp class) |

## 2. Các trang (theo chức năng trong brief)

| Chức năng brief            | Đường dẫn                 | Ghi chú                                                     |
| -------------------------- | ------------------------- | ----------------------------------------------------------- |
| Trang chủ                  | `/`                       | Hero → Marquee → Giới thiệu → Concept → USP → Bộ sưu tập → **Bảng giá** → Quy trình → Cảm nhận → **Liên hệ** |
| Giới thiệu                 | `/gioi-thieu`             |                                                             |
| Danh sách concept          | `/concept`                | trang riêng: hero 3 ảnh so le → 5 concept zig-zag → chọn theo dịp → FAQ → CTA ghép ảnh |
| Chi tiết concept           | `/concept/[slug]`         | mô tả, điểm nổi bật, album liên quan, tóm tắt giá, nút **Chọn concept** |
| Bộ sưu tập ảnh             | `/bo-suu-tap`, `/bo-suu-tap/[slug]` | danh sách: hero nền cột ảnh trôi + thẻ bộ sưu tập; chi tiết: hero tạp chí, album đầy đủ + lightbox, bộ tiếp theo |
| Bảng giá theo gói          | `/#pricing`               | section trang chủ; link từ trang khác → chuyển trang mượt rồi cuộn tới |
| Chọn concept / Đặt lịch    | popup toàn site           | mọi phần tử có `data-booking` mở popup (`data-booking="slug"`, `data-plan="slug"` chọn sẵn) |
| Liên hệ, Zalo/Messenger    | `/#contact`, nút nổi      | khối Liên hệ trang chủ + bản đồ ở footer                     |
| Quản lý yêu cầu đặt lịch   | `/admin/dat-lich`         | nhập `ADMIN_KEY`, đổi trạng thái, ghi chú                   |

Liên kết chéo: Concept → "Xem album" (`/bo-suu-tap/[slug]`); Bộ sưu tập → "Xem concept" (`/concept/[slug]`).

## 3. Cấu trúc

```
public/images/
├── blossom/     6 ảnh  — bộ studio hồng pastel (hoa, voan)      ┐ 16 ảnh khách gửi, đã phân loại
└── co-phuc/     10 ảnh — bộ cổ phục Việt, nón quai thao (ngoại cảnh) ┘ đặt tên <nhóm>-<số>.jpg

src/
├── app/
│   ├── layout.js            font, metadata, JSON-LD, Navbar/Footer, Lenis, popup đặt lịch
│   ├── page.js              trang chủ
│   ├── gioi-thieu/ concept/ concept/[slug]/ bo-suu-tap/ bo-suu-tap/[slug]/
│   ├── admin/dat-lich/      trang quản lý yêu cầu (client, cần mật khẩu)
│   ├── api/booking/route.js POST (khách gửi) · GET/PATCH (admin, header x-admin-key)
│   ├── globals.css          Tailwind v4 @theme (màu, font, animation) + reveal/split/marquee/petal
│   └── icon.svg, opengraph-image.js, manifest.js, robots.js, sitemap.js, not-found.js
├── components/
│   ├── fx/        SmoothScroll (Lenis), SplitText, Parallax, Preloader, PageTransition, ScrollTop, Petals
│   ├── layout/    Navbar (pill kính mờ), Footer (bản đồ), FloatingContact (Messenger/Zalo/Gọi)
│   ├── sections/  Hero, Marquee, About, Concepts, Why, Moments, Pricing, Process, Testimonials, Faq, Contact, CollageCta
│   ├── concepts/  ConceptsHero, ConceptList (zig-zag), MoodPicker — trang /concept
│   ├── gallery/   CollectionsHero (cột ảnh trôi), CollectionCards (thẻ bộ sưu tập), AlbumGallery (masonry + lightbox)
│   ├── booking/   BookingModal + BookingForm
│   └── ui/        Button, Container, Icons, Lightbox, Logo, PageHero, Pic, Polaroid, Reveal, SectionHeading
├── config/site.js   thông tin thương hiệu, liên hệ, giờ mở cửa, SEO
├── data/site.js     TOÀN BỘ nội dung text + concept + bộ sưu tập + bảng giá + FAQ
├── hooks/           useReveal, useScrollProgress
└── lib/             utils.js (cn, lockScroll, vnd), bookings.js (kho lưu yêu cầu, file JSON)
```

## 4. Sửa nội dung

| Muốn sửa                           | Ở đâu                                             |
| ---------------------------------- | ------------------------------------------------- |
| SĐT, Zalo, Messenger, địa chỉ, giờ | `src/config/site.js`                              |
| Text từng section, concept, giá    | `src/data/site.js`                                |
| Thêm bộ sưu tập ảnh                | thêm thư mục ảnh + 1 object trong `collections`   |
| Thêm concept                       | 1 object trong `concepts` (trỏ `album` tới bộ ảnh) |
| Màu, font, animation               | khối `@theme` trong `src/app/globals.css`         |
| Thứ tự section trang chủ           | `src/app/page.js`                                 |

`pos` / `coverPos` là `object-position` của ảnh (ảnh chân dung thường để `center 25–35%` để không cắt mặt).

## 5. Hiệu ứng

- **Header**: viên thuốc kính mờ nổi; kính kem chữ mận trên nền sáng, kính tối chữ trắng khi nằm trên section có
  `data-nav-theme="dark"` (khối Liên hệ, Footer). Mobile: menu toàn màn hình.
- **Cuộn mượt**: Lenis (`fx/SmoothScroll.js`, lerp 0.06, wheelMultiplier 0.78) — chậm, có quán tính; anchor `#id`
  cuộn êm; nút lên đầu trang. Popup/lightbox dùng `data-lenis-prevent` + `lockScroll()`.
- **Màn chào**: logo + vạch nạp ~1,2s rồi kéo lên; phát `mood:ready` để hero mở màn đúng lúc.
- **Hero**: khung ảnh vòm xoay vòng 4 ảnh (crossfade + ken burns), 2 polaroid trôi nhẹ, cánh hoa rơi, chữ hiện từng ký tự.
- **Concept**: accordion ngang (rê chuột nở cột); mobile vuốt ngang snap.
- **Bộ sưu tập**: section ghim, dải ảnh chạy ngang theo chiều cuộn (viewport ≤ 1080px cao); màn cao hơn → kéo chuột.
- `.reveal` / `.split` hiện dần khi cuộn tới (`hooks/useReveal.js`, Web Animations API).

## 6. Đặt lịch & quản lý yêu cầu

- Form gửi `POST /api/booking` → lưu vào `data/bookings.json` (gitignore). Nếu API lỗi, nội dung được sao chép vào
  clipboard để khách dán vào Messenger / Zalo.
- `/admin/dat-lich`: nhập `ADMIN_KEY` (đặt trong `.env.local`) → xem, lọc, đổi trạng thái (Mới / Đã xác nhận / Đã chụp / Đã huỷ), ghi chú.
- Lưu file JSON đủ dùng khi self-host (VPS). Lên hosting serverless (Vercel…) cần thay 3 hàm trong
  `src/lib/bookings.js` bằng DB / Google Sheets — API và giao diện giữ nguyên.

## 7. Lưu ý Next.js 16

- Project bật **Cache Components**: không gọi `Date.now()` trực tiếp khi render (xem `layout/CurrentYear.js` dùng `"use cache"`).
- `next/image`: dùng `preload` thay `priority`; `images.qualities` phải khai báo trong `next.config.mjs` (đang dùng 75 & 90).
- `params` của trang động là Promise → phải `await`.

## 8. Cần khách xác nhận

- **Logo chính thức** (link Drive trong brief): hiện dùng logo chữ "MOOD.STUDIO" dựng lại theo watermark trên ảnh
  (`ui/Logo.js`). Khi có file, đặt vào `public/images/brand/` và thay bằng `<Image>`.
- **Địa chỉ cụ thể** và link Google Maps (brief chỉ ghi "MOOD STUDIO - Google Maps", TP. HCM) — `config/site.js`.
- **Giá các gói, dịch vụ thêm, giờ mở cửa, email** đang là giá/giờ đề xuất — `data/site.js`, `config/site.js`.
- **Cảm nhận khách hàng** là nội dung minh hoạ, thay bằng feedback thật.
- Concept *Chân dung* và *Theo chủ đề riêng* chưa có ảnh riêng, đang mượn ảnh 2 bộ sẵn có; bổ sung ảnh để tách album.
- Link Instagram, domain website (để set `NEXT_PUBLIC_SITE_URL`).
