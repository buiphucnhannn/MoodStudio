"use client";

import { useCallback, useEffect, useState } from "react";
import Pic from "@/components/ui/Pic";
import Logo from "@/components/ui/Logo";
import BookingForm from "./BookingForm";
import { Check, Close } from "@/components/ui/Icons";
import { lockScroll } from "@/lib/utils";

/**
 * Popup đặt lịch dùng chung toàn site.
 * Mở bằng bất kỳ phần tử nào có thuộc tính data-booking:
 *   data-booking            → mở trống
 *   data-booking="co-trang" → chọn sẵn concept
 *   data-plan="signature"   → chọn sẵn gói
 */
export default function BookingModal({ booking, concepts, plans, site }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState({});

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-booking]");
      if (!el) return;
      e.preventDefault();
      setPreset({
        concept: el.getAttribute("data-booking") || "",
        plan: el.getAttribute("data-plan") || "",
      });
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={booking.title}
    >
      <div
        className="absolute inset-0 [animation:fadeIn_.4s_ease-out_both] bg-plum/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative grid max-h-[calc(100svh-1.5rem)] w-full max-w-[980px] [animation:popIn_.55s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-[1.75rem] bg-cream shadow-soft sm:max-h-[92svh] lg:grid-cols-[0.42fr_0.58fr] lg:rounded-[2rem]">
        {/* Cột ảnh (desktop) */}
        <div className="relative hidden lg:block">
          <Pic
            src={booking.image.src}
            alt=""
            fill
            sizes="420px"
            className="object-cover"
            style={{ objectPosition: booking.image.pos }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-plum/10" />
          <div className="absolute inset-x-0 bottom-0 px-8 pt-8 pb-12 text-white">
            <p className="font-serif text-[1.7rem] leading-tight whitespace-pre-line">
              {booking.headline}
            </p>
            <ul className="mt-4 space-y-2">
              {booking.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-white/85">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blush-200" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cột form — data-lenis-prevent: Lenis không chặn cuộn bên trong popup */}
        <div
          data-lenis-prevent
          className="relative no-scrollbar overflow-y-auto overscroll-contain px-5 pt-6 pb-5 sm:px-9 sm:py-8 tall:pt-8 tall:pb-7"
        >
          <button
            onClick={close}
            aria-label="Đóng"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink sm:top-4 sm:right-4"
          >
            <Close className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <Logo className="text-base sm:text-lg" />
            <h3 className="mt-1.5 font-serif text-[1.5rem] leading-tight text-ink sm:mt-4 sm:text-[2.2rem] max-sm:tall:mt-2.5 max-sm:tall:text-[1.75rem]">
              {booking.title}
            </h3>
            <p className="mt-1 max-w-sm text-[12.5px] leading-snug text-ink-soft sm:mt-2 sm:text-[13.5px] sm:leading-relaxed">
              {booking.desc}
            </p>
          </div>

          <div className="mt-4 sm:mt-6 tall:mt-6">
            <BookingForm
              key={`${preset.concept}-${preset.plan}`}
              booking={booking}
              concepts={concepts}
              plans={plans}
              site={site}
              preset={preset}
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
}
