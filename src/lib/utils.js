import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gộp className và xử lý xung đột class Tailwind. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
