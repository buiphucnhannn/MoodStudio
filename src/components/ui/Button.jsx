import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700",
  secondary: "border border-line bg-surface text-ink hover:border-brand-300 hover:text-brand-700",
  ghost: "text-ink hover:bg-brand-50 hover:text-brand-700",
  light: "bg-white text-brand-700 hover:bg-brand-50",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/** Render <Link> khi có `href`, ngược lại render <button>. */
export default function Button({ href, variant = "primary", size = "md", className, children, ...props }) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
