import Pic from "@/components/ui/Pic";
import { cn } from "@/lib/utils";

// Tấm ảnh polaroid (viền trắng, chú thích chữ serif nghiêng) — dùng rải rác để tạo chất "studio".
export default function Polaroid({ p, className = "", sizes = "260px" }) {
  return (
    <div className={cn("polaroid", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          p.square ? "aspect-square" : "aspect-[4/5]",
        )}
      >
        <Pic
          src={p.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: p.pos }}
        />
      </div>
      {p.caption && (
        <p className="mt-2 text-center font-serif text-base leading-none text-ink-soft italic">
          {p.caption}
        </p>
      )}
    </div>
  );
}
