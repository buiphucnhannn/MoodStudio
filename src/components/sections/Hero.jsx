import Image from "next/image";
import { hero } from "@/data/landing";
import { Badge, Button, Container } from "@/components/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-200 via-accent-100 to-transparent opacity-60 blur-3xl"
      />
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Badge>
            <span className="size-1.5 rounded-full bg-brand-500" />
            {hero.badge}
          </Badge>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.title}{" "}
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              {hero.highlight}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">{hero.description}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
                <dd className="text-2xl font-bold text-ink sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={560}
            height={480}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
