import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { concepts, getConcept, getCollection, pricing, conceptsPage, ui } from "@/data/site";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import SplitText from "@/components/fx/SplitText";
import Parallax from "@/components/fx/Parallax";
import Petals from "@/components/fx/Petals";
import AlbumGallery from "@/components/gallery/AlbumGallery";
import CollageCta from "@/components/sections/CollageCta";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { vnd } from "@/lib/utils";

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.tagline,
    alternates: { canonical: `/concept/${c.slug}` },
    openGraph: { images: [c.cover] },
  };
}

/**
 * Chi tiết concept: hero 2 cột (chữ + ảnh vòm parallax), điểm nổi bật, album ảnh liên quan,
 * nút "Chọn concept này" mở popup đặt lịch với concept chọn sẵn, bảng giá, concept tiếp theo.
 *
 * Trang KHÔNG await `params` trực tiếp mà truyền promise xuống <ConceptContent> trong <Suspense>:
 * Cache Components + Partial Prefetching cần phần "app shell" không phụ thuộc URL để điều hướng tức thì
 * (xem insight "URL data outside of Suspense"). Các slug trong generateStaticParams vẫn được prerender đầy đủ.
 */
export default function ConceptDetailPage({ params }) {
  return (
    <Suspense fallback={<ConceptSkeleton />}>
      <ConceptContent params={params} />
    </Suspense>
  );
}

// Khung giữ chỗ cùng chiều cao hero để không giật bố cục trong lúc nội dung theo URL đang tải
function ConceptSkeleton() {
  return (
    <section className="relative min-h-[calc(var(--screen)*0.8)] overflow-hidden bg-cream bg-glow pt-32 sm:pt-40">
      <Container wide className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div className="space-y-5">
          <div className="h-3 w-40 rounded-full bg-blush-100" />
          <div className="h-14 w-3/4 rounded-2xl bg-blush-100" />
          <div className="h-5 w-2/3 rounded-full bg-blush-100" />
          <div className="h-24 w-full rounded-2xl bg-blush-50" />
        </div>
        <div className="mx-auto aspect-[4/5.2] w-full max-w-[460px] arch bg-blush-100" />
      </Container>
    </section>
  );
}

async function ConceptContent({ params }) {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) notFound();
  const album = getCollection(c.album);
  const i = concepts.findIndex((x) => x.slug === slug);
  const next = concepts[(i + 1) % concepts.length];
  const photos = album.images.map((img) => ({
    ...img,
    collection: album.slug,
    collectionName: album.name,
  }));

  return (
    <>
      <section className="relative overflow-hidden bg-cream bg-glow pt-32 pb-16 sm:pt-40 lg:pb-24">
        <Petals count={5} />
        <Container
          wide
          className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16"
        >
          <div>
            <nav
              className="reveal flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink-muted uppercase"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-ink">
                {ui.home}
              </Link>
              <span>/</span>
              <Link href="/concept" className="hover:text-ink">
                {ui.concepts}
              </Link>
              <span>/</span>
              <span className="text-rose">{String(i + 1).padStart(2, "0")}</span>
            </nav>
            <p className="reveal mt-6 eyebrow" style={{ "--reveal-delay": "80ms" }}>
              {c.short}
            </p>
            <SplitText
              as="h1"
              text={c.name}
              className="mt-3 h-display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem]"
            />
            <p
              className="reveal mt-5 font-serif text-xl text-rose-deep italic sm:text-2xl"
              style={{ "--reveal-delay": "200ms" }}
            >
              {c.tagline}
            </p>
            <p
              className="reveal mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base"
              style={{ "--reveal-delay": "260ms" }}
            >
              {c.desc}
            </p>

            <ul className="reveal mt-7 space-y-2.5" style={{ "--reveal-delay": "320ms" }}>
              {c.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush-100 text-rose-deep">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <p
              className="reveal mt-5 rounded-2xl border border-rose/15 bg-white/60 px-5 py-4 text-sm text-ink-soft"
              style={{ "--reveal-delay": "380ms" }}
            >
              <span className="font-medium text-ink">Phù hợp với: </span>
              {c.forWho}
            </p>

            <div
              className="reveal mt-8 flex max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--reveal-delay": "440ms" }}
            >
              <button
                type="button"
                data-booking={c.slug}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition hover:bg-plum max-sm:min-h-12 max-sm:pr-14 sm:justify-start"
              >
                {ui.chooseConcept}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose text-white transition-transform group-hover:translate-x-0.5 max-sm:absolute max-sm:right-1.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <Button href="/#pricing" variant="outline">
                Xem bảng giá
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <Parallax
              speed={0.08}
              className="reveal relative aspect-[4/5.2] overflow-hidden arch bg-blush-100 shadow-soft"
              data-reveal="clip"
            >
              <Pic
                src={c.cover}
                alt={c.name}
                fill
                preload
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
                style={{ objectPosition: c.coverPos }}
              />
            </Parallax>
            <div aria-hidden className="absolute -inset-3 -z-10 arch border border-rose/30" />
          </div>
        </Container>
      </section>

      <section className="bg-blush-50 section-y">
        <Container wide>
          {/* Lưới 2 cột: nút nằm cùng hàng với tiêu đề (hàng 2) và căn giữa theo chiều dọc → tâm nút ngang tâm tiêu đề */}
          <div className="grid gap-x-10 md:grid-cols-[1fr_auto]">
            <p className="reveal eyebrow">Album liên quan</p>
            <h2
              className="reveal mt-3 h-display text-[2rem] sm:text-[2.6rem] md:col-start-1"
              style={{ "--reveal-delay": "80ms" }}
            >
              {album.name}
            </h2>
            <p
              className="reveal mt-3 max-w-xl text-sm text-ink-soft md:col-start-1"
              style={{ "--reveal-delay": "160ms" }}
            >
              {album.desc}
            </p>
            <Button
              href={`/bo-suu-tap/${album.slug}`}
              variant="outline"
              arrow
              className="reveal mt-6 justify-self-start md:col-start-2 md:row-start-2 md:mt-3 md:self-center"
              style={{ "--reveal-delay": "200ms" }}
            >
              {ui.viewAlbum} · {album.images.length} {ui.photos}
            </Button>
          </div>
          {/* chỉ xem trước 6 ảnh; album đầy đủ nằm ở trang bộ sưu tập */}
          <div className="mt-10">
            <AlbumGallery
              photos={photos.slice(0, 6)}
              collections={[]}
              ui={ui}
              showFilter={false}
              columns={3}
            />
          </div>
        </Container>
      </section>

      {/* Tóm tắt giá: 3 gói một dòng, bấm → trang chủ cuộn tới bảng giá đầy đủ */}
      <section className="bg-cream section-y">
        <Container wide className="space-y-6">
          <div className="reveal flex flex-col gap-6 rounded-[1.75rem] border border-rose/15 bg-white/70 p-7 backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:p-9">
            <div className="max-w-sm">
              <p className="eyebrow">{pricing.eyebrow}</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">{pricing.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{pricing.note}</p>
            </div>
            <dl className="grid flex-1 gap-4 sm:grid-cols-3 lg:max-w-xl">
              {pricing.plans.map((p) => (
                <div
                  key={p.slug}
                  className={`rounded-2xl p-4 ${p.featured ? "bg-plum text-white" : "bg-blush-50 text-ink"}`}
                >
                  <dt className="text-[11px] tracking-[0.2em] uppercase opacity-70">{p.name}</dt>
                  <dd className="mt-1 font-serif text-2xl">{vnd(p.price)}</dd>
                </div>
              ))}
            </dl>
            <Button
              href="/#pricing"
              variant="outline"
              arrow
              className="shrink-0 self-start lg:self-center"
            >
              Xem bảng giá đầy đủ
            </Button>
          </div>

          <Link
            href={`/concept/${next.slug}`}
            className="group relative block overflow-hidden rounded-[1.75rem] bg-plum"
          >
            <div className="relative h-[280px] sm:h-[340px]">
              <Pic
                src={next.cover}
                alt={next.name}
                fill
                sizes="100vw"
                className="object-cover opacity-60 transition-transform duration-[1400ms] group-hover:scale-105"
                style={{ objectPosition: next.coverPos }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-plum/90 via-plum/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white sm:p-14">
              <p className="eyebrow text-blush-200">{ui.nextConcept}</p>
              <p className="mt-3 font-serif text-4xl sm:text-5xl">{next.name}</p>
              <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-ink">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <CollageCta cta={conceptsPage.cta} site={siteConfig} ui={ui} preset={c.slug} />
    </>
  );
}
