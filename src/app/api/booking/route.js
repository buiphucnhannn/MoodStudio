import { NextResponse } from "next/server";
import { addBooking, listBookings, updateBooking, STATUSES } from "@/lib/bookings";

/**
 * API đặt lịch:
 * - POST   /api/booking            khách gửi yêu cầu (public)
 * - GET    /api/booking            danh sách yêu cầu (cần header x-admin-key)
 * - PATCH  /api/booking            đổi trạng thái / ghi chú (cần header x-admin-key)
 */
const isAdmin = (req) => {
  const key = process.env.ADMIN_KEY;
  return key && req.headers.get("x-admin-key") === key;
};
const clean = (v, max = 500) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20).replace(/[^\d+ .]/g, "");
  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json(
      { error: "Vui lòng nhập họ tên và số điện thoại hợp lệ" },
      { status: 400 },
    );
  }
  const booking = await addBooking({
    name,
    phone,
    date: clean(body.date, 20),
    people: clean(body.people, 10),
    concept: clean(body.concept, 40),
    plan: clean(body.plan, 40),
    note: clean(body.note, 1000),
  });
  return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
}

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listBookings() });
}

export async function PATCH(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const patch = {};
  if (body.status) {
    if (!STATUSES.includes(body.status))
      return NextResponse.json({ error: "Trạng thái không hợp lệ" }, { status: 400 });
    patch.status = body.status;
  }
  if (body.adminNote !== undefined) patch.adminNote = clean(body.adminNote, 1000);
  const updated = await updateBooking(clean(body.id, 40), patch);
  if (!updated) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  return NextResponse.json({ ok: true, item: updated });
}
