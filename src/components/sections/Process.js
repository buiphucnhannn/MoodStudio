import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn, toneBg } from "@/lib/utils";

/**
 * Hành trình một buổi chụp: 4 bước, thẻ ảnh dọc so le (thẻ chẵn lệch xuống 2rem).
 */
export default function Process({ process, tone = "cream" }) {
  return (
    <section
      id="process"
      className={cn("relative isolate overflow-hidden section-y lg:pb-32", toneBg[tone])}
    >
      <Container wide>
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />

        <p className="mt-6 text-[11px] tracking-[0.25em] text-ink-muted uppercase sm:hidden">
          Vuốt ngang để xem 4 bước →
        </p>
        <ol className="-mx-5 mt-4 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative w-[80vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-blush-100 sm:w-auto sm:max-w-none lg:even:translate-y-8"
              style={{ "--reveal-delay": `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5]">
                <Pic
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ objectPosition: s.pos }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <span className="font-serif text-sm text-blush-200">{s.n}</span>
                <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
