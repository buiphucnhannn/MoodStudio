import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Petals from "@/components/fx/Petals";
import { Check, ArrowRight } from "@/components/ui/Icons";
import { cn, vnd } from "@/lib/utils";

/**
 * Bảng giá theo gói: 3 thẻ, gói nổi bật ở giữa nền mận tối nhô cao hơn; bấm nút → popup đặt lịch chọn sẵn gói.
 * Bên dưới là bảng dịch vụ thêm.
 */
export default function Pricing({ pricing, ui, showAddons = true }) {
  return (
    <section id="pricing" className="relative overflow-hidden bg-blush-50 py-16 lg:py-24">
      <Petals count={4} />
      <Container wide className="relative">
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          desc={pricing.desc}
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-center">
          {pricing.plans.map((plan, i) => (
            <div
              key={plan.slug}
              className={cn(
                "reveal relative flex flex-col rounded-[1.75rem] p-8 transition-transform duration-500 hover:-translate-y-1",
                plan.featured
                  ? "bg-plum text-white shadow-soft lg:-my-6 lg:py-12"
                  : "border border-rose/15 bg-white/80 text-ink shadow-card backdrop-blur",
              )}
              style={{ "--reveal-delay": `${i * 120}ms` }}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose px-3.5 py-1 text-[11px] font-medium tracking-wider text-white uppercase">
                  {ui.popular}
                </span>
              )}
              <p className={cn("eyebrow", plan.featured && "text-blush-200")}>{plan.name}</p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-[2.6rem] leading-none">{vnd(plan.price)}</span>
                <span className={cn("text-sm", plan.featured ? "text-white/60" : "text-ink-muted")}>
                  {plan.unit}
                </span>
              </p>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  plan.featured ? "text-white/75" : "text-ink-soft",
                )}
              >
                {plan.desc}
              </p>
              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.featured ? "text-blush-200" : "text-rose",
                      )}
                    />
                    <span className={plan.featured ? "text-white/90" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-booking
                data-plan={plan.slug}
                className={cn(
                  "group mt-9 inline-flex items-center justify-center gap-3 rounded-full py-1.5 pr-1.5 pl-6 text-sm font-medium transition",
                  plan.featured
                    ? "bg-white text-ink hover:bg-blush-50"
                    : "bg-ink text-white hover:bg-plum",
                )}
              >
                {plan.cta}
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5",
                    plan.featured ? "bg-rose text-white" : "bg-white text-ink",
                  )}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          ))}
        </div>

        {showAddons && (
          <div className="reveal mx-auto mt-14 max-w-3xl" style={{ "--reveal-delay": "200ms" }}>
            <h3 className="text-center font-serif text-2xl text-ink">Dịch vụ thêm</h3>
            <dl className="mt-5 divide-y divide-rose/15 rounded-[1.5rem] border border-rose/15 bg-white/70 px-6 backdrop-blur">
              {pricing.addons.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between gap-4 py-3.5 text-sm"
                >
                  <dt className="text-ink-soft">{a.name}</dt>
                  <dd className="font-medium whitespace-nowrap text-ink">{a.price}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-center text-xs text-ink-muted">{pricing.note}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
