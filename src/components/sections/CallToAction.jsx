import { cta } from "@/data/landing";
import { Button, Container } from "@/components/ui";

export default function CallToAction() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-16 text-center sm:px-16">
          <div aria-hidden="true" className="absolute -top-20 -right-20 size-72 rounded-full bg-accent-500/30 blur-3xl" />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">{cta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">{cta.description}</p>
          <Button href={cta.action.href} variant="light" size="lg" className="relative mt-10">
            {cta.action.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
