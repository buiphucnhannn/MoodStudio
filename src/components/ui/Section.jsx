import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({ id, className, containerClassName, children }) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 sm:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
