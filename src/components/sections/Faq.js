import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Messenger, Phone, Zalo } from "@/components/ui/Icons";
import { cn, toneBg } from "@/lib/utils";

/**
 * FAQ rộng bằng các section khác (Container wide): desktop chia 2 cột — trái là tiêu đề + mô tả + kênh hỏi nhanh
 * (dính khi cuộn), phải là danh sách câu hỏi. Mobile xếp dọc.
 * Accordion dùng <details> gốc của HTML — không cần JavaScript phía client.
 */
export default function Faq({
  faqs,
  eyebrow = "FAQ",
  title = "Câu hỏi thường gặp",
  desc = "Những điều các bạn hay hỏi MOOD trước buổi chụp. Chưa thấy câu trả lời? Nhắn ngay cho chúng mình nhé.",
  tone = "cream",
}) {
  const channels = [
    { href: siteConfig.messenger, label: "Messenger", Icon: Messenger, ext: true },
    { href: siteConfig.zalo, label: "Zalo", Icon: Zalo, ext: true },
    { href: `tel:${siteConfig.phoneRaw}`, label: siteConfig.phone, Icon: Phone },
  ];

  return (
    <section className={cn("section-y", toneBg[tone])}>
      <Container wide className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal eyebrow">{eyebrow}</p>
          <h2
            className="reveal mt-4 h-display text-[2rem] sm:text-[2.6rem] lg:text-[3rem]"
            style={{ "--reveal-delay": "80ms" }}
          >
            {title}
          </h2>
          <p
            className="reveal mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base"
            style={{ "--reveal-delay": "160ms" }}
          >
            {desc}
          </p>
          <ul className="reveal mt-7 flex flex-wrap gap-2" style={{ "--reveal-delay": "240ms" }}>
            {channels.map(({ href, label, Icon, ext }) => (
              <li key={label}>
                <a
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-[13px] text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="divide-y divide-rose/15 rounded-[1.5rem] border border-rose/15 bg-white/70 backdrop-blur">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className="reveal group px-6 py-5 sm:px-8 sm:py-6"
              style={{ "--reveal-delay": `${i * 60}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-ink sm:text-[1.35rem] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/30 text-xl leading-none text-rose transition-all duration-300 group-open:rotate-45 group-open:bg-rose group-open:text-white"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl pr-12 text-[15px] leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
