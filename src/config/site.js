export const siteConfig = {
  name: "MoodStudio",
  description:
    "MoodStudio — studio sáng tạo giúp thương hiệu của bạn kể câu chuyện bằng hình ảnh, cảm xúc và trải nghiệm số.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "vi_VN",
  email: "hello@moodstudio.vn",
  phone: "+84 900 000 000",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

export const navLinks = [
  { label: "Dịch vụ", href: "#features" },
  { label: "Quy trình", href: "#process" },
  { label: "Khách hàng", href: "#testimonials" },
  { label: "Bảng giá", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
