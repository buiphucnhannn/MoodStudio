import { siteConfig } from "@/config/site";
import { concepts, collections } from "@/data/site";

export default function sitemap() {
  const base = siteConfig.url;
  const pages = ["", "/concept", "/bo-suu-tap"];
  return [
    ...pages.map((p) => ({
      url: base + p,
      changeFrequency: "monthly",
      priority: p === "" ? 1 : 0.8,
    })),
    ...concepts.map((c) => ({
      url: `${base}/concept/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...collections.map((c) => ({
      url: `${base}/bo-suu-tap/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
