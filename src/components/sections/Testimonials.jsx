import Image from "next/image";
import { testimonials } from "@/data/landing";
import { Section, SectionHeading } from "@/components/ui";

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-surface">
      <SectionHeading eyebrow="Khách hàng" title="Được tin tưởng bởi những thương hiệu đang lớn" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.name} className="flex flex-col rounded-2xl border border-line bg-canvas p-8">
            <blockquote className="flex-1 leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Image src={item.avatar} alt={item.name} width={44} height={44} className="rounded-full" />
              <div>
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
