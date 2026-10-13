import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Hành trình một buổi chụp: 4 bước, thẻ ảnh dọc so le (thẻ chẵn lệch xuống 2rem).
 */
export default function Process({ process }) {
  return (
    <section
      id="process"
      className="relative isolate overflow-hidden bg-cream pt-16 pb-20 lg:pt-20 lg:pb-32"
    >
      <Container wide>
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative overflow-hidden rounded-[1.5rem] bg-blush-100 lg:even:translate-y-8"
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
