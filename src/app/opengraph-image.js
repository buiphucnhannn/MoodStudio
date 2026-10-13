import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ảnh chia sẻ mạng xã hội, sinh tự động lúc build. Muốn dùng ảnh tĩnh: xoá file này
// và đặt `opengraph-image.png` (1200x630) vào cùng thư mục.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 60%, #ec4899 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 24, fontSize: 36, opacity: 0.85 }}>Creative Studio</div>
      </div>
    ),
    size,
  );
}
