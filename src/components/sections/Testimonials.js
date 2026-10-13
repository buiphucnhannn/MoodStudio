import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";

// Cảm nhận khách hàng: 3 thẻ, dấu ngoặc kép serif lớn, avatar tròn.
export default function Testimonials({ testimonials }) {
  return (
    <section className="relative overflow-hidden bg-blush-50 py-16 lg:py-24">
      <Container wide>
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <figure
              key={t.name}
              className="reveal relative flex flex-col rounded-[1.5rem] border border-rose/15 bg-white/80 p-8 shadow-card backdrop-blur"
              style={{ "--reveal-delay": `${i * 120}ms` }}
            >
              <span
                aria-hidden
                className="absolute top-4 right-7 font-serif text-7xl leading-none text-rose/25"
              >
                ”
              </span>
              <blockquote className="flex-1 font-serif text-lg leading-relaxed text-ink italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full bg-blush-100">
                  <Pic
                    src={t.avatar}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                    style={{ objectPosition: t.pos }}
                  />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{t.name}</span>
                  <span className="block text-xs text-ink-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
