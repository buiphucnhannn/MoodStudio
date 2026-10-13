import Image from "next/image";
import { features } from "@/data/landing";
import { Section, SectionHeading } from "@/components/ui";

export default function Features() {
  return (
    <Section id="features" className="bg-surface">
      <SectionHeading
        eyebrow="Dịch vụ"
        title="Mọi thứ thương hiệu bạn cần"
        description="Từ chiến lược đến thực thi, chúng tôi đồng hành ở mọi điểm chạm."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-line bg-canvas p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50">
              <Image src={feature.icon} alt="" width={28} height={28} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-ink">{feature.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{feature.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
