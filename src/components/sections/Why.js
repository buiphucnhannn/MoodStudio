import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { iconByName } from "@/components/ui/Icons";

// Vì sao chọn MOOD: 4 thẻ USP, icon trong vòng tròn hồng, thẻ chẵn lệch xuống cho nhịp điệu.
export default function Why({ why }) {
  return (
    <section className="relative overflow-hidden bg-cream py-16 lg:py-24">
      <Container wide>
        <SectionHeading eyebrow={why.eyebrow} title={why.title} align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item, i) => {
            const Icon = iconByName[item.icon];
            return (
              <li
                key={item.title}
                className="reveal group rounded-[1.5rem] border border-rose/15 bg-white/70 p-7 shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-rose/40 hover:shadow-soft lg:even:translate-y-6"
                style={{ "--reveal-delay": `${i * 100}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-100 text-rose-deep transition-colors group-hover:bg-rose group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
