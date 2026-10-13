import { cn } from "@/lib/utils";

/**
 * Cánh hoa hồng rơi nhẹ — trang trí cho hero / section mời gọi.
 * Thuần CSS (keyframes `petal` trong globals.css), mỗi cánh có vị trí, kích thước, tốc độ và độ trễ khác nhau.
 * Luôn là trang trí: aria-hidden + pointer-events-none. Tắt khi prefers-reduced-motion.
 */
const PETALS = [
  { x: 6, size: 16, dur: 16, delay: 0, sway: 50, o: 0.55 },
  { x: 18, size: 11, dur: 20, delay: -6, sway: -40, o: 0.45 },
  { x: 31, size: 14, dur: 18, delay: -11, sway: 30, o: 0.5 },
  { x: 47, size: 9, dur: 22, delay: -3, sway: -55, o: 0.4 },
  { x: 58, size: 15, dur: 17, delay: -14, sway: 45, o: 0.5 },
  { x: 71, size: 12, dur: 21, delay: -8, sway: -35, o: 0.45 },
  { x: 84, size: 17, dur: 19, delay: -16, sway: 40, o: 0.55 },
  { x: 93, size: 10, dur: 23, delay: -1, sway: -45, o: 0.4 },
];

export default function Petals({ className, count = PETALS.length, light = false }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {PETALS.slice(0, count).map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn("absolute top-0 animate-petal", light ? "text-white" : "text-blush-300")}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            "--petal-duration": `${p.dur}s`,
            "--petal-sway": `${p.sway}px`,
            "--petal-opacity": p.o,
            animationDelay: `${p.delay}s`,
          }}
        >
          <path
            d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      ))}
    </div>
  );
}
