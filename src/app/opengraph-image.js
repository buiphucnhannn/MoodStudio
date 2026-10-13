import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ảnh chia sẻ mạng xã hội, sinh lúc build. Muốn dùng ảnh thật: xoá file này, đặt opengraph-image.jpg (1200x630) cùng thư mục.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fbf6f2 0%, #fae3ea 55%, #eadbce 100%)",
        color: "#2b2226",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ fontSize: 110, letterSpacing: 8, display: "flex" }}>
        <span>MOOD</span>
        <span style={{ color: "#d4809b" }}>.</span>
        <span>STUDIO</span>
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 30,
          letterSpacing: 10,
          opacity: 0.7,
          textTransform: "uppercase",
        }}
      >
        Feminine · Elegant · Artistic
      </div>
      <div style={{ marginTop: 40, fontSize: 26, opacity: 0.6 }}>
        {`${siteConfig.tagline} · Hồ Chí Minh`}
      </div>
    </div>,
    size,
  );
}
