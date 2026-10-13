/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Ẩn nút "N" góc trái khi dev (lỗi compile/runtime vẫn hiện overlay)
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Next 16 bắt buộc khai báo danh sách quality; ảnh studio dùng 90 cho nét
    qualities: [75, 90],
  },
};

export default nextConfig;
