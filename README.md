# MoodStudio — Landing Page

Next.js 16 (App Router) · Tailwind CSS v4 · JavaScript

## Bắt đầu

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # build production
npm run start      # chạy bản build
npm run lint
```

## Cấu trúc thư mục

```
public/
  images/
    brand/         logo, nhận diện
    hero/          ảnh/minh hoạ khu vực hero
    features/      icon dịch vụ
    avatars/       ảnh khách hàng (testimonials)
src/
  app/             routing & SEO: layout, page, not-found, robots, sitemap, icon, opengraph-image
  components/
    layout/        Header, Footer — dùng chung mọi trang
    sections/      các khối của landing page (Hero, Features, Pricing, ...)
    ui/            component nhỏ tái sử dụng (Button, Container, Section, ...)
  config/site.js   thông tin site: tên, URL, liên hệ, menu
  data/landing.js  toàn bộ nội dung text của landing page
  lib/utils.js     helper (cn: gộp className Tailwind)
```

## Quy ước

- **Sửa nội dung**: chỉ cần sửa `src/data/landing.js` và `src/config/site.js`, không đụng component.
- **Màu & font**: khai báo token trong `@theme` ở `src/app/globals.css` (`brand-*`, `accent-*`, `ink`, `muted`, `line`, `canvas`, `surface`).
- **Thêm section**: tạo file trong `components/sections/`, export trong `sections/index.js`, thêm vào `app/page.js`.
- **Server vs Client**: mặc định là Server Component. Chỉ thêm `"use client"` khi cần state/sự kiện (ví dụ `Header`).
- **Ảnh**: đặt trong `public/images/<nhóm>/`, dùng `next/image` với đường dẫn `/images/...`.
- Import dùng alias `@/` (trỏ tới `src/`).
