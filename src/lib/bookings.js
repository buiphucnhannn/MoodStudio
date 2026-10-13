import { promises as fs } from "fs";
import path from "path";

/**
 * Kho lưu yêu cầu đặt lịch — file JSON tại data/bookings.json (gitignore).
 * Đủ dùng cho demo & self-host (VPS). Khi lên hosting serverless (Vercel…) thay bằng DB / Google Sheets:
 * chỉ cần giữ nguyên 3 hàm listBookings / addBooking / updateBooking.
 */
const FILE = path.join(process.cwd(), "data", "bookings.json");
export const STATUSES = ["new", "confirmed", "done", "cancelled"];

async function readAll() {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}
async function writeAll(items) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), "utf8");
}

export async function listBookings() {
  const items = await readAll();
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addBooking(input) {
  const items = await readAll();
  const booking = {
    id: `MS${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };
  items.push(booking);
  await writeAll(items);
  return booking;
}

export async function updateBooking(id, patch) {
  const items = await readAll();
  const i = items.findIndex((b) => b.id === id);
  if (i === -1) return null;
  items[i] = { ...items[i], ...patch, updatedAt: new Date().toISOString() };
  await writeAll(items);
  return items[i];
}
