import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Polaroid from "@/components/ui/Polaroid";
import Parallax from "@/components/fx/Parallax";
import Button from "@/components/ui/Button";
import { cn, toneBg } from "@/lib/utils";

/**
 * Giới thiệu: câu tuyên ngôn lớn kiểu serif với các từ hiện dần, ảnh lớn parallax bên phải,
 * 2 polaroid xoè nhẹ và 3 con số nổi bật.
 */
export default function About({ about, ui, moreHref, tone = "cream" }) {
  return (
    <section
      id="about"
      className={cn(
        "relative flex screen items-center overflow-hidden py-16 lg:py-14",
        toneBg[tone],
      )}
    >
      <Container wide className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="reveal eyebrow">{about.eyebrow}</p>
          <h2 className="mt-5 h-display text-[2.3rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4rem]">
            {about.manifesto.map((m, i) => (
              <span
                key={i}
                className={cn(
                  "reveal mr-[0.28em] inline-block",
                  m.accent && "text-rose-deep italic",
                )}
                style={{ "--reveal-delay": `${80 + i * 110}ms` }}
              >
                {m.text}
              </span>
            ))}
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={{ "--reveal-delay": `${500 + i * 100}ms` }}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-rose/20 pt-8">
            {about.highlights.map((h, i) => (
              <div
                key={h.label}
                className="reveal"
                style={{ "--reveal-delay": `${700 + i * 100}ms` }}
              >
                <dt className="font-serif text-3xl text-ink sm:text-4xl">{h.value}</dt>
                <dd className="mt-1 text-[12px] leading-snug text-ink-muted">{h.label}</dd>
              </div>
            ))}
          </dl>
          {moreHref && (
            <div className="reveal mt-8" style={{ "--reveal-delay": "900ms" }}>
              <Button href={moreHref} variant="outline" arrow>
                {ui.viewAll}
              </Button>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <Parallax
            speed={0.08}
            className="reveal relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-blush-100"
            data-reveal="clip"
          >
            <Pic
              src={about.main.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition: about.main.pos }}
            />
          </Parallax>
          {about.polaroids.map((p, i) => (
            <Parallax
              key={p.src}
              speed={i === 0 ? -0.04 : 0.05}
              className={cn(
                "absolute hidden w-[38%] max-w-[200px] lg:block",
                i === 0 ? "bottom-10 -left-10 -rotate-6" : "top-[40%] -right-8 rotate-[5deg]",
              )}
            >
              <div
                className="reveal"
                data-reveal="scale"
                style={{ "--reveal-delay": `${300 + i * 150}ms` }}
              >
                <Polaroid p={p} sizes="200px" />
              </div>
            </Parallax>
          ))}
        </div>
      </Container>
    </section>
  );
}
