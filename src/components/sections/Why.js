import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { iconByName } from "@/components/ui/Icons";
import { cn, toneBg } from "@/lib/utils";

// Vì sao chọn MOOD: 4 thẻ USP, icon trong vòng tròn hồng, thẻ chẵn lệch xuống cho nhịp điệu.
export default function Why({ why, tone = "cream" }) {
  return (
    <section className={cn("relative overflow-hidden section-y", toneBg[tone])}>
      <Container wide>
        <SectionHeading eyebrow={why.eyebrow} title={why.title} align="center" />
        <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {why.items.map((item, i) => {
            const Icon = iconByName[item.icon];
            return (
              <li
                key={item.title}
                className="reveal group flex items-start gap-4 rounded-[1.5rem] border border-rose/15 bg-white/70 p-5 shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-soft sm:block sm:p-7 lg:even:translate-y-6"
                style={{ "--reveal-delay": `${i * 100}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-rose-deep transition-colors group-hover:bg-rose group-hover:text-white sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-xl text-ink sm:mt-5 sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-left text-sm leading-relaxed text-ink-soft sm:mt-2 sm:text-justify">
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
