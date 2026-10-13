"use client";

import { useState } from "react";
import Pic from "@/components/ui/Pic";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/**
 * Lưới ảnh masonry (CSS columns) + bộ lọc theo bộ sưu tập + lightbox.
 * photos: [{src, pos, caption, collection, collectionName, wide}]
 */
export default function AlbumGallery({ photos, collections, ui, showFilter = true, columns = 4 }) {
  const [filter, setFilter] = useState("all");
  const [idx, setIdx] = useState(null);
  const list = filter === "all" ? photos : photos.filter((p) => p.collection === filter);
  const images = list.map((p) => ({ src: p.src, alt: p.caption }));

  return (
    <div>
      {showFilter && (
        <div className="reveal mb-8 flex flex-wrap items-center gap-2">
          {[{ slug: "all", name: ui.all }, ...collections].map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setFilter(c.slug)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition",
                filter === c.slug
                  ? "border-ink bg-ink text-white"
                  : "border-rose/25 bg-white/60 text-ink/75 hover:border-rose hover:text-ink",
              )}
            >
              {c.name}
            </button>
          ))}
          <span className="ml-auto text-xs text-ink-muted">
            {list.length} {ui.photos}
          </span>
        </div>
      )}

      {list.length === 0 ? (
        <p className="py-20 text-center text-sm text-ink-muted">{ui.noResults}</p>
      ) : (
        <div
          className={cn(
            "columns-2 gap-4 md:columns-3",
            columns === 3 ? "lg:columns-3" : "lg:columns-4",
          )}
        >
          {list.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIdx(i)}
              className="reveal group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] bg-blush-100 shadow-card"
              style={{ "--reveal-delay": `${(i % 8) * 60}ms` }}
              aria-label={p.caption}
            >
              <div className={cn("relative", p.wide ? "aspect-[3/2]" : "aspect-[2/3]")}>
                <Pic
                  src={p.src}
                  alt={p.caption}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ objectPosition: p.pos }}
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-plum/75 to-transparent p-4 text-left transition-transform duration-500 group-hover:translate-y-0">
                <span className="block text-xs text-white">{p.caption}</span>
                {p.collectionName && (
                  <span className="block text-[10px] tracking-[0.2em] text-white/70 uppercase">
                    {p.collectionName}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
    </div>
  );
}
