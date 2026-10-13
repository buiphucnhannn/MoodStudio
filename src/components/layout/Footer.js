import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { Facebook, Instagram, MapPin, Phone, Clock, Messenger } from "@/components/ui/Icons";
import CurrentYear from "./CurrentYear";

// Footer nền mận tối — chữ kem, có bản đồ Google Maps nhúng (không cần API key).
export default function Footer({ site, nav, ui, footer }) {
  const socials = [
    { Icon: Facebook, href: site.facebook, label: "Facebook" },
    { Icon: Instagram, href: site.instagram, label: "Instagram" },
    { Icon: Messenger, href: site.messenger, label: "Messenger" },
  ];

  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden bg-plum text-cream">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-rose/25 blur-[140px]" />

      <Container wide className="relative py-12 lg:py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_0.7fr]">
          <div>
            <Link
              href="/"
              aria-label="MOOD Studio"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Logo className="text-2xl" light />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">{footer.blurb}</p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ Icon, href: url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{ui.contact}</h4>
            <ul className="space-y-4 text-sm text-cream/75">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blush-200" />
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="-my-2 inline-block py-2 transition hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blush-200" />
                <span>
                  {site.address}
                  <br />
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-2 inline-block py-2 text-blush-200 underline-offset-4 hover:underline"
                  >
                    {ui.directions}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blush-200" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.time} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{ui.map}</h4>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft">
              <iframe
                title="MOOD Studio map"
                src={site.mapsEmbed}
                className="h-44 w-full grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-5 font-serif text-xl text-white">{ui.menu}</h4>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-cream/75 md:block md:space-y-3">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="inline-block py-2 transition hover:text-white lg:py-1"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  data-booking
                  className="inline-block py-2 transition hover:text-white lg:py-1"
                >
                  {ui.book}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container
          wide
          className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/50 sm:flex-row"
        >
          <p>
            © <CurrentYear /> {site.name}. {footer.rights}
          </p>
          <p className="tracking-[0.2em] uppercase">{site.addressShort}</p>
        </Container>
      </div>
    </footer>
  );
}
