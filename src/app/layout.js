import { Cormorant_Garamond, Be_Vietnam_Pro, Great_Vibes } from "next/font/google";
import { siteConfig } from "@/config/site";
import { nav, ui, footer, booking, concepts, pricing } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import Reveal from "@/components/ui/Reveal";
import SmoothScroll from "@/components/fx/SmoothScroll";
import ScrollTop from "@/components/fx/ScrollTop";
import Preloader from "@/components/fx/Preloader";
import PageTransition from "@/components/fx/PageTransition";
import BookingModal from "@/components/booking/BookingModal";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Font viết tay — chỉ dùng cho dòng chữ ký ở khối mời gọi
const script = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }) {
  // Dữ liệu có cấu trúc cho Google (LocalBusiness)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: "+84" + siteConfig.phoneRaw.slice(1),
    image: siteConfig.url + "/opengraph-image",
    address: { "@type": "PostalAddress", addressLocality: "Hồ Chí Minh", addressCountry: "VN" },
    hasMap: siteConfig.mapsLink,
    sameAs: [siteConfig.facebook],
    openingHours: siteConfig.openingHoursSchema,
    priceRange: "$$",
  };
  const conceptOptions = concepts.map(({ slug, name }) => ({ slug, name }));
  const planOptions = pricing.plans.map(({ slug, name }) => ({ slug, name }));

  return (
    <html lang="vi" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader caption="Feminine · Elegant · Artistic" />
        <SmoothScroll />
        <PageTransition />
        <Reveal />
        <Navbar nav={nav} ui={ui} phone={siteConfig.phone} phoneRaw={siteConfig.phoneRaw} />
        <main>{children}</main>
        <Footer site={siteConfig} nav={nav} ui={ui} footer={footer} />
        <FloatingContact site={siteConfig} ui={ui} />
        <ScrollTop label={ui.toTop} />
        <BookingModal
          booking={booking}
          concepts={conceptOptions}
          plans={planOptions}
          site={siteConfig}
        />
      </body>
    </html>
  );
}
