import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { cn, toneBg } from "@/lib/utils";

/**
 * "Chọn theo dịp": 5 thẻ nhỏ gợi ý concept theo dịp (sinh nhật, Tết, profile…). Mỗi thẻ có ảnh tròn
 * của concept tương ứng và cuộn tới concept đó trong danh sách phía trên (anchor #slug).
 */
export default function MoodPicker({ picker, concepts, tone = "cream" }) {
  const byslug = (slug) => concepts.find((c) => c.slug === slug);
  return (
    <section className={cn("section-y", toneBg[tone])}>
      <Container wide>
        <SectionHeading eyebrow={picker.eyebrow} title={picker.title} align="center" />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-5">
          {picker.items.map((it, i) => {
            const c = byslug(it.concept);
            return (
              <li
                key={it.occasion}
                className="reveal last:col-span-2 lg:last:col-span-1"
                style={{ "--reveal-delay": `${i * 80}ms` }}
              >
                <Link
                  href={`#${c.slug}`}
                  className="group flex h-full flex-col items-center rounded-[1.5rem] border border-rose/15 bg-white/80 p-4 text-center shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-soft sm:p-6"
                >
                  <span className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-blush-100 transition group-hover:ring-rose/40 sm:h-20 sm:w-20">
                    <Pic
                      src={c.cover}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                      style={{ objectPosition: c.coverPos }}
                    />
                  </span>
                  <p className="mt-3 text-[10px] tracking-[0.2em] text-rose uppercase sm:mt-4 sm:text-[11px] sm:tracking-[0.25em]">
                    {it.occasion}
                  </p>
                  <p className="mt-1 text-center font-serif text-lg leading-snug text-ink sm:text-xl">
                    {c.name}
                  </p>
                  <p className="mt-2 flex-1 text-center text-xs leading-relaxed text-ink-soft">
                    {it.note}
                  </p>
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
