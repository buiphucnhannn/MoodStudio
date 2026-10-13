import { cn } from "@/lib/utils";

export default function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
