import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { cn } from "@/lib/utils";

/**
 * Hero trang Bộ sưu tập: nền là lưới cột ảnh (ghép từ toàn bộ ảnh của các bộ sưu tập), các cột trôi lên/xuống
 * so le rất chậm; phủ mận đậm dần xuống đáy nơi đặt chữ. Nền tối → header đổi sang kính tối.
 */
export default function CollectionsHero({ hero, collections, ui }) {
  // Chia đều ảnh của mọi bộ sưu tập thành 8 cột, mỗi cột 3 ảnh xếp dọc (lặp lại nếu thiếu)
  const all = collections.flatMap((c) => c.images);
  const COLS = 8;
  const columns = Array.from({ length: COLS }, (_, i) =>
    [0, 1, 2].map((k) => all[(i * 3 + k) % all.length]),
  );

  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex h-[calc(var(--screen)*0.72)] min-h-[500px] items-center overflow-hidden bg-plum"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bleed-cap grid grid-cols-4 gap-2 px-2 md:grid-cols-6 lg:grid-cols-8"
      >
        {columns.map((imgs, i) => (
          <div
            key={i}
            className={cn(
              "relative h-full",
              i >= 6 ? "hidden lg:block" : i >= 4 && "hidden md:block",
            )}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 flex h-[128%] flex-col gap-2",
                i % 2 ? "animate-drift-down" : "animate-drift-up",
              )}
            >
              {imgs.map((img, k) => (
                <div key={k} className="relative flex-1 overflow-hidden rounded-xl">
                  <Pic
                    src={img.src}
                    alt=""
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 13vw, (min-width: 768px) 17vw, 25vw"
                    className="object-cover saturate-[0.85]"
                    style={{ objectPosition: img.pos }}
                    preload={k === 0 && i < 4}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Phủ mận: đậm ở nửa trái (nơi đặt chữ) để tiêu đề trắng luôn nổi trên ảnh sáng, nhạt dần sang phải */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-plum/50" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-plum/90 via-plum/60 to-plum/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-plum/80 via-transparent to-plum/30"
      />

      <Container wide className="text-white">
        <p className="mb-4 text-xs text-white/70 text-legible">
          <Link href="/" className="-my-2 inline-block py-2 hover:text-white">
            {ui.home}
          </Link>
          <span className="mx-2">/</span>
          {hero.eyebrow}
        </p>
        <p className="reveal mb-4 eyebrow text-blush-200 text-legible">{hero.eyebrow}</p>
        <h1
          className="reveal max-w-4xl h-display text-[2.6rem] text-white text-legible-lg sm:text-[3.4rem] lg:text-[4.2rem]"
          style={{ "--reveal-delay": "80ms" }}
        >
          {hero.title} <em className="text-blush-200 italic">{hero.accent}</em>
        </h1>
        <p
          className="reveal mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-white/90 text-legible sm:text-base"
          style={{ "--reveal-delay": "250ms" }}
        >
          {hero.desc}
        </p>
        <ul className="reveal mt-7 flex flex-wrap gap-2" style={{ "--reveal-delay": "350ms" }}>
          {collections.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/bo-suu-tap/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[13px] text-white backdrop-blur transition hover:bg-white hover:text-ink"
              >
                {c.name}
                <span className="text-[11px] opacity-70">
                  {c.images.length} {ui.photos}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
