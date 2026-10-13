import { siteConfig } from "@/config/site";
import { concepts, collections, conceptsPage, faqs, ui } from "@/data/site";
import ConceptsHero from "@/components/concepts/ConceptsHero";
import ConceptList from "@/components/concepts/ConceptList";
import MoodPicker from "@/components/concepts/MoodPicker";
import Faq from "@/components/sections/Faq";
import CollageCta from "@/components/sections/CollageCta";

export const metadata = {
  title: conceptsPage.meta.title,
  description: conceptsPage.meta.desc,
  alternates: { canonical: "/concept" },
};

/**
 * Trang Concept riêng (tham khảo trang Dịch vụ của Bụt Studio):
 * Hero (chữ + 3 ảnh so le) → 5 concept zig-zag → Chọn theo dịp → FAQ → CTA nền ghép ảnh.
 * Không dùng lại section của trang chủ; Bảng giá & Liên hệ nằm ở trang chủ (/#pricing, /#contact).
 */
export default function ConceptsPage() {
  return (
    <>
      <ConceptsHero hero={conceptsPage.hero} ui={ui} />
      <ConceptList concepts={concepts} list={conceptsPage.list} collections={collections} />
      <MoodPicker picker={conceptsPage.picker} concepts={concepts} />
      <Faq faqs={faqs} tone="blush" />
      <CollageCta cta={conceptsPage.cta} site={siteConfig} ui={ui} />
    </>
  );
}
