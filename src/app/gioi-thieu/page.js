import { siteConfig } from "@/config/site";
import { about, aboutPage, why, process, testimonials, contact, ui } from "@/data/site";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import About from "@/components/sections/About";
import Why from "@/components/sections/Why";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export const metadata = {
  title: "Giới thiệu",
  description: aboutPage.desc,
  alternates: { canonical: "/gioi-thieu" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} desc={aboutPage.desc}>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {aboutPage.values.map((v, i) => (
            <li
              key={v.title}
              className="reveal rounded-[1.25rem] border border-rose/15 bg-white/70 p-5 backdrop-blur"
              style={{ "--reveal-delay": `${300 + i * 100}ms` }}
            >
              <p className="font-serif text-2xl text-rose-deep italic">{v.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{v.desc}</p>
            </li>
          ))}
        </ul>
      </PageHero>
      <About about={about} ui={ui} />
      <Why why={why} />
      <Process process={process} />
      <Testimonials testimonials={testimonials} />
      <Contact contact={contact} site={siteConfig} ui={ui} />
      <Container as="div" className="hidden" />
    </>
  );
}
