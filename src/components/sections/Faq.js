import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// FAQ dùng <details> gốc của HTML: accordion không cần JavaScript phía client.
export default function Faq({ faqs, eyebrow = "FAQ", title = "Câu hỏi thường gặp" }) {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <div className="mt-10 divide-y divide-rose/15 rounded-[1.5rem] border border-rose/15 bg-white/70 backdrop-blur">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="reveal group p-6"
              style={{ "--reveal-delay": `${i * 60}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="text-2xl leading-none text-rose transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
