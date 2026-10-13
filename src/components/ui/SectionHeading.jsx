import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl sm:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
