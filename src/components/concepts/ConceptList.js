import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { cn, toneBg } from "@/lib/utils";

/**
 * 5 concept: mỗi concept một hàng, ảnh dọc và chữ xen kẽ trái/phải (editorial zig-zag),
 * số thứ tự lớn mờ phía sau, 3 điểm nổi bật + nút Chọn concept (popup chọn sẵn) / Xem chi tiết / Xem album.
 */
export default function ConceptList({ concepts, list, collections, tone = "blush" }) {
  const albumName = (slug) => collections.find((c) => c.slug === slug)?.name;

  return (
    <section
      id="danh-sach"
      className={cn("relative isolate overflow-hidden section-y", toneBg[tone])}
    >
      <Container wide>
        <div className="max-w-2xl">
          <p className="reveal eyebrow">{list.eyebrow}</p>
          <SplitText
            text={list.title}
            className="mt-4 h-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem]"
          />
        </div>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {concepts.map((c, i) => {
            const flip = i % 2 === 1;
            const n = String(i + 1).padStart(2, "0");
            return (
              <article
                key={c.slug}
                id={c.slug}
                className={cn(
                  "relative grid scroll-mt-28 items-center gap-10 lg:gap-16 xl:gap-20",
                  flip
                    ? "lg:grid-cols-[1.1fr_0.9fr] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[0.9fr_1.1fr]",
                )}
              >
                {/* Ảnh */}
                <Link
                  href={`/concept/${c.slug}`}
                  className={cn(
                    "reveal group relative mx-auto block aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[2rem] bg-blush-100 shadow-card lg:mx-0",
                    flip && "lg:ml-auto",
                  )}
                  data-reveal="clip"
                >
                  <Pic
                    src={c.cover}
                    alt={c.name}
                    fill
                    sizes="(min-width:1024px) 34vw, 90vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: c.coverPos }}
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.25em] text-ink uppercase backdrop-blur lg:text-[10px]">
                    {c.short}
                  </span>
                  <span className="absolute right-5 bottom-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink opacity-0 transition group-hover:opacity-100">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Link>

                {/* Chữ */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-4 hidden font-serif text-[12rem] leading-none text-rose/[0.08] select-none lg:block"
                  >
                    {n}
                  </span>
                  <div className="relative">
                    <p className="reveal eyebrow">
                      {n} · {c.short}
                    </p>
                    <h3
                      className="reveal mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.4rem]"
                      style={{ "--reveal-delay": "80ms" }}
                    >
                      {c.name}
                    </h3>
                    <p
                      className="reveal mt-2 font-serif text-lg text-rose-deep italic"
                      style={{ "--reveal-delay": "120ms" }}
                    >
                      {c.tagline}
                    </p>
                    <p
                      className="reveal mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft"
                      style={{ "--reveal-delay": "160ms" }}
                    >
                      {c.desc}
                    </p>
                    <ul className="reveal mt-6 space-y-2.5" style={{ "--reveal-delay": "240ms" }}>
                      {c.highlights.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="reveal mt-8 flex flex-wrap gap-3"
                      style={{ "--reveal-delay": "320ms" }}
                    >
                      <button
                        type="button"
                        data-booking={c.slug}
                        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-plum"
                      >
                        {list.book}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <Link
                        href={`/concept/${c.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[13px] font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {list.detail}
                      </Link>
                      {albumName(c.album) && (
                        <Link
                          href={`/bo-suu-tap/${c.album}`}
                          className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-medium text-ink-soft underline decoration-rose/40 underline-offset-4 transition hover:text-ink hover:decoration-rose"
                        >
                          {list.album}: {albumName(c.album)}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
