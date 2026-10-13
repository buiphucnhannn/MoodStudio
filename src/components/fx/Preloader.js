"use client";

import { useEffect, useState } from "react";
import { cn, lockScroll } from "@/lib/utils";

/**
 * Màn chào khi TẢI TRANG (lần đầu vào, F5): phủ kín toàn màn hình, nằm TRÊN header (z-[200]).
 *
 * 1. show  — nền kem đặc; chữ MOOD / STUDIO trồi lên từ dưới khe che (mask), dòng phụ hiện dần, vạch nạp chạy.
 * 2. leave — hai lớp màn (hồng trước, kem sau) kéo lên khỏi màn hình, mép dưới cong như tấm vải;
 *            cùng lúc header + nội dung trang trồi lên từ dưới (class .page-rise, CSS trong globals.css).
 * 3. done  — gỡ màn chào khỏi DOM.
 *
 * Trong lúc hiện: khoá cuộn. Khi bắt đầu kéo lên: thêm class is-ready trên <html> + phát "mood:ready" để Hero mở màn.
 * Chuyển trang nội bộ không chạy lại (component nằm trong layout gốc).
 */
const SHOW_MS = 1500;
const LEAVE_MS = 1300;

export default function Preloader({ caption }) {
  const [state, setState] = useState("show"); // show | leave | done

  useEffect(() => {
    lockScroll(true);
    const rise = () => {
      // header + main trồi lên cùng lúc màn kéo lên; gỡ class khi xong để không giữ transform (ảnh hưởng sticky)
      const els = document.querySelectorAll("body > header, body > main");
      els.forEach((el) => el.classList.add("page-rise"));
      return setTimeout(
        () => els.forEach((el) => el.classList.remove("page-rise")),
        LEAVE_MS + 400,
      );
    };
    let t3;
    const t1 = setTimeout(() => {
      setState("leave");
      lockScroll(false);
      document.documentElement.classList.add("is-ready");
      window.dispatchEvent(new Event("mood:ready"));
      t3 = rise();
    }, SHOW_MS);
    const t2 = setTimeout(() => setState("done"), SHOW_MS + LEAVE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      lockScroll(false);
    };
  }, []);

  if (state === "done") return null;
  const leaving = state === "leave";

  // Một lớp màn: khối đặc phủ kín + "đuôi" hình elip bên dưới → khi kéo lên, mép dưới cong mềm
  const curtain = (bg, delay, z) => (
    <div
      className={cn(
        "absolute inset-0 transition-transform duration-[1100ms] ease-expo will-change-transform",
        z,
        leaving ? "-translate-y-[125%]" : "translate-y-0",
      )}
      style={{ transitionDelay: leaving ? `${delay}ms` : "0ms" }}
    >
      <div className={cn("absolute inset-0", bg)} />
      <div
        className={cn(
          "absolute inset-x-[-10%] top-[calc(100%-1px)] h-[22vh] rounded-b-[50%] transition-[height] duration-[1100ms] ease-expo",
          bg,
          leaving ? "h-[22vh]" : "h-0",
        )}
        style={{ transitionDelay: leaving ? `${delay}ms` : "0ms" }}
      />
    </div>
  );

  // Chữ trồi lên từ dưới khe che (overflow-hidden) — mỗi dòng trễ hơn một chút
  const line = (text, delay, cls) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <span
        className={cn("block [animation:riseIn_1.1s_cubic-bezier(.22,1,.36,1)_both]", cls)}
        style={{ animationDelay: `${delay}ms` }}
      >
        {text}
      </span>
    </span>
  );

  return (
    <div aria-hidden className="fixed inset-0 z-[200] overflow-hidden">
      {curtain("bg-blush-200", 120, "z-0")}
      {curtain("bg-cream", 0, "z-10")}

      {/* nội dung màn chào nằm trên lớp kem, đi lên nhanh hơn màn và mờ dần → cảm giác chiều sâu */}
      <div
        className={cn(
          "absolute inset-0 z-20 flex flex-col items-center justify-center bg-glow transition-all duration-700 ease-expo",
          leaving ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <p className="flex items-baseline gap-[0.18em] font-serif text-[2.6rem] leading-none font-medium tracking-[0.12em] text-ink uppercase sm:text-[3.6rem] lg:text-[4.4rem]">
          {line("Mood", 100)}
          {line(".", 220, "text-rose")}
          {line("Studio", 300)}
        </p>
        <span className="mt-5 block overflow-hidden">
          <span className="block [animation:riseIn_1s_cubic-bezier(.22,1,.36,1)_.55s_both] text-[10px] tracking-[0.45em] text-ink-muted uppercase sm:text-[11px]">
            {caption}
          </span>
        </span>
        <span className="relative mt-8 block h-px w-32 overflow-hidden bg-ink/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left [animation:loadbar_1.3s_cubic-bezier(.65,0,.35,1)_.2s_both] bg-rose" />
        </span>
      </div>
    </div>
  );
}
