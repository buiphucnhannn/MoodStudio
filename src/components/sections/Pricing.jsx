import { pricingPlans } from "@/data/landing";
import { cn } from "@/lib/utils";
import { Button, CheckIcon, Section, SectionHeading } from "@/components/ui";

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Bảng giá"
        title="Gói dịch vụ minh bạch"
        description="Chọn gói phù hợp với giai đoạn phát triển của bạn."
      />
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-8",
              plan.featured
                ? "border-brand-600 bg-brand-600 text-white shadow-2xl shadow-brand-600/30 lg:-my-4 lg:py-12"
                : "border-line bg-surface text-ink",
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                Phổ biến nhất
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className={cn("mt-2 text-sm", plan.featured ? "text-brand-100" : "text-muted")}>{plan.description}</p>
            <p className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className={cn("text-sm", plan.featured ? "text-brand-100" : "text-muted")}>{plan.period}</span>
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <CheckIcon className={cn("mt-0.5 size-5 shrink-0", plan.featured ? "text-white" : "text-brand-600")} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button href="#contact" variant={plan.featured ? "light" : "secondary"} className="mt-10 w-full">
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
