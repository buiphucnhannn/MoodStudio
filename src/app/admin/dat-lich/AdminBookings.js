"use client";

import { useCallback, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { concepts, pricing } from "@/data/site";
import { Refresh } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Trang quản lý yêu cầu đặt lịch (nội bộ): nhập mật khẩu (ADMIN_KEY) → xem danh sách, lọc theo trạng thái,
 * đổi trạng thái và ghi chú. Mật khẩu lưu sessionStorage (đóng tab là hết).
 */
const STATUS = {
  new: { label: "Mới", cls: "bg-rose text-white" },
  confirmed: { label: "Đã xác nhận", cls: "bg-blush-200 text-rose-deep" },
  done: { label: "Đã chụp", cls: "bg-cream-200 text-ink" },
  cancelled: { label: "Đã huỷ", cls: "bg-ink/10 text-ink-muted" },
};
const nameOf = (list, slug) => list.find((x) => x.slug === slug)?.name || (slug ? slug : "—");
const fmt = (iso) =>
  new Date(iso).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function AdminBookings() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (k) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/booking", { headers: { "x-admin-key": k }, cache: "no-store" });
      if (res.status === 401) throw new Error("Sai mật khẩu");
      if (!res.ok) throw new Error("Không tải được dữ liệu");
      const data = await res.json();
      setItems(data.items);
      setKey(k);
      try {
        sessionStorage.setItem("mood-admin-key", k);
      } catch {}
    } catch (e) {
      setError(e.message);
      setItems(null);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    let saved = "";
    try {
      saved = sessionStorage.getItem("mood-admin-key") || "";
    } catch {}
    if (!saved) return;
    // Gọi sau 1 tick: tải dữ liệu là đồng bộ với hệ thống ngoài (sessionStorage/fetch), không setState ngay trong effect
    const t = setTimeout(() => load(saved), 0);
    return () => clearTimeout(t);
  }, [load]);

  const patch = async (id, body) => {
    const res = await fetch("/api/booking", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ id, ...body }),
    });
    if (!res.ok) return setError("Không cập nhật được");
    const { item } = await res.json();
    setItems((list) => list.map((b) => (b.id === id ? item : b)));
  };

  if (!items) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-cream bg-glow px-5 pt-24">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(input);
          }}
          className="w-full max-w-sm rounded-[1.75rem] border border-rose/15 bg-white/80 p-8 text-center shadow-card backdrop-blur"
        >
          <Logo className="text-xl" />
          <h1 className="mt-4 font-serif text-2xl text-ink">Quản lý đặt lịch</h1>
          <p className="mt-1 text-sm text-ink-soft">Nhập mật khẩu quản trị để xem yêu cầu.</p>
          <input
            type="password"
            className="mt-6 field"
            placeholder="Mật khẩu"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          {error && <p className="mt-2 text-xs text-rose-deep">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-4 w-full rounded-full bg-ink py-3 text-sm font-medium text-white transition hover:bg-plum disabled:opacity-60"
          >
            {busy ? "Đang kiểm tra…" : "Đăng nhập"}
          </button>
        </form>
      </section>
    );
  }

  const list = filter === "all" ? items : items.filter((b) => b.status === filter);
  const count = (s) => items.filter((b) => b.status === s).length;

  return (
    <section className="min-h-screen bg-cream pt-28 pb-20">
      <Container wide>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Nội bộ</p>
            <h1 className="mt-2 font-serif text-4xl text-ink">Yêu cầu đặt lịch</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {items.length} yêu cầu · {count("new")} mới
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => load(key)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13px] text-ink transition hover:bg-ink hover:text-white"
            >
              <Refresh /> Tải lại
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  sessionStorage.removeItem("mood-admin-key");
                } catch {}
                setItems(null);
                setKey("");
              }}
              className="rounded-full px-4 py-2 text-[13px] text-ink-muted hover:text-ink"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {[["all", "Tất cả"], ...Object.entries(STATUS).map(([k, v]) => [k, v.label])].map(
            ([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-medium transition",
                  filter === k
                    ? "border-ink bg-ink text-white"
                    : "border-rose/25 bg-white/60 text-ink/75 hover:border-rose",
                )}
              >
                {label} {k !== "all" && <span className="opacity-60">({count(k)})</span>}
              </button>
            ),
          )}
        </div>
        {error && <p className="mt-3 text-xs text-rose-deep">{error}</p>}

        {list.length === 0 ? (
          <p className="py-24 text-center text-sm text-ink-muted">Chưa có yêu cầu nào.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {list.map((b) => (
              <li
                key={b.id}
                className="rounded-[1.5rem] border border-rose/15 bg-white/80 p-6 shadow-card backdrop-blur"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium",
                          STATUS[b.status]?.cls,
                        )}
                      >
                        {STATUS[b.status]?.label}
                      </span>
                      <span className="text-[11px] tracking-wider text-ink-muted">
                        {b.id} · {fmt(b.createdAt)}
                      </span>
                    </div>
                    <p className="mt-3 font-serif text-2xl text-ink">
                      {b.name}{" "}
                      <a
                        href={`tel:${b.phone.replace(/\s/g, "")}`}
                        className="ml-2 font-sans text-base text-rose-deep hover:underline"
                      >
                        {b.phone}
                      </a>
                    </p>
                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <dt className="text-[11px] tracking-wider text-ink-muted uppercase">
                          Ngày chụp
                        </dt>
                        <dd className="text-ink">{b.date || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] tracking-wider text-ink-muted uppercase">
                          Số người
                        </dt>
                        <dd className="text-ink">{b.people || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] tracking-wider text-ink-muted uppercase">
                          Concept
                        </dt>
                        <dd className="text-ink">{nameOf(concepts, b.concept)}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] tracking-wider text-ink-muted uppercase">Gói</dt>
                        <dd className="text-ink">{nameOf(pricing.plans, b.plan)}</dd>
                      </div>
                    </dl>
                    {b.note && (
                      <p className="mt-3 rounded-xl bg-blush-50 px-4 py-3 text-sm text-ink-soft">
                        {b.note}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-2 lg:w-64">
                    <label className="text-[11px] tracking-wider text-ink-muted uppercase">
                      Trạng thái
                    </label>
                    <select
                      className="field"
                      value={b.status}
                      onChange={(e) => patch(b.id, { status: e.target.value })}
                    >
                      {Object.entries(STATUS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                    <label className="mt-1 text-[11px] tracking-wider text-ink-muted uppercase">
                      Ghi chú nội bộ
                    </label>
                    <textarea
                      className="min-h-[64px] field resize-none"
                      defaultValue={b.adminNote || ""}
                      placeholder="Đã gọi, hẹn lại…"
                      onBlur={(e) =>
                        e.target.value !== (b.adminNote || "") &&
                        patch(b.id, { adminNote: e.target.value })
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
