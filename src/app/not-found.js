import { Button, Container } from "@/components/ui";

export const metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Không tìm thấy trang</h1>
      <p className="mt-4 text-muted">Trang bạn tìm có thể đã bị xoá hoặc không tồn tại.</p>
      <Button href="/" className="mt-8">
        Về trang chủ
      </Button>
    </Container>
  );
}
