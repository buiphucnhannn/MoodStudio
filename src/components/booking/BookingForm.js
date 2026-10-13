"use client";

import { useState } from "react";
import { Check, Messenger, Zalo } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Form đặt lịch: gửi lên /api/booking (lưu vào kho yêu cầu, xem tại /admin/dat-lich).
 * Nếu API lỗi: soạn tin nhắn từ các ô nhập, sao chép vào clipboard để khách dán vào Messenger / Zalo.
 */
export default function BookingForm({
  booking,
  concepts,
  plans,
  site,
  preset = {},
  compact = false,
}) {
  const f = booking.fields;
  const empty = {
    name: "",
    phone: "",
    date: "",
    people: "1",
    concept: preset.concept || "",
    plan: preset.plan || "",
    note: "",
  };
  const [form, setForm] = useState(empty);
  const [state, setState] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  const compose = () => {
    const c = concepts.find((x) => x.slug === form.concept);
    const p = plans.find((x) => x.slug === form.plan);
    return [
      booking.message,
      `• ${f.name}: ${form.name}`,
      `• ${f.phone}: ${form.phone}`,
      form.date && `• ${f.date}: ${form.date}`,
      `• ${f.people}: ${form.people}`,
      `• ${f.concept}: ${c ? c.name : f.undecided}`,
      `• ${f.plan}: ${p ? p.name : f.undecided}`,
      form.note && `• Ghi chú: ${form.note}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(compose());
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {}
  };

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      await copyText();
      setState("error");
    }
  };

  const openChannel = async (channel) => {
    await copyText();
    window.open(channel === "zalo" ? site.zalo : site.messenger, "_blank", "noopener,noreferrer");
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush-100 text-rose-deep">
          <Check className="h-6 w-6" />
        </span>
        <h4 className="mt-4 font-serif text-2xl text-ink">{f.successTitle}</h4>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{f.success}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => openChannel("messenger")}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-plum"
          >
            <Messenger className="h-4 w-4" /> Messenger
          </button>
          <button
            type="button"
            onClick={() => openChannel("zalo")}
            className="inline-flex items-center gap-2 rounded-full bg-[#0068FF] px-5 py-2.5 text-[13px] font-medium text-white transition hover:brightness-110"
          >
            <Zalo className="h-5 w-5" /> Zalo
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setState("idle");
          }}
          className="mt-5 text-xs text-ink-muted underline-offset-4 hover:underline"
        >
          {f.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          className="field"
          placeholder={f.name}
          value={form.name}
          onChange={set("name")}
          autoComplete="name"
        />
        <input
          required
          className="field"
          type="tel"
          placeholder={f.phone}
          value={form.phone}
          onChange={set("phone")}
          autoComplete="tel"
        />
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-3 sm:grid-cols-2">
        <label className="relative block">
          <span className="absolute top-1.5 left-4 text-[11px] tracking-wider text-ink-muted uppercase lg:text-[10px]">
            {f.date}
          </span>
          <input className="field pt-5" type="date" value={form.date} onChange={set("date")} />
        </label>
        <label className="relative block">
          <span className="absolute top-1.5 left-4 text-[11px] tracking-wider text-ink-muted uppercase lg:text-[10px]">
            {f.people}
          </span>
          <select className="field pt-5" value={form.people} onChange={set("people")}>
            {["1", "2", "3-5", "6+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="relative block">
          <span className="absolute top-1.5 left-4 text-[11px] tracking-wider text-ink-muted uppercase lg:text-[10px]">
            {f.concept}
          </span>
          <select className="field pt-5" value={form.concept} onChange={set("concept")}>
            <option value="">{f.undecided}</option>
            {concepts.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="relative block">
          <span className="absolute top-1.5 left-4 text-[11px] tracking-wider text-ink-muted uppercase lg:text-[10px]">
            {f.plan}
          </span>
          <select className="field pt-5" value={form.plan} onChange={set("plan")}>
            <option value="">{f.undecided}</option>
            {plans.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <textarea
        className={cn("field resize-none", compact ? "min-h-[72px]" : "min-h-[110px]")}
        placeholder={f.note}
        value={form.note}
        onChange={set("note")}
      />

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-white shadow-card transition hover:bg-rose-deep disabled:opacity-60"
      >
        {state === "sending" ? f.sending : f.submit}
      </button>

      <p
        className={cn(
          "text-center text-[12px] leading-relaxed",
          state === "error" ? "text-rose-deep" : "text-ink-muted",
        )}
      >
        {state === "error" ? f.error : copied ? "Đã sao chép nội dung." : f.privacy}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-ink-muted">
        <span>{f.or}</span>
        <button
          type="button"
          onClick={() => openChannel("messenger")}
          className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-ink"
        >
          <Messenger className="h-4 w-4" /> Messenger
        </button>
        <button
          type="button"
          onClick={() => openChannel("zalo")}
          className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-ink"
        >
          <Zalo className="h-5 w-5" /> Zalo
        </button>
        <a href={`tel:${site.phoneRaw}`} className="text-ink/80 transition hover:text-ink">
          {site.phone}
        </a>
      </div>
    </form>
  );
}
