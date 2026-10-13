// Bộ icon SVG inline — không cần cài thêm thư viện.
const base = (props) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);
export const ArrowUp = ({ className = "h-4 w-4" }) => (
  <svg {...base({ className })}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
export const Close = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronLeft = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
export const ChevronRight = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const ChevronDown = ({ className = "h-4 w-4" }) => (
  <svg {...base({ className })}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const Check = ({ className = "h-4 w-4" }) => (
  <svg {...base({ className, strokeWidth: 2 })}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);
export const Phone = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const Mail = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
export const MapPin = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const Clock = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const Sparkle = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16Z" />
  </svg>
);
export const Flower = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 9.5c-1-3-2.5-5.5 0-6.5s2 3.5 0 6.5ZM12 14.5c1 3 2.5 5.5 0 6.5s-2-3.5 0-6.5ZM9.5 12c-3-1-5.5-2.5-6.5 0s3.5 2 6.5 0ZM14.5 12c3 1 5.5 2.5 6.5 0s-3.5-2-6.5 0Z" />
  </svg>
);
export const Palette = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" />
    <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="15" cy="7.5" r="1" fill="currentColor" />
  </svg>
);
export const Heart = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  </svg>
);
export const Camera = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4V8Z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);
export const Chat = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className, strokeWidth: 1.8 })}>
    <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.4" />
  </svg>
);
export const Calendar = ({ className = "h-5 w-5" }) => (
  <svg {...base({ className })}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
export const Refresh = ({ className = "h-4 w-4" }) => (
  <svg {...base({ className })}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />
  </svg>
);

// ---- Mạng xã hội (fill) ----
const brand = (className) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  className,
});
export const Facebook = ({ className = "h-4 w-4" }) => (
  <svg {...brand(className)}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
  </svg>
);
export const Instagram = ({ className = "h-4 w-4" }) => (
  <svg {...base({ className, strokeWidth: 1.8 })}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
export const Messenger = ({ className = "h-5 w-5" }) => (
  <svg {...brand(className)}>
    <path d="M12 2C6.5 2 2 6.1 2 11.3c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2Zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7L13 14.5Z" />
  </svg>
);
export const Zalo = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 48 48" aria-hidden className={className}>
    <text
      x="24"
      y="31"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontSize="20"
      fill="currentColor"
    >
      Zalo
    </text>
  </svg>
);

export const iconByName = { sparkle: Sparkle, flower: Flower, palette: Palette, heart: Heart };
