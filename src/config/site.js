/**
 * Thông tin thương hiệu, liên hệ, SEO — theo brief docs/demo.docx.
 */
export const siteConfig = {
  name: "MOOD Studio",
  shortName: "MOOD",
  tagline: "Studio chụp ảnh concept nghệ thuật",
  description:
    "MOOD Studio — studio chụp ảnh concept cá nhân, ảnh nghệ thuật, cổ trang và chân dung tại TP. Hồ Chí Minh. Đầu tư bối cảnh, trang phục, màu sắc và cảm xúc để mỗi bức ảnh mang đúng mood của bạn.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  themeColor: "#fbf6f2",
  keywords: [
    "MOOD Studio",
    "chụp ảnh concept",
    "chụp ảnh nghệ thuật",
    "chụp ảnh cổ trang",
    "chụp ảnh chân dung",
    "studio chụp ảnh Hồ Chí Minh",
    "chụp ảnh sinh nhật",
  ],

  phone: "0866 138 799",
  phoneRaw: "0866138799",
  zalo: "https://zalo.me/0866138799",
  facebook: "https://www.facebook.com/profile.php?id=61592669727656",
  messenger: "https://m.me/61592669727656",
  instagram: "https://www.instagram.com/", // TODO: khách bổ sung link Instagram chính thức
  email: "hello@moodstudio.vn", // TODO: khách xác nhận email

  // TODO: khách xác nhận địa chỉ chính xác (brief chỉ ghi "MOOD STUDIO - Google Maps", TP. Hồ Chí Minh)
  address: "TP. Hồ Chí Minh",
  addressShort: "TP. Hồ Chí Minh",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=MOOD+STUDIO+H%E1%BB%93+Ch%C3%AD+Minh",
  mapsEmbed:
    "https://www.google.com/maps?q=MOOD+STUDIO+H%E1%BB%93+Ch%C3%AD+Minh&z=15&hl=vi&output=embed",

  hours: [
    { days: "Thứ 2 – Thứ 7", time: "09:00 – 19:00" },
    { days: "Chủ nhật", time: "09:00 – 17:00" },
  ],
  hoursShort: "Mở cửa hằng ngày từ 09:00",
  openingHoursSchema: ["Mo,Tu,We,Th,Fr,Sa 09:00-19:00", "Su 09:00-17:00"],
};
