// Dải chữ chạy liên tục ngay dưới hero: liệt kê các concept.
export default function Marquee({ items, dark = false }) {
  const half = [...items, ...items];
  const row = [...half, ...half];
  return (
    <div
      className={`marquee overflow-hidden border-y py-4 ${dark ? "border-white/10 bg-plum" : "border-rose/15 bg-blush-50"}`}
      aria-hidden
    >
      <div className="bleed-cap overflow-hidden">
        <div className="marquee-track gap-10" style={{ "--marquee-duration": "45s" }}>
          {row.map((item, i) => (
            <span
              key={i}
              className={`flex items-center gap-10 font-serif text-xl whitespace-nowrap italic sm:text-2xl ${dark ? "text-cream/70" : "text-ink/70"}`}
            >
              {item}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-rose" fill="currentColor">
                <path d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
