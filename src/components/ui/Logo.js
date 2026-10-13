import { cn } from "@/lib/utils";

/**
 * Logo chữ "MOOD.STUDIO" — dựng lại theo watermark trên ảnh của khách (serif mảnh, chữ in hoa, dấu chấm giữa).
 * Khi khách gửi file logo chính thức (link Drive trong brief): đặt vào public/images/brand/ và thay bằng <Image>.
 * light=true: màu trắng để đặt trên nền tối.
 */
export default function Logo({ className = "text-xl", light = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-serif font-medium tracking-[0.08em] whitespace-nowrap uppercase",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      Mood<span className={cn("mx-[0.05em]", light ? "text-blush-200" : "text-rose")}>.</span>
      Studio
    </span>
  );
}
