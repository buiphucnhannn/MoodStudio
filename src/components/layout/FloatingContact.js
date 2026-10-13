"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Chat, Close, Messenger, Phone, Zalo } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Cụm nút liên hệ nhanh: Messenger / Zalo / Gọi — hiện sau khi cuộn qua nửa hero.
 * - Từ sm (tablet, desktop): 3 nút tròn xếp dọc như cũ, rê chuột hiện nhãn.
 * - Mobile (< sm): gom thành 1 nút hồng (icon chat) để không che nội dung; chạm vào → 3 kênh bung lên kèm nhãn,
 *   chạm lại / chạm ra ngoài / cuộn / đổi trang → thu lại.
 */
export default function FloatingContact({ site, ui }) {
  const [show, setShow] = useState(false);
  // lưu kèm pathname lúc mở → đổi trang là tự thu lại (không cần setState trong effect)
  const [openAt, setOpenAt] = useState(null);
  const pathname = usePathname();
  const open = openAt === pathname;
  const close = () => setOpenAt(null);

  useEffect(() => {
    let y0 = window.scrollY;
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.5);
      // cuộn quá 80px khi đang mở trên mobile → thu lại
      if (Math.abs(window.scrollY - y0) > 80) {
        y0 = window.scrollY;
        setOpenAt(null);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      href: site.messenger,
      label: ui.chatMessenger,
      Icon: Messenger,
      cls: "bg-[linear-gradient(135deg,#00B2FF_0%,#006AFF_100%)]",
      iconCls: "h-[22px] w-[22px]",
    },
    { href: site.zalo, label: ui.chatZalo, Icon: Zalo, cls: "bg-[#0068FF]", iconCls: "h-7 w-7" },
    {
      href: `tel:${site.phoneRaw}`,
      label: `${ui.callNow} ${site.phone}`,
      Icon: Phone,
      cls: "bg-rose",
      iconCls: "h-5 w-5",
      tel: true,
      pulse: true,
    },
  ];

  return (
    <>
      {/* lớp chạm ra ngoài để thu lại (chỉ mobile, khi đang mở) */}
      {open && (
        <button
          type="button"
          aria-label="Đóng"
          onClick={close}
          className="fixed inset-0 z-30 bg-plum/10 backdrop-blur-[1px] sm:hidden"
        />
      )}

      <div
        className={cn(
          "pointer-events-none fixed right-3 bottom-3 z-40 flex flex-col items-end gap-2 transition-all duration-500 sm:right-4 sm:bottom-4 sm:gap-2.5",
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        {items.map(({ href, label, Icon, cls, iconCls, tel, pulse }, i) => (
          <a
            key={label}
            href={href}
            target={tel ? undefined : "_blank"}
            rel={tel ? undefined : "noopener noreferrer"}
            aria-label={label}
            onClick={close}
            className={cn(
              "group pointer-events-none flex items-center justify-end gap-3 transition-all duration-300 ease-out",
              // mobile: ẩn khi thu gọn, bung lên lần lượt khi mở; sm+: luôn hiện
              open
                ? "translate-y-0 opacity-100"
                : "max-sm:pointer-events-none max-sm:translate-y-4 max-sm:opacity-0",
            )}
            style={{ transitionDelay: open ? `${(items.length - 1 - i) * 50}ms` : "0ms" }}
          >
            <span
              className={cn(
                "pointer-events-none rounded-full bg-ink px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-card transition-all",
                // mobile khi mở: nhãn luôn hiện (không có hover); sm+: chỉ hiện khi rê chuột
                open ? "max-sm:opacity-100" : "max-sm:opacity-0",
                "sm:translate-x-2 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100",
              )}
            >
              {label}
            </span>
            <span className="relative flex h-11 w-11 items-center justify-center">
              {pulse && (
                <span
                  className="pointer-events-none absolute inset-0 hidden [animation:ripple_3s_ease-out_infinite] rounded-full bg-rose/50 sm:block"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-soft transition-transform group-hover:scale-105",
                  show && "sm:pointer-events-auto",
                  show && open && "max-sm:pointer-events-auto",
                  cls,
                )}
              >
                <Icon className={iconCls} />
              </span>
            </span>
          </a>
        ))}

        {/* Nút gom (chỉ mobile) */}
        <button
          type="button"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-label={open ? "Đóng liên hệ nhanh" : "Liên hệ nhanh"}
          aria-expanded={open}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-soft transition-colors sm:hidden",
            show && "pointer-events-auto",
            open ? "bg-ink" : "bg-rose",
          )}
        >
          {!open && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 [animation:ripple_3s_ease-out_infinite] rounded-full bg-rose/50"
            />
          )}
          <span className={cn("relative transition-transform duration-300", open && "rotate-90")}>
            {open ? <Close className="h-5 w-5" /> : <Chat className="h-5 w-5" />}
          </span>
        </button>
      </div>
    </>
  );
}
