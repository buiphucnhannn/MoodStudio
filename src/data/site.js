// ============================================================
// TOÀN BỘ nội dung text / ảnh / concept / bảng giá của MOOD Studio.
// Sửa nội dung tại đây, không cần đụng vào component.
// ============================================================

const P = (group, n) => `/images/${group}/${group}-${String(n).padStart(2, "0")}.jpg`;

// ---------- Điều hướng ----------
export const nav = [
  { label: "Về MOOD", href: "/#about" },
  { label: "Concept", href: "/concept" },
  { label: "Bộ sưu tập", href: "/bo-suu-tap" },
  // Bảng giá & Liên hệ là section trên trang chủ: link /#id → chuyển trang mượt rồi cuộn tới đúng chỗ
  { label: "Bảng giá", href: "/#pricing" },
  { label: "Liên hệ", href: "/#contact" },
];

export const ui = {
  book: "Đặt lịch chụp",
  bookFree: "Đặt lịch chụp ngay",
  explore: "Khám phá concept",
  viewAll: "Xem tất cả",
  viewAlbum: "Xem album",
  swipe: "Vuốt ngang để xem thêm →",
  hover: "Rê chuột vào từng cột để khám phá. Mỗi concept là một mood riêng.",
  scroll: "Cuộn",
  home: "Trang chủ",
  concepts: "Concept",
  nextConcept: "Concept tiếp theo",
  chooseConcept: "Chọn concept này",
  photos: "ảnh",
  closeMenu: "Đóng menu",
  openMenu: "Mở menu",
  hotline: "Hotline / Zalo",
  menu: "Menu",
  contact: "Liên hệ",
  map: "Bản đồ",
  directions: "Chỉ đường trên Google Maps",
  openHours: "Giờ mở cửa",
  toTop: "Lên đầu trang",
  all: "Tất cả",
  resetFilters: "Xoá bộ lọc",
  noResults: "Chưa có ảnh phù hợp với bộ lọc này.",
  notFoundTitle: "Không tìm thấy trang",
  notFoundDesc: "Trang bạn tìm không tồn tại hoặc đã được di chuyển.",
  backHome: "Về trang chủ",
  callNow: "Gọi ngay",
  chatMessenger: "Chat Messenger",
  chatZalo: "Chat Zalo",
  priceFrom: "Từ",
  perSession: "/ buổi",
  popular: "Được chọn nhiều",
};

// ---------- Bộ sưu tập (album ảnh thật của studio, dùng đủ 16 ảnh) ----------
// pos = objectPosition; ảnh chân dung thường cần "center 25–35%" để không cắt mặt.
export const collections = [
  {
    slug: "blossom",
    name: "Blossom — Hoa nở trong mơ",
    sub: "Studio · Feminine",
    concept: "concept-ca-nhan",
    desc: "Bộ ảnh studio tông hồng pastel: hoa tươi, voan mỏng, ánh sáng mềm như sương. Dành cho những cô gái muốn lưu lại một phiên bản dịu dàng, nữ tính và rất “mood” của chính mình.",
    cover: P("blossom", 1),
    coverPos: "center 30%",
    images: [
      { src: P("blossom", 1), pos: "center 30%", caption: "Ôm trọn mùa hoa" },
      { src: P("blossom", 2), pos: "center 30%", caption: "Khoảnh khắc khép mi" },
      { src: P("blossom", 3), pos: "center 30%", caption: "Ngoái nhìn" },
      { src: P("blossom", 4), pos: "center 22%", caption: "Voan & hoa" },
      { src: P("blossom", 5), pos: "center 35%", caption: "Nét nghiêng" },
      { src: P("blossom", 6), pos: "center 30%", caption: "Ánh nhìn" },
    ],
  },
  {
    slug: "co-phuc",
    name: "Cổ phục — Nón quai thao",
    sub: "Ngoại cảnh · Cổ trang",
    concept: "co-trang",
    desc: "Áo tấc trắng thêu bướm xanh, nón quai thao kết hoa, chuỗi ngọc và tua đỏ giữa sân đình rêu phong. Một bộ ảnh cổ phục Việt vừa cổ điển vừa thơ, chụp ngoài trời với ánh nắng tự nhiên.",
    cover: P("co-phuc", 3),
    coverPos: "center 28%",
    images: [
      { src: P("co-phuc", 1), pos: "center 30%", caption: "Tiếng đàn bên hiên" },
      { src: P("co-phuc", 2), pos: "center 33%", caption: "Bên hồ sen" },
      { src: P("co-phuc", 3), pos: "center 28%", caption: "Nón quai thao" },
      { src: P("co-phuc", 4), pos: "center 40%", caption: "Voan bay", wide: true },
      { src: P("co-phuc", 5), pos: "center 28%", caption: "Sau tấm voan" },
      { src: P("co-phuc", 6), pos: "center 35%", caption: "Nắng vườn" },
      { src: P("co-phuc", 7), pos: "center 45%", caption: "Cận cảnh", wide: true },
      { src: P("co-phuc", 8), pos: "center 40%", caption: "Trước cổng đình", wide: true },
      { src: P("co-phuc", 9), pos: "center 33%", caption: "Rèm trắng" },
      { src: P("co-phuc", 10), pos: "center 38%", caption: "Cánh voan" },
    ],
  },
];
export const getCollection = (slug) => collections.find((c) => c.slug === slug);
export const allPhotos = collections.flatMap((c) =>
  c.images.map((img) => ({ ...img, collection: c.slug, collectionName: c.name })),
);

// ---------- Concept (5 dịch vụ chính theo brief) ----------
// album: bộ sưu tập ảnh thật liên quan. Concept chưa có ảnh riêng tạm dùng ảnh từ 2 album sẵn có.
export const concepts = [
  {
    slug: "concept-ca-nhan",
    name: "Concept cá nhân",
    short: "Kể câu chuyện của riêng bạn",
    tagline: "Một buổi chụp được thiết kế từ chính cá tính, màu sắc và câu chuyện của bạn.",
    desc: "Mỗi người đều có một “mood” riêng. MOOD cùng bạn chọn bối cảnh, trang phục và tông màu để bộ ảnh không giống bất kỳ ai khác — chỉ là bạn, ở phiên bản tự tin và đẹp nhất.",
    cover: P("blossom", 2),
    coverPos: "center 30%",
    album: "blossom",
    highlights: ["Tư vấn concept 1:1", "Hỗ trợ trang phục & phụ kiện", "Makeup theo tông ảnh"],
    forWho:
      "Sinh nhật, kỷ niệm, ảnh profile, hoặc đơn giản là muốn lưu giữ một phiên bản của mình.",
  },
  {
    slug: "nghe-thuat",
    name: "Ảnh nghệ thuật",
    short: "Ánh sáng, hoa và cảm xúc",
    tagline: "Bộ ảnh fine-art: ánh sáng dịu, chất liệu mềm, bố cục như tranh.",
    desc: "Lấy cảm hứng từ hội hoạ và thời trang, concept nghệ thuật của MOOD chú trọng ánh sáng, chất liệu (voan, hoa, lụa) và biểu cảm. Thành phẩm là những bức ảnh có thể treo lên tường.",
    cover: P("blossom", 5),
    coverPos: "center 35%",
    album: "blossom",
    highlights: ["Set-up ánh sáng fine-art", "Đạo cụ hoa tươi / voan", "Chỉnh màu nghệ thuật"],
    forWho: "Người yêu cái đẹp, muốn một bộ ảnh mang tính thẩm mỹ cao để lưu giữ hoặc trang trí.",
  },
  {
    slug: "co-trang",
    name: "Cổ trang & cổ phục",
    short: "Việt phục, áo tấc, nón quai thao",
    tagline: "Hồn Việt trong từng nếp áo — chụp tại đình, chùa, vườn xưa.",
    desc: "Áo tấc, áo dài ngũ thân, nón quai thao, chuỗi ngọc… MOOD chuẩn bị trọn bộ trang phục và phụ kiện, chọn bối cảnh cổ kính và ánh sáng tự nhiên để bộ ảnh vừa đúng chất xưa vừa mềm mại, thơ mộng.",
    cover: P("co-phuc", 5),
    coverPos: "center 28%",
    album: "co-phuc",
    highlights: [
      "Trọn bộ cổ phục & phụ kiện",
      "Bối cảnh ngoại cảnh cổ kính",
      "Makeup & tóc theo thời kỳ",
    ],
    forWho: "Bạn yêu văn hoá truyền thống, muốn bộ ảnh Tết, lễ hội hay kỷ niệm mang màu sắc Việt.",
  },
  {
    slug: "chan-dung",
    name: "Chân dung",
    short: "Gần, thật và tinh tế",
    tagline: "Những bức chân dung tôn nét đẹp tự nhiên, ánh mắt và nụ cười.",
    desc: "Không cần quá nhiều đạo cụ — chỉ ánh sáng đẹp, một chút hướng dẫn tạo dáng và thời gian để bạn thoải mái. Chân dung tại MOOD mộc mà vẫn tinh tế, dùng được cho mọi mục đích.",
    cover: P("co-phuc", 7),
    coverPos: "center 45%",
    album: "co-phuc",
    highlights: ["Hướng dẫn tạo dáng tận tình", "Retouch tự nhiên", "Giao file nhanh"],
    forWho: "Ảnh profile, CV, mạng xã hội hoặc ảnh gia đình, bạn bè.",
  },
  {
    slug: "theo-chu-de",
    name: "Theo chủ đề riêng",
    short: "Bạn nghĩ ra — MOOD dựng lên",
    tagline: "Từ ý tưởng, moodboard đến bối cảnh — concept hoàn toàn theo yêu cầu.",
    desc: "Bạn có một chủ đề yêu thích: một bộ phim, một mùa trong năm, một màu sắc hay một kỷ niệm? Gửi MOOD moodboard, chúng tôi sẽ dựng bối cảnh, chọn trang phục và lên kịch bản chụp riêng cho bạn.",
    cover: P("co-phuc", 10),
    coverPos: "center 38%",
    album: "co-phuc",
    highlights: [
      "Dựng bối cảnh theo yêu cầu",
      "Moodboard & kịch bản chụp",
      "Chụp nhóm bạn / cặp đôi",
    ],
    forWho: "Nhóm bạn, cặp đôi, hoặc bất kỳ ai có ý tưởng muốn hiện thực hoá.",
  },
];
export const getConcept = (slug) => concepts.find((c) => c.slug === slug);

// ---------- Hero ----------
export const hero = {
  eyebrow: "MOOD Studio · Hồ Chí Minh",
  title: "Lưu giữ mood",
  accent: "đẹp nhất của bạn.",
  desc: "Chụp ảnh concept cá nhân, nghệ thuật, cổ trang và chân dung — đầu tư bối cảnh, trang phục, màu sắc và cảm xúc trong từng khung hình.",
  // ảnh xoay vòng trong khung vòm
  images: [
    { src: P("blossom", 1), pos: "center 25%" },
    { src: P("co-phuc", 3), pos: "center 25%" },
    { src: P("blossom", 6), pos: "center 25%" },
    { src: P("co-phuc", 5), pos: "center 25%" },
  ],
  polaroids: [
    { src: P("blossom", 3), pos: "center 30%", caption: "Blossom" },
    { src: P("co-phuc", 6), pos: "center 35%", caption: "Cổ phục" },
  ],
  badges: ["Concept cá nhân", "Ảnh nghệ thuật", "Cổ trang", "Chân dung"],
};

// ---------- Dải chữ chạy ----------
export const marquee = [
  "Concept cá nhân",
  "Ảnh nghệ thuật",
  "Cổ trang · Cổ phục",
  "Chân dung",
  "Sinh nhật",
  "Theo chủ đề riêng",
];

// ---------- Giới thiệu ----------
export const about = {
  eyebrow: "Về MOOD",
  manifesto: [
    { text: "Mỗi bức ảnh" },
    { text: "là một" },
    { text: "cảm xúc", accent: true },
    { text: "được giữ lại." },
  ],
  paragraphs: [
    "MOOD Studio ra đời từ một niềm tin đơn giản: ai cũng xứng đáng có những bức ảnh thật đẹp về chính mình. Chúng tôi theo đuổi phong cách nữ tính, nghệ thuật và nhẹ nhàng — nơi màu sắc, bối cảnh và trang phục đều phục vụ cho cảm xúc.",
    "Từ hoa tươi, voan mỏng trong studio đến cổ phục Việt giữa sân đình, mỗi concept đều được MOOD đầu tư tỉ mỉ. Portfolio thực tế của chúng tôi luôn cập nhật trên Facebook.",
  ],
  highlights: [
    { value: "5+", label: "concept đang có" },
    { value: "100%", label: "trang phục & phụ kiện có sẵn" },
    { value: "3–5", label: "ngày giao ảnh" },
  ],
  main: { src: P("co-phuc", 2), pos: "center 30%" },
  polaroids: [
    { src: P("blossom", 4), pos: "center 22%", caption: "Blossom" },
    { src: P("co-phuc", 1), pos: "center 30%", caption: "Cổ phục" },
  ],
};

// ---------- Vì sao chọn MOOD ----------
export const why = {
  eyebrow: "Khác biệt",
  title: "Vì sao các cô gái chọn MOOD?",
  items: [
    {
      icon: "sparkle",
      title: "Phong cách riêng",
      desc: "Hình ảnh nghệ thuật, nữ tính, có dấu ấn — không chạy theo khuôn mẫu.",
    },
    {
      icon: "flower",
      title: "Đầu tư bối cảnh",
      desc: "Hoa tươi, voan, trang phục và đạo cụ được chuẩn bị riêng cho từng concept.",
    },
    {
      icon: "palette",
      title: "Màu sắc & cảm xúc",
      desc: "Chỉnh màu theo mood của bộ ảnh, giữ làn da tự nhiên, ánh sáng mềm.",
    },
    {
      icon: "heart",
      title: "Thoải mái như ở nhà",
      desc: "Ekip nữ tận tình hướng dẫn tạo dáng, bạn chỉ cần đến và tận hưởng.",
    },
  ],
};

// ---------- Khoảnh khắc (dải ngang) ----------
export const moments = {
  eyebrow: "Bộ sưu tập",
  title: "Những khoảnh khắc đã được giữ lại",
  hint: "Một vài khung hình từ các buổi chụp gần đây. Cuộn để lướt qua, bấm vào ảnh để xem lớn.",
  items: [
    { src: P("blossom", 1), size: "tall", caption: "Blossom — Ôm trọn mùa hoa" },
    { src: P("co-phuc", 7), size: "wide", caption: "Cổ phục — Cận cảnh" },
    { src: P("co-phuc", 9), size: "tall", caption: "Cổ phục — Rèm trắng" },
    { src: P("blossom", 5), size: "tall", caption: "Blossom — Nét nghiêng" },
    { src: P("co-phuc", 4), size: "wide", caption: "Cổ phục — Voan bay" },
    { src: P("blossom", 4), size: "tall", caption: "Blossom — Voan & hoa" },
    { src: P("co-phuc", 10), size: "tall", caption: "Cổ phục — Cánh voan" },
    { src: P("co-phuc", 8), size: "wide", caption: "Cổ phục — Trước cổng đình" },
  ],
};

// ---------- Bảng giá theo gói ----------
export const pricing = {
  eyebrow: "Bảng giá",
  title: "Gói chụp rõ ràng, không phát sinh",
  desc: "Giá đã gồm studio / bối cảnh, hướng dẫn tạo dáng và chỉnh ảnh. Trang phục & makeup theo từng gói.",
  note: "Giá tham khảo, có thể thay đổi theo concept và số người. Liên hệ để được báo giá chính xác.",
  plans: [
    {
      slug: "basic",
      name: "Mood Basic",
      price: 890000,
      unit: "/ buổi",
      desc: "Chân dung / profile gọn nhẹ trong studio.",
      features: [
        "60 phút chụp tại studio",
        "1 concept, 1 trang phục (tự chuẩn bị)",
        "8 ảnh chỉnh màu + retouch",
        "Giao toàn bộ file gốc",
      ],
      cta: "Chọn gói Basic",
    },
    {
      slug: "signature",
      name: "Mood Signature",
      price: 1890000,
      unit: "/ buổi",
      desc: "Gói được chọn nhiều nhất — concept trọn gói.",
      featured: true,
      features: [
        "120 phút chụp, 1 concept tự chọn",
        "Trang phục & phụ kiện của studio",
        "Makeup + làm tóc theo tông ảnh",
        "15 ảnh chỉnh màu + retouch",
        "Giao toàn bộ file gốc trong 3–5 ngày",
      ],
      cta: "Chọn gói Signature",
    },
    {
      slug: "premium",
      name: "Mood Premium",
      price: 3290000,
      unit: "/ buổi",
      desc: "Cổ trang ngoại cảnh hoặc concept dựng riêng.",
      features: [
        "Nửa ngày chụp, 2 concept / 2 trang phục",
        "Ngoại cảnh hoặc dựng bối cảnh theo yêu cầu",
        "Makeup + tóc + phụ kiện trọn gói",
        "25 ảnh chỉnh màu + retouch",
        "In 1 ảnh khổ A4 làm kỷ niệm",
      ],
      cta: "Chọn gói Premium",
    },
  ],
  addons: [
    { name: "Thêm concept / trang phục", price: "300.000đ" },
    { name: "Thêm người (chụp nhóm / đôi)", price: "250.000đ / người" },
    { name: "Retouch thêm", price: "50.000đ / ảnh" },
    { name: "In ảnh / photobook", price: "Liên hệ", contact: true }, // contact: bấm mở popup đặt lịch / liên hệ
  ],
};

// ---------- Quy trình chụp ----------
export const process = {
  eyebrow: "Hành trình",
  title: "Một buổi chụp tại MOOD diễn ra thế nào?",
  steps: [
    {
      n: "01",
      title: "Chọn concept & đặt lịch",
      desc: "Xem các concept, chọn gói phù hợp và gửi yêu cầu đặt lịch — MOOD xác nhận trong 24h.",
      image: P("blossom", 6),
      pos: "center 30%",
    },
    {
      n: "02",
      title: "Tư vấn & chuẩn bị",
      desc: "Trao đổi moodboard, trang phục, phụ kiện. Studio chuẩn bị bối cảnh trước ngày chụp.",
      image: P("co-phuc", 9),
      pos: "center 33%",
    },
    {
      n: "03",
      title: "Makeup & chụp",
      desc: "Makeup, làm tóc theo tông ảnh rồi vào buổi chụp. Ekip hướng dẫn tạo dáng từng khung hình.",
      image: P("co-phuc", 3),
      pos: "center 28%",
    },
    {
      n: "04",
      title: "Chọn & nhận ảnh",
      desc: "Bạn chọn ảnh yêu thích để retouch. Ảnh hoàn thiện giao online trong 3–5 ngày.",
      image: P("blossom", 2),
      pos: "center 30%",
    },
  ],
};

// ---------- Cảm nhận khách hàng (nội dung minh hoạ — thay bằng feedback thật) ----------
export const testimonials = {
  eyebrow: "Khách hàng nói gì",
  title: "Những lời nhắn sau buổi chụp",
  items: [
    {
      quote:
        "Lần đầu chụp concept mà không thấy ngại chút nào. Chị makeup và chị chụp hướng dẫn rất kỹ, ảnh ra đúng kiểu mình mơ ước luôn.",
      name: "Thu Hà",
      role: "Sinh viên · Concept Blossom",
      avatar: P("blossom", 1),
      pos: "center 20%",
    },
    {
      quote:
        "Bộ cổ phục được chuẩn bị cực kỳ chỉn chu, từ nón quai thao đến chuỗi ngọc. Ảnh ngoại cảnh nắng đẹp, màu phim xinh xỉu.",
      name: "Minh Anh",
      role: "Nhân viên văn phòng · Cổ phục",
      avatar: P("co-phuc", 3),
      pos: "center 20%",
    },
    {
      quote:
        "Chụp ảnh sinh thật ở MOOD là quyết định đúng đắn nhất năm nay. Ảnh vừa nghệ vừa tự nhiên, bạn bè ai cũng hỏi chụp ở đâu.",
      name: "Khánh Linh",
      role: "Freelancer · Ảnh sinh nhật",
      avatar: P("blossom", 6),
      pos: "center 25%",
    },
  ],
};

// ---------- FAQ ----------
export const faqs = [
  {
    q: "Tôi không biết tạo dáng thì có chụp được không?",
    a: "Hoàn toàn được. Ekip MOOD sẽ hướng dẫn từng khung hình, từ ánh mắt đến tay chân. Phần lớn khách của MOOD đều là lần đầu chụp concept.",
  },
  {
    q: "Studio có sẵn trang phục không?",
    a: "Có. Gói Signature và Premium đã bao gồm trang phục & phụ kiện của studio (váy voan, cổ phục, nón quai thao, hoa…). Bạn cũng có thể mang trang phục riêng.",
  },
  {
    q: "Bao lâu thì nhận được ảnh?",
    a: "Ảnh hoàn thiện giao online trong 3–5 ngày làm việc kể từ khi bạn chọn ảnh. Toàn bộ file gốc được gửi ngay sau buổi chụp.",
  },
  {
    q: "Có chụp nhóm bạn hoặc cặp đôi không?",
    a: "Có. Phụ thu 250.000đ / người thêm. Với nhóm từ 4 người, hãy liên hệ để MOOD lên concept và báo giá riêng.",
  },
  {
    q: "Đặt cọc và huỷ lịch thế nào?",
    a: "Đặt cọc 30% để giữ lịch. Dời lịch miễn phí nếu báo trước 48 giờ; huỷ trong vòng 24 giờ sẽ không hoàn cọc.",
  },
];

// ---------- Liên hệ (khối mời gọi cuối trang) ----------
export const contact = {
  script: "Hẹn gặp bạn ở MOOD",
  eyebrow: "Đặt lịch chụp",
  title: "Sẵn sàng cho bộ ảnh của riêng bạn?",
  desc: "Để lại thông tin, MOOD sẽ liên hệ tư vấn concept và xác nhận lịch trong 24 giờ. Hoặc nhắn trực tiếp qua Messenger / Zalo.",
  polaroids: [
    { src: P("blossom", 3), pos: "center 30%", caption: "Blossom" },
    { src: P("co-phuc", 6), pos: "center 35%", caption: "Cổ phục" },
    { src: P("blossom", 5), pos: "center 35%", caption: "Fine-art" },
    { src: P("co-phuc", 1), pos: "center 30%", caption: "Nón quai thao" },
  ],
};

// ---------- Popup / trang đặt lịch ----------
export const booking = {
  title: "Đặt lịch chụp",
  desc: "Điền thông tin bên dưới, MOOD sẽ gọi hoặc nhắn Zalo xác nhận lịch với bạn.",
  headline: "Chọn concept,\nMOOD lo phần còn lại.",
  bullets: ["Xác nhận lịch trong 24h", "Trang phục & makeup có sẵn", "Giao ảnh 3–5 ngày"],
  image: { src: P("blossom", 2), pos: "center 25%" },
  fields: {
    name: "Họ tên",
    phone: "Số điện thoại / Zalo",
    date: "Ngày muốn chụp",
    people: "Số người",
    concept: "Concept",
    plan: "Gói chụp",
    undecided: "Chưa chọn",
    note: "Ghi chú (ý tưởng, trang phục, câu hỏi…)",
    submit: "Gửi yêu cầu đặt lịch",
    sending: "Đang gửi…",
    or: "Hoặc nhắn trực tiếp:",
    privacy: "Thông tin chỉ dùng để liên hệ xác nhận lịch.",
    successTitle: "Đã nhận yêu cầu!",
    success:
      "MOOD sẽ liên hệ xác nhận trong 24 giờ. Muốn nhanh hơn, nhắn ngay qua Messenger hoặc Zalo nhé.",
    error:
      "Không gửi được lúc này. Nội dung đã được sao chép — bạn dán vào Messenger / Zalo giúp MOOD nhé.",
    again: "Gửi yêu cầu khác",
  },
  message: "Xin chào MOOD Studio, mình muốn đặt lịch chụp:",
};

// ---------- Trang Concept (/concept) ----------
export const conceptsPage = {
  meta: {
    title: "Danh sách concept",
    desc: "5 hướng concept chụp ảnh của MOOD Studio: concept cá nhân, nghệ thuật, cổ trang, chân dung và theo chủ đề riêng.",
  },
  hero: {
    eyebrow: "Danh sách concept",
    title: "Chọn mood",
    accent: "cho bộ ảnh của bạn.",
    desc: "5 hướng concept chính của MOOD. Mỗi concept đều có thể tuỳ biến theo màu sắc, trang phục và câu chuyện riêng — bạn chỉ cần chọn mood, MOOD lo phần còn lại.",
    ctaSecondary: "Xem 5 concept",
    script: "feminine · elegant · artistic",
    // 3 ảnh dọc so le bên phải (ảnh giữa cao nhất)
    images: [
      { src: P("co-phuc", 9), pos: "center 30%" },
      { src: P("blossom", 4), pos: "center 22%" },
      { src: P("co-phuc", 5), pos: "center 28%" },
    ],
    stats: [
      { value: "05", label: "concept chính" },
      { value: "02", label: "bộ sưu tập ảnh thật" },
      { value: "1:1", label: "tư vấn moodboard" },
    ],
  },
  list: {
    eyebrow: "5 concept",
    title: "Mỗi concept là một câu chuyện",
    book: "Chọn concept này",
    detail: "Xem chi tiết",
    album: "Xem album",
  },
  // Gợi ý chọn concept theo dịp — khối "mood picker" giúp khách mới dễ quyết định
  picker: {
    eyebrow: "Chưa biết chọn gì?",
    title: "Chọn theo dịp của bạn",
    items: [
      {
        occasion: "Sinh nhật",
        concept: "concept-ca-nhan",
        note: "Một bộ ảnh đánh dấu tuổi mới, đúng cá tính.",
      },
      {
        occasion: "Tết & lễ hội",
        concept: "co-trang",
        note: "Áo tấc, nón quai thao — đậm chất Việt.",
      },
      { occasion: "Ảnh profile / CV", concept: "chan-dung", note: "Gần, thật, dùng được mọi nơi." },
      {
        occasion: "Treo tường / quà tặng",
        concept: "nghe-thuat",
        note: "Fine-art, ánh sáng mềm như tranh.",
      },
      {
        occasion: "Nhóm bạn / cặp đôi",
        concept: "theo-chu-de",
        note: "Dựng concept riêng theo ý tưởng của cả nhóm.",
      },
    ],
  },
  cta: {
    script: "Sẵn sàng chưa?",
    title: "Đã chọn được mood? Đặt lịch ngay hôm nay.",
    desc: "MOOD xác nhận lịch trong 24 giờ. Chưa chắc chọn concept nào — cứ đặt lịch, chúng mình tư vấn miễn phí.",
    bg: [
      { src: P("blossom", 3), pos: "center 30%" },
      { src: P("co-phuc", 2), pos: "center 30%" },
      { src: P("blossom", 5), pos: "center 35%" },
    ],
  },
};

// ---------- Trang Bộ sưu tập (/bo-suu-tap) ----------
export const galleryPage = {
  meta: {
    title: "Bộ sưu tập ảnh",
    desc: "Portfolio ảnh thật của MOOD Studio: bộ Blossom studio hồng pastel và bộ Cổ phục Việt ngoại cảnh.",
  },
  hero: {
    eyebrow: "Bộ sưu tập ảnh",
    title: "Portfolio",
    accent: "của MOOD.",
    desc: "Toàn bộ ảnh thật từ các buổi chụp gần đây, chia theo bộ sưu tập. Bấm vào ảnh để xem lớn, hoặc đi tới concept tương ứng để đặt lịch.",
  },
  albumsEyebrow: "Các bộ sưu tập",
  albumsTitle: "Hai mood, hai thế giới",
  albumsDesc:
    "Mỗi bộ sưu tập là một buổi chụp thật của MOOD — bấm vào để xem trọn album, câu chuyện concept và đặt lịch chụp bộ tương tự.",
  viewAlbum: "Xem album",
  viewConcept: "Xem concept",
  bookThis: "Đặt lịch chụp bộ này",
  // trang chi tiết bộ sưu tập
  detail: {
    aboutEyebrow: "Về bộ sưu tập",
    galleryEyebrow: "Album",
    galleryTitle: "Toàn bộ ảnh",
    galleryHint: "Bấm vào ảnh để xem lớn, phím ← → để chuyển ảnh.",
    nextLabel: "Bộ sưu tập tiếp theo",
    conceptLabel: "Concept",
    photosLabel: "Số ảnh",
    styleLabel: "Phong cách",
  },
  cta: {
    script: "Bộ ảnh tiếp theo là của bạn",
    title: "Muốn có mặt trong bộ sưu tập này?",
    desc: "Chọn concept bạn thích, MOOD chuẩn bị trang phục, bối cảnh và makeup — bạn chỉ cần đến và toả sáng.",
    bg: [
      { src: P("co-phuc", 6), pos: "center 35%" },
      { src: P("blossom", 1), pos: "center 30%" },
      { src: P("co-phuc", 10), pos: "center 38%" },
    ],
  },
};

// ---------- Footer ----------
export const footer = {
  blurb:
    "Studio chụp ảnh concept cá nhân, nghệ thuật, cổ trang và chân dung. Phong cách nữ tính, thanh lịch và nghệ thuật.",
  rights: "Bảo lưu mọi quyền.",
};
