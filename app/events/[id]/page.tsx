"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getEvent, updateEvent } from "../../../lib/demoStore";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "1";

  const [title, setTitle] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [modernLocation, setModernLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = getEvent(String(id));
    if (existing) {
      setTitle(existing.title);
      setYearFrom(existing.year_from);
      setModernLocation(existing.modern_location);
      setSummary(existing.summary);
    }
    setLoaded(true);
  }, [id]);

  function onSave() {
    if (!title.trim()) {
      alert("Title is required (demo validation).");
      return;
    }

    const updated = updateEvent(String(id), {
      title: title.trim(),
      year_from: yearFrom.trim(),
      modern_location: modernLocation.trim(),
      summary: summary.trim(),
    });

    if (!updated) {
      alert("Record not found (demo).");
      return;
    }

    router.push("/events");
  }

  return (
    <main className="mx-auto max-w-4xl p-6 sm:p-10">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Edit Event</h1>
          <p className="text-sm leading-relaxed text-neutral-300">
            Editing record id: <span className="font-mono text-neutral-100">{id}</span>
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 text-xs text-neutral-200">
            Demo • Edit + Save
          </div>

          <Link
            href="/events"
            className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-2 text-sm hover:bg-neutral-900"
          >
            Back to list
          </Link>
        </div>
      </header>

      <form className="mt-10 space-y-5 rounded-2xl border border-neutral-800 bg-neutral-950/30 p-6 shadow-sm">
        {!loaded ? (
          <div className="text-sm text-neutral-400">Loading...</div>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium text-neutral-200">Title *</label>
              <input
                spellCheck={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-neutral-200">Year from</label>
                <input
                  spellCheck={false}
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-200">Modern location</label>
                <input
                  spellCheck={false}
                  value={modernLocation}
                  onChange={(e) => setModernLocation(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">Summary</label>
              <textarea
                spellCheck={false}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40"
                rows={6}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-400">
                Saves to localStorage. After save you return to /events.
              </div>

              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
                onClick={onSave}
              >
                Save
              </button>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
