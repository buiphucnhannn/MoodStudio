import { siteConfig } from "@/config/site";
import { collections, concepts, galleryPage, ui } from "@/data/site";
import CollectionsHero from "@/components/gallery/CollectionsHero";
import CollectionCards from "@/components/gallery/CollectionCards";
import CollageCta from "@/components/sections/CollageCta";

export const metadata = {
  title: galleryPage.meta.title,
  description: galleryPage.meta.desc,
  alternates: { canonical: "/bo-suu-tap" },
};

/**
 * Trang Bộ sưu tập (danh sách): Hero nền cột ảnh trôi chậm → thẻ bộ sưu tập (bấm → /bo-suu-tap/[slug]) → CTA.
 * Album đầy đủ nằm ở trang chi tiết.
 */
export default function GalleryPage() {
  return (
    <>
      <CollectionsHero hero={galleryPage.hero} collections={collections} ui={ui} />
      <CollectionCards page={galleryPage} collections={collections} concepts={concepts} ui={ui} />
      <CollageCta cta={galleryPage.cta} site={siteConfig} ui={ui} />
    </>
  );
}
