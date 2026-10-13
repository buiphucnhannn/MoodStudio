import { ui } from "@/data/site";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Petals from "@/components/fx/Petals";

export const metadata = { title: ui.notFoundTitle };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(var(--screen)*0.8)] items-center overflow-hidden bg-cream bg-glow pt-24">
      <Petals count={5} />
      <Container className="relative text-center">
        <p className="font-script text-5xl text-rose">404</p>
        <h1 className="mt-4 h-display text-[2.4rem] sm:text-[3.4rem]">{ui.notFoundTitle}</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">{ui.notFoundDesc}</p>
        <Button href="/" className="mt-8" arrow>
          {ui.backHome}
        </Button>
      </Container>
    </section>
  );
}
