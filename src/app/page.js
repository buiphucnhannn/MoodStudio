import { siteConfig } from "@/config/site";
import {
  hero,
  marquee,
  about,
  why,
  concepts,
  moments,
  pricing,
  process,
  testimonials,
  contact,
  ui,
  allPhotos,
} from "@/data/site";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Concepts from "@/components/sections/Concepts";
import Why from "@/components/sections/Why";
import Moments from "@/components/sections/Moments";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

const conceptsHeading = {
  eyebrow: "Concept",
  title: "Mỗi concept, một",
  accent: "mood riêng.",
};

// Trang chủ: Hero → Marquee → Giới thiệu → Concept → Vì sao chọn → Bộ sưu tập → Bảng giá → Quy trình → Cảm nhận → Liên hệ
export default function HomePage() {
  return (
    <>
      <Hero hero={hero} ui={ui} />
      <Marquee items={marquee} />
      <About about={about} ui={ui} />
      <Concepts concepts={concepts} ui={ui} heading={conceptsHeading} />
      <Why why={why} />
      <Moments
        tone="blush"
        moments={moments}
        ui={ui}
        allHref="/bo-suu-tap"
        photosCount={allPhotos.length}
      />
      <Pricing pricing={pricing} ui={ui} />
      <Process process={process} tone="blush" />
      <Testimonials testimonials={testimonials} />
      <Contact contact={contact} site={siteConfig} ui={ui} />
    </>
  );
}
