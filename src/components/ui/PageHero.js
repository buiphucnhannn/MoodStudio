import Container from "@/components/ui/Container";
import SplitText from "@/components/fx/SplitText";
import Petals from "@/components/fx/Petals";

// Đầu trang con: eyebrow + tiêu đề lớn + mô tả, nền kem có ánh hồng và cánh hoa rơi.
export default function PageHero({ eyebrow, title, desc, children }) {
  return (
    <section className="relative overflow-hidden bg-cream bg-glow pt-32 pb-12 sm:pt-40 sm:pb-16">
      <Petals count={5} />
      <Container className="relative">
        <p className="reveal eyebrow">{eyebrow}</p>
        <SplitText
          as="h1"
          text={title}
          className="mt-4 max-w-3xl h-display text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]"
        />
        {desc && (
          <p
            className="reveal mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base"
            style={{ "--reveal-delay": "200ms" }}
          >
            {desc}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
