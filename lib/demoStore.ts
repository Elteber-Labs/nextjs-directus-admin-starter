export type DemoEvent = {
  id: string;
  title: string;
  year_from: string;
  modern_location: string;
  summary: string;
  updated_at: number;
};

const STORAGE_KEY = "elteber_demo_events_v1";

function seed(): DemoEvent[] {
  const now = Date.now();
  return [
    {
      id: "1",
      title: "Göbekli Tepe",
      year_from: "-9600",
      modern_location: "Şanlıurfa, Turkey",
      summary: "Early monumental architecture and ritual complex (demo seed).",
      updated_at: now,
    },
    {
      id: "2",
      title: "Çatalhöyük",
      year_from: "-7400",
      modern_location: "Konya, Turkey",
      summary: "Large Neolithic settlement (demo seed).",
      updated_at: now,
    },
    {
      id: "3",
      title: "Lascaux Cave",
      year_from: "-17000",
      modern_location: "Dordogne, France",
      summary: "Upper Paleolithic cave art (demo seed).",
      updated_at: now,
    },
  ];
}

function safeParse(raw: string | null): DemoEvent[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as DemoEvent[];
  } catch {
    return null;
  }
}

export function ensureStore() {
  if (typeof window === "undefined") return;
  const existing = safeParse(localStorage.getItem(STORAGE_KEY));
  if (!existing) localStorage.setItem(STORAGE_KEY, JSON.stringify(seed()));
}

export function listEvents(): DemoEvent[] {
  if (typeof window === "undefined") return [];
  ensureStore();
  const data = safeParse(localStorage.getItem(STORAGE_KEY)) ?? [];
  return [...data].sort((a, b) => b.updated_at - a.updated_at);
}

export function getEvent(id: string): DemoEvent | null {
  const items = listEvents();
  return items.find((e) => e.id === id) ?? null;
}

export function createEvent(input: Omit<DemoEvent, "id" | "updated_at">): DemoEvent {
  const items = listEvents();
  const id = String(Date.now());
  const next: DemoEvent = { ...input, id, updated_at: Date.now() };
  const merged = [next, ...items];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return next;
}

export function updateEvent(
  id: string,
  patch: Partial<Omit<DemoEvent, "id">>
): DemoEvent | null {
  const items = listEvents();
  const idx = items.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const updated: DemoEvent = {
    ...items[idx],
    ...patch,
    id,
    updated_at: Date.now(),
  };

  const next = items.map((e) => (e.id === id ? updated : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return updated;
}
