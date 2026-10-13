// Nội dung landing page — tách khỏi component để dễ chỉnh sửa / thay bằng CMS sau này.

export const hero = {
  badge: "Studio sáng tạo #1 cho thương hiệu trẻ",
  title: "Biến cảm xúc thành",
  highlight: "trải nghiệm thương hiệu",
  description:
    "Chúng tôi thiết kế nhận diện, website và nội dung giúp thương hiệu của bạn được nhớ đến — không chỉ được nhìn thấy.",
  primaryCta: { label: "Bắt đầu dự án", href: "#contact" },
  secondaryCta: { label: "Xem dịch vụ", href: "#features" },
  image: { src: "/images/hero/hero-illustration.svg", alt: "Minh hoạ MoodStudio" },
  stats: [
    { value: "120+", label: "Dự án hoàn thành" },
    { value: "98%", label: "Khách hàng hài lòng" },
    { value: "6 năm", label: "Kinh nghiệm" },
  ],
};

export const features = [
  {
    icon: "/images/features/branding.svg",
    title: "Nhận diện thương hiệu",
    description: "Logo, bảng màu, typography và guideline đồng bộ trên mọi điểm chạm.",
  },
  {
    icon: "/images/features/web.svg",
    title: "Thiết kế & phát triển web",
    description: "Website nhanh, chuẩn SEO, tối ưu chuyển đổi trên mọi thiết bị.",
  },
  {
    icon: "/images/features/content.svg",
    title: "Sản xuất nội dung",
    description: "Hình ảnh, video và copywriting mang đúng “mood” của thương hiệu.",
  },
];

export const processSteps = [
  { step: "01", title: "Khám phá", description: "Lắng nghe mục tiêu, khách hàng và đối thủ của bạn." },
  { step: "02", title: "Định hướng", description: "Xây dựng moodboard và chiến lược sáng tạo." },
  { step: "03", title: "Thực thi", description: "Thiết kế, phát triển và tinh chỉnh theo phản hồi." },
  { step: "04", title: "Bàn giao", description: "Bàn giao đầy đủ tài nguyên và hỗ trợ sau dự án." },
];

export const testimonials = [
  {
    quote: "MoodStudio hiểu thương hiệu của chúng tôi hơn cả chính chúng tôi. Doanh thu online tăng 40% sau 3 tháng.",
    name: "Nguyễn Minh Anh",
    role: "CEO, Lumi Coffee",
    avatar: "/images/avatars/avatar-1.svg",
  },
  {
    quote: "Quy trình rõ ràng, đúng tiến độ và cực kỳ tận tâm. Website mới nhận được rất nhiều lời khen.",
    name: "Trần Quốc Bảo",
    role: "Founder, Bloom Spa",
    avatar: "/images/avatars/avatar-2.svg",
  },
  {
    quote: "Bộ nhận diện mới giúp chúng tôi tự tin bước ra thị trường quốc tế.",
    name: "Lê Thu Hà",
    role: "Marketing Lead, Nova Tech",
    avatar: "/images/avatars/avatar-3.svg",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "15tr",
    period: "/dự án",
    description: "Phù hợp cho thương hiệu mới khởi đầu.",
    features: ["Logo & bảng màu", "Landing page 1 trang", "2 vòng chỉnh sửa"],
    cta: "Chọn gói Starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "45tr",
    period: "/dự án",
    description: "Giải pháp toàn diện cho doanh nghiệp đang phát triển.",
    features: ["Bộ nhận diện đầy đủ", "Website tới 8 trang", "Bộ ảnh sản phẩm", "Hỗ trợ 3 tháng"],
    cta: "Chọn gói Growth",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Liên hệ",
    period: "",
    description: "Tuỳ chỉnh theo nhu cầu của tổ chức lớn.",
    features: ["Chiến lược thương hiệu", "Hệ thống web tuỳ biến", "Đội ngũ riêng", "SLA cam kết"],
    cta: "Liên hệ tư vấn",
    featured: false,
  },
];

export const faqs = [
  {
    question: "Một dự án thường kéo dài bao lâu?",
    answer: "Tuỳ quy mô, dự án landing page mất 2–3 tuần, bộ nhận diện đầy đủ khoảng 4–6 tuần.",
  },
  {
    question: "Tôi có được sở hữu toàn bộ file thiết kế không?",
    answer: "Có. Sau khi thanh toán, bạn nhận đầy đủ file gốc và toàn quyền sử dụng.",
  },
  {
    question: "MoodStudio có hỗ trợ sau khi bàn giao không?",
    answer: "Mọi gói đều có thời gian hỗ trợ miễn phí, sau đó bạn có thể chọn gói bảo trì linh hoạt.",
  },
  {
    question: "Thanh toán như thế nào?",
    answer: "Thanh toán theo 2–3 đợt gắn với các mốc tiến độ, minh bạch trong hợp đồng.",
  },
];

export const cta = {
  title: "Sẵn sàng tạo nên “mood” cho thương hiệu?",
  description: "Đặt lịch tư vấn miễn phí 30 phút cùng đội ngũ của chúng tôi.",
  action: { label: "Đặt lịch tư vấn", href: "mailto:hello@moodstudio.vn" },
};
