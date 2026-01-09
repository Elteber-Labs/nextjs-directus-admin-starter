"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ensureStore, listEvents, DemoEvent } from "../../lib/demoStore";

export default function EventsPage() {
  const [items, setItems] = useState<DemoEvent[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    ensureStore();
    setItems(listEvents());
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((e) =>
      [e.title, e.modern_location, e.year_from].some((x) =>
        x.toLowerCase().includes(query)
      )
    );
  }, [items, q]);

  return (
    <main className="mx-auto max-w-6xl p-6 sm:p-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-sm leading-relaxed text-neutral-300">
            This demo uses <span className="font-semibold text-neutral-200">localStorage</span> for real save/edit.
            Next step: swap to Directus API.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200">
            Demo • Real save (local)
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm hover:bg-neutral-900"
            >
              Dashboard
            </Link>
            <Link
              href="/events/new"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              New Event
            </Link>
          </div>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-neutral-300">
          Records: <span className="font-semibold text-neutral-100">{filtered.length}</span>
        </div>

        <input
          spellCheck={false}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title / location / year..."
          className="w-full sm:w-80 rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/30">
        <table className="w-full text-sm">
          <thead className="bg-neutral-950/60 text-neutral-200">
            <tr className="border-b border-neutral-800">
              <th className="p-4 text-left font-semibold">Title</th>
              <th className="p-4 text-left font-semibold w-40">Year (from)</th>
              <th className="p-4 text-left font-semibold">Modern location</th>
              <th className="p-4 text-left font-semibold w-24">Edit</th>
            </tr>
          </thead>

          <tbody className="text-neutral-200">
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-neutral-900/60 hover:bg-neutral-900/40">
                <td className="p-4 align-middle font-medium">{e.title}</td>
                <td className="p-4 align-middle text-neutral-300">{e.year_from}</td>
                <td className="p-4 align-middle text-neutral-300">{e.modern_location}</td>
                <td className="p-4 align-middle">
                  <Link href={`/events/${e.id}`} className="text-indigo-300 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="p-6 text-neutral-400" colSpan={4}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <div className="mt-4 text-xs text-neutral-500">
        Note: localStorage is per-browser. On Vercel, it still works per visitor.
      </div>
    </main>
  );
}
