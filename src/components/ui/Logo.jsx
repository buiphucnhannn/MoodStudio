import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Logo({ className }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)} aria-label={siteConfig.name}>
      <Image src="/images/brand/logo-mark.svg" alt="" width={32} height={32} priority />
      <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
