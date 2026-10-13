import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Thẻ bộ sưu tập trên trang /bo-suu-tap: thẻ lớn, ảnh bìa tràn, góc bo lớn. Rê chuột: ảnh phóng nhẹ,
 * dải 3 ảnh xem trước trượt lên từ đáy, vòng mũi tên đổi màu. Bấm → trang chi tiết /bo-suu-tap/[slug].
 */
export default function CollectionCards({ page, collections, concepts, ui }) {
  const conceptOf = (slug) => concepts.find((c) => c.slug === slug);

  return (
    <section className="bg-cream section-y">
      <Container wide>
        <SectionHeading
          eyebrow={page.albumsEyebrow}
          title={page.albumsTitle}
          desc={page.albumsDesc}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {collections.map((c, i) => {
            const concept = conceptOf(c.concept);
            // 3 ảnh xem trước: bỏ ảnh bìa để không lặp
            const preview = c.images.filter((img) => img.src !== c.cover).slice(0, 3);
            return (
              <Link
                key={c.slug}
                href={`/bo-suu-tap/${c.slug}`}
                className="reveal group relative block overflow-hidden rounded-[2rem] bg-blush-100 shadow-card transition-shadow duration-500 hover:shadow-soft"
                style={{ "--reveal-delay": `${i * 120}ms` }}
              >
                <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                  <Pic
                    src={c.cover}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                    style={{ objectPosition: c.coverPos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-plum/25 to-transparent" />
                </div>

                {/* nhãn góc trên */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-ink uppercase backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-ink uppercase backdrop-blur">
                    {c.images.length} {ui.photos}
                  </span>
                </div>

                {/* chữ + dải xem trước */}
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                  <p className="text-[11px] tracking-[0.3em] text-white/70 uppercase">{c.sub}</p>
                  <div className="mt-2 flex items-end justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-[2rem] leading-tight sm:text-[2.4rem]">
                        {c.name}
                      </h3>
                      {concept && (
                        <p className="mt-2 text-sm text-white/80">
                          {page.viewConcept}: <span className="text-blush-200">{concept.name}</span>
                        </p>
                      )}
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="grid max-h-0 grid-cols-3 gap-2 overflow-hidden opacity-0 transition-all duration-700 ease-out group-hover:mt-5 group-hover:max-h-40 group-hover:opacity-100">
                    {preview.map((img) => (
                      <span
                        key={img.src}
                        className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-white/30"
                      >
                        <Pic
                          src={img.src}
                          alt=""
                          fill
                          sizes="120px"
                          className="object-cover"
                          style={{ objectPosition: img.pos }}
                        />
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium tracking-wider text-white/80 uppercase">
                    {page.viewAlbum}
                    <span className="block h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-14" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
