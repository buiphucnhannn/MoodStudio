"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import Polaroid from "@/components/ui/Polaroid";
import SplitText from "@/components/fx/SplitText";
import Petals from "@/components/fx/Petals";
import { cn } from "@/lib/utils";

const TICK = 3800; // đổi ảnh trong khung vòm mỗi 3.8s

/**
 * Hero pastel: chữ serif lớn bên trái, khung ảnh VÒM bên phải xoay vòng ảnh (crossfade + ken burns),
 * 2 polaroid xoè nhẹ quanh khung, cánh hoa rơi, chữ hiện từng ký tự sau màn chào. Parallax nhẹ khi cuộn.
 */
export default function Hero({ hero, ui }) {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const artRef = useRef(null);
  const textRef = useRef(null);

  // Chờ màn chào (Preloader) kéo lên rồi mới chạy hiệu ứng mở màn
  useEffect(() => {
    const on = () => setReady(true);
    const already = document.documentElement.classList.contains("is-ready");
    const fallback = setTimeout(on, already ? 0 : 4000);
    window.addEventListener("mood:ready", on);
    return () => {
      window.removeEventListener("mood:ready", on);
      clearTimeout(fallback);
    };
  }, []);
  const anim = (cls) => (ready ? cls : "opacity-0");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.2) return;
      if (artRef.current)
        artRef.current.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${(y * 0.08).toFixed(1)}px, 0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.8)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % hero.images.length), TICK);
    return () => clearInterval(t);
  }, [ready, hero.images.length]);

  return (
    <section
      id="top"
      className="relative flex min-h-[640px] screen items-center overflow-hidden bg-cream bg-glow pt-28 pb-16 lg:pt-24 lg:pb-10"
    >
      <Petals />
      {/* vòng tròn chữ xoay — chi tiết trang trí kiểu studio */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-[18%] left-[42%] hidden h-36 w-36 animate-spin-slow text-ink/30 lg:block",
          anim("[animation:fadeIn_1.5s_1.8s_both,spin_18s_linear_infinite]"),
        )}
      >
        <defs>
          <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="font-sans text-[11px] tracking-[0.35em] uppercase" fill="currentColor">
          <textPath href="#circ">feminine · elegant · artistic · mood studio ·</textPath>
        </text>
      </svg>

      <Container
        wide
        className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
      >
        <div ref={textRef} className="relative z-10 text-center will-change-transform lg:text-left">
          <p className={cn("eyebrow", anim("[animation:fadeUp_1s_.6s_both]"))}>{hero.eyebrow}</p>
          <SplitText
            as="h1"
            mode="char"
            text={hero.title}
            accent={hero.accent}
            accentClass="italic text-rose-deep"
            visible={ready}
            manual
            step={22}
            baseDelay={800}
            breakBeforeAccent
            className="mt-5 h-display text-[2.6rem] leading-[1.02] min-[380px]:text-[3rem] sm:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.6rem]"
          />
          <p
            className={cn(
              "mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base lg:mx-0",
              anim("[animation:fadeUp_1s_1.6s_both]"),
            )}
          >
            {hero.desc}
          </p>
          <div
            className={cn(
              "mx-auto mt-8 flex w-full max-w-[300px] flex-col items-stretch gap-3 sm:mx-0 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start",
              anim("[animation:fadeUp_1s_1.85s_both]"),
            )}
          >
            <Button href="/concept" variant="pill">
              {ui.explore}
            </Button>
            <Button as="button" variant="outline" data-booking>
              {ui.book}
            </Button>
          </div>
          <ul
            className={cn(
              "mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:justify-start",
              anim("[animation:fadeUp_1s_2.1s_both]"),
            )}
          >
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-rose" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={artRef}
          className="relative mx-auto w-full max-w-[420px] will-change-transform lg:max-w-[480px]"
        >
          {/* khung vòm */}
          <div
            className={cn(
              "relative aspect-[4/5.4] overflow-hidden arch bg-blush-100 shadow-soft",
              ready ? "hero-panel" : "opacity-0",
            )}
          >
            {hero.images.map((s, i) => (
              <div
                key={s.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[1500ms] ease-out",
                  i === idx ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={i !== idx}
              >
                <Pic
                  src={s.src}
                  alt=""
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className={cn("object-cover", i === idx && "animate-kenburns")}
                  style={{ objectPosition: s.pos }}
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 arch ring-1 ring-white/60 ring-inset" />
            {/* chấm chỉ ảnh */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {hero.images.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setIdx(i)}
                  aria-label={`Ảnh ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full bg-white/80 transition-all",
                    i === idx ? "w-5" : "w-1.5 opacity-60",
                  )}
                />
              ))}
            </div>
          </div>
          {/* viền hồng lệch sau khung */}
          <div
            aria-hidden
            className={cn(
              "absolute -inset-3 -z-10 arch border border-rose/30",
              anim("[animation:fadeIn_1.2s_1.4s_both]"),
            )}
          />

          {hero.polaroids.map((p, i) => (
            <div
              key={p.src}
              className={cn(
                "absolute hidden w-[150px] sm:block",
                i === 0 ? "-bottom-6 -left-16 -rotate-[8deg]" : "top-10 -right-14 rotate-[7deg]",
                anim(`[animation:popIn_1s_${1.9 + i * 0.25}s_both]`),
              )}
            >
              <Polaroid p={p} sizes="150px" className="animate-float" />
            </div>
          ))}
        </div>
      </Container>

      <div
        className={cn(
          "absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] tracking-[0.35em] text-ink-muted uppercase lg:flex",
          anim("[animation:fadeUp_1s_2.4s_both]"),
        )}
      >
        {ui.scroll}
        <span className="relative block h-10 w-px overflow-hidden bg-ink/10">
          <span
            className="absolute inset-x-0 top-0 h-1/2 [animation:loadbar_1.6s_ease-in-out_infinite] bg-rose"
            style={{ transformOrigin: "top" }}
          />
        </span>
      </div>
    </section>
  );
}
