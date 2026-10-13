import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge không biết các @utility tự định nghĩa trong globals.css. Mặc định nó đoán `bg-glow` là màu nền
// → coi là xung đột và XOÁ `bg-cream` đứng trước (nền thành trong suốt). Khai báo đúng nhóm để không bị gộp nhầm.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-image": ["bg-glow"],
      "font-size": ["eyebrow"],
    },
  },
});

/** Gộp className và xử lý xung đột class Tailwind. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Khoá/mở cuộn toàn trang (popup, lightbox, menu mobile).
// Khoá trên <html> vì html có overflow-x: clip nên overflow của body không truyền lên viewport.
let lockCount = 0;
export function lockScroll(lock) {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  const html = document.documentElement;
  if (locked) {
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    window.__lenis?.stop();
  } else {
    html.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.__lenis?.start();
  }
}

// Nối 2 từ cuối bằng khoảng trắng không ngắt → đoạn văn không rớt 1 chữ lẻ xuống dòng cuối.
export const noOrphan = (text = "") => text.replace(/ (\S+)$/, " $1");

// Định dạng tiền VND: 1500000 → "1.500.000đ"
export const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

// Nền section theo "tông": trang ghép các section xen kẽ cream ↔ blush để 2 section liền nhau không cùng màu
// (cùng màu → 2 khoảng padding cộng dồn, nhìn như một khoảng trống lớn).
export const toneBg = { cream: "bg-cream", blush: "bg-blush-50" };
