import { faqs } from "@/data/landing";
import { Section, SectionHeading } from "@/components/ui";

// Dùng <details> gốc của HTML: accordion không cần JavaScript phía client.
export default function Faq() {
  return (
    <Section id="faq" className="bg-surface" containerClassName="max-w-3xl">
      <SectionHeading eyebrow="FAQ" title="Câu hỏi thường gặp" />
      <div className="divide-y divide-line rounded-2xl border border-line bg-canvas">
        {faqs.map((item) => (
          <details key={item.question} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="text-xl text-brand-600 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
