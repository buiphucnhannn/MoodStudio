import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";
import { Container, Logo } from "@/components/ui";

// cacheComponents đang bật: giá trị thời gian phải được cache (tính lúc build).
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Khám phá</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Liên hệ</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-700">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">
                {siteConfig.phone}
              </a>
            </li>
            {Object.entries(siteConfig.socials).map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-brand-700">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="py-6 text-center text-xs text-muted">
          © {year} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
