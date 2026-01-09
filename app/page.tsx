import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Elteber Labs Admin Demo</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Next.js + Directus scaffold: dashboard, list, create/edit.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/events"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            View Events
          </Link>
          <Link
            href="/events/new"
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            New Event
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-xs text-neutral-500">Status</div>
          <div className="mt-1 font-semibold">Local demo running</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-neutral-500">Collections</div>
          <div className="mt-1 font-semibold">events (mock)</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-neutral-500">Next step</div>
          <div className="mt-1 font-semibold">Connect Directus API</div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border p-6">
        <h2 className="text-lg font-semibold">What this demo proves</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700">
          <li>Clean admin scaffold (dashboard + navigation)</li>
          <li>Events listing UI</li>
          <li>Create/Edit form UI</li>
          <li>Ready to wire Directus REST endpoints</li>
        </ul>
      </div>
    </main>
  );
}
