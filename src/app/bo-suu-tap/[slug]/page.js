import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { collections, getCollection, getConcept, galleryPage, ui } from "@/data/site";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import SplitText from "@/components/fx/SplitText";
import Parallax from "@/components/fx/Parallax";
import Petals from "@/components/fx/Petals";
import AlbumGallery from "@/components/gallery/AlbumGallery";
import CollageCta from "@/components/sections/CollageCta";
import { ArrowRight } from "@/components/ui/Icons";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.desc,
    alternates: { canonical: `/bo-suu-tap/${c.slug}` },
    openGraph: { images: [c.cover] },
  };
}

/**
 * Chi tiết bộ sưu tập: hero kiểu tạp chí (ảnh bìa lớn bên trái tràn mép, chữ bên phải) → thông số
 * (concept / số ảnh / phong cách) → album đầy đủ (masonry + lightbox) → bộ sưu tập tiếp theo → CTA.
 * `await params` nằm trong <Suspense> (xem concept/[slug]) để điều hướng tức thì với Cache Components.
 */
export default function CollectionDetailPage({ params }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

function Skeleton() {
  return (
    <section className="min-h-[80vh] bg-cream bg-glow pt-32 sm:pt-40">
      <Container wide className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="aspect-[4/5] w-full rounded-[2rem] bg-blush-100" />
        <div className="space-y-5 lg:pt-10">
          <div className="h-3 w-40 rounded-full bg-blush-100" />
          <div className="h-14 w-3/4 rounded-2xl bg-blush-100" />
          <div className="h-24 w-full rounded-2xl bg-blush-50" />
        </div>
      </Container>
    </section>
  );
}

async function CollectionContent({ params }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const concept = getConcept(c.concept);
  const i = collections.findIndex((x) => x.slug === slug);
  const next = collections[(i + 1) % collections.length];
  const photos = c.images.map((img) => ({ ...img, collection: c.slug, collectionName: c.name }));
  const d = galleryPage.detail;
  const facts = [
    { label: d.conceptLabel, value: concept?.name, href: concept && `/concept/${concept.slug}` },
    { label: d.photosLabel, value: `${c.images.length} ${ui.photos}` },
    { label: d.styleLabel, value: c.sub },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-cream bg-glow pt-28 pb-16 sm:pt-36 lg:pb-24">
        <Petals count={5} />
        <Container
          wide
          className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          {/* Ảnh bìa lớn, góc bo kiểu vòm lệch */}
          <Parallax
            speed={0.06}
            className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] rounded-tr-[8rem] bg-blush-100 shadow-soft lg:-ml-8"
            data-reveal="clip"
          >
            <Pic
              src={c.cover}
              alt={c.name}
              fill
              preload
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: c.coverPos }}
            />
            <span className="absolute top-6 left-6 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.25em] text-ink uppercase backdrop-blur">
              {String(i + 1).padStart(2, "0")} / {String(collections.length).padStart(2, "0")}
            </span>
          </Parallax>

          <div>
            <nav
              className="reveal flex flex-wrap items-center gap-2 text-[11px] tracking-[0.2em] text-ink-muted uppercase"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-ink">
                {ui.home}
              </Link>
              <span>/</span>
              <Link href="/bo-suu-tap" className="hover:text-ink">
                {galleryPage.hero.eyebrow}
              </Link>
            </nav>
            <p className="reveal mt-6 eyebrow" style={{ "--reveal-delay": "80ms" }}>
              {c.sub}
            </p>
            <SplitText
              as="h1"
              text={c.name}
              className="mt-3 h-display text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem]"
            />
            <p
              className="reveal mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base"
              style={{ "--reveal-delay": "220ms" }}
            >
              {c.desc}
            </p>

            <dl
              className="reveal mt-8 grid grid-cols-3 gap-5 border-t border-rose/20 pt-6"
              style={{ "--reveal-delay": "300ms" }}
            >
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] tracking-[0.2em] text-ink-muted uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg leading-snug text-ink sm:text-xl">
                    {f.href ? (
                      <Link
                        href={f.href}
                        className="underline decoration-rose/40 underline-offset-4 hover:decoration-rose"
                      >
                        {f.value}
                      </Link>
                    ) : (
                      f.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ "--reveal-delay": "380ms" }}
            >
              <button
                type="button"
                data-booking={c.concept}
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition hover:bg-plum"
              >
                {galleryPage.bookThis}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              {concept && (
                <Button href={`/concept/${concept.slug}`} variant="outline">
                  {galleryPage.viewConcept}
                </Button>
              )}
            </div>
            {concept && (
              <p
                className="reveal mt-5 font-serif text-lg text-rose-deep italic"
                style={{ "--reveal-delay": "440ms" }}
              >
                “{concept.tagline}”
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-blush-50 py-16 lg:py-24">
        <Container wide>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="reveal eyebrow">{d.galleryEyebrow}</p>
              <h2
                className="reveal mt-3 h-display text-[2rem] sm:text-[2.6rem]"
                style={{ "--reveal-delay": "80ms" }}
              >
                {d.galleryTitle} · {c.images.length} {ui.photos}
              </h2>
            </div>
            <p className="reveal text-xs text-ink-muted" style={{ "--reveal-delay": "160ms" }}>
              {d.galleryHint}
            </p>
          </div>
          <div className="mt-10">
            <AlbumGallery
              photos={photos}
              collections={[]}
              ui={ui}
              showFilter={false}
              columns={photos.length <= 6 ? 3 : 4}
            />
          </div>
        </Container>
      </section>

      <section className="bg-cream py-12">
        <Container wide>
          <Link
            href={`/bo-suu-tap/${next.slug}`}
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
              <p className="eyebrow text-blush-200">{d.nextLabel}</p>
              <p className="mt-3 font-serif text-4xl sm:text-5xl">{next.name}</p>
              <p className="mt-2 text-sm text-white/70">
                {next.sub} · {next.images.length} {ui.photos}
              </p>
              <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-ink">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <CollageCta cta={galleryPage.cta} site={siteConfig} ui={ui} preset={c.concept} />
    </>
  );
}
