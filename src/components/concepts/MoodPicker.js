import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * "Chọn theo dịp": 5 thẻ nhỏ gợi ý concept theo dịp (sinh nhật, Tết, profile…). Mỗi thẻ có ảnh tròn
 * của concept tương ứng và cuộn tới concept đó trong danh sách phía trên (anchor #slug).
 */
export default function MoodPicker({ picker, concepts }) {
  const byslug = (slug) => concepts.find((c) => c.slug === slug);
  return (
    <section className="bg-blush-50 py-16 lg:py-24">
      <Container wide>
        <SectionHeading eyebrow={picker.eyebrow} title={picker.title} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {picker.items.map((it, i) => {
            const c = byslug(it.concept);
            return (
              <li key={it.occasion} className="reveal" style={{ "--reveal-delay": `${i * 80}ms` }}>
                <Link
                  href={`#${c.slug}`}
                  className="group flex h-full flex-col items-center rounded-[1.5rem] border border-rose/15 bg-white/80 p-6 text-center shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-soft"
                >
                  <span className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-blush-100 transition group-hover:ring-rose/40">
                    <Pic
                      src={c.cover}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                      style={{ objectPosition: c.coverPos }}
                    />
                  </span>
                  <p className="mt-4 text-[11px] tracking-[0.25em] text-rose uppercase">
                    {it.occasion}
                  </p>
                  <p className="mt-1 font-serif text-xl text-ink">{c.name}</p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-soft">{it.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-ink">
                    Xem concept{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
