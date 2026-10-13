import AdminBookings from "./AdminBookings";

export const metadata = {
  title: "Quản lý yêu cầu đặt lịch",
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  return <AdminBookings />;
}
