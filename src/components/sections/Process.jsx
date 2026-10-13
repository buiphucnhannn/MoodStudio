import { processSteps } from "@/data/landing";
import { Section, SectionHeading } from "@/components/ui";

export default function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Quy trình"
        title="4 bước, rõ ràng từ đầu đến cuối"
        description="Bạn luôn biết dự án đang ở đâu và bước tiếp theo là gì."
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((item) => (
          <li key={item.step}>
            <span className="text-5xl font-extrabold text-brand-200">{item.step}</span>
            <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
