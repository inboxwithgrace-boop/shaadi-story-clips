import { useSyncExternalStore } from "react";
import type { PackageId, OrderStatus, WeddingProject } from "./types";
import royal from "@/assets/tpl-royal.jpg";
import modern from "@/assets/tpl-modern.jpg";
import floral from "@/assets/tpl-floral.jpg";
import celebration from "@/assets/tpl-celebration.jpg";

const KEY = "wedmotion.projects.v1";
const DRAFT_KEY = "wedmotion.draft.v1";

export const DEMO_PROJECT: WeddingProject = {
  id: "demo",
  orderId: "WM-DEMO-1212",
  customerName: "Shreya Agarwal",
  brideName: "Shreya",
  groomName: "Shashwat",
  brideNickname: "Shru",
  groomNickname: "Shash",
  weddingDate: "2026-12-12",
  weddingTime: "19:30",
  venue: "Royal Palace",
  city: "Jaipur",
  hashtag: "#ShreyaMeetsShashwat",
  brideParents: "Mr. & Mrs. Rajeev Agarwal",
  groomParents: "Mr. & Mrs. Anand Mishra",
  otherFamily: "With blessings of Dadi Saroj Devi & Nana Shyam Sundar",
  story: {
    howWeMet:
      "We met on a rainy evening in Jaipur, sharing one umbrella and a plate of kachoris.",
    ourStory:
      "Three winters of long drives, family dinners and a thousand voice notes later, one question changed everything.",
    specialMessage:
      "Your presence is the only gift we ask for. Come dance with us.",
  },
  photos: [
    { id: "bride", label: "Bride", dataUrl: floral },
    { id: "groom", label: "Groom", dataUrl: modern },
    { id: "couple1", label: "Couple photo 1", dataUrl: royal },
    { id: "couple2", label: "Couple photo 2", dataUrl: floral },
    { id: "family", label: "Family", dataUrl: celebration },
  ],
  music: "royal-celebration",
  template: "royal-heritage",
  package: "premium",
  orderStatus: "Rendering",
  render: { state: "queued", videoUrl: null },
  createdAt: "2026-09-01T10:00:00.000Z",
  isDemo: true,
};

export function emptyProject(template = "royal-heritage"): WeddingProject {
  return {
    id: crypto.randomUUID(),
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingTime: "",
    venue: "",
    city: "",
    story: {},
    photos: [],
    music: "royal-celebration",
    template,
    package: "standard",
    orderStatus: "Pending",
    render: { state: "not_started", videoUrl: null },
    createdAt: new Date().toISOString(),
  };
}

const listeners = new Set<() => void>();
let cacheRaw: string | null = null;
let cacheValue: WeddingProject[] = [DEMO_PROJECT];

function read(): WeddingProject[] {
  if (typeof window === "undefined") return [DEMO_PROJECT];
  const raw = window.localStorage.getItem(KEY);
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      const parsed = raw ? (JSON.parse(raw) as WeddingProject[]) : [];
      cacheValue = [DEMO_PROJECT, ...parsed];
    } catch {
      cacheValue = [DEMO_PROJECT];
    }
  }
  return cacheValue;
}

function write(projects: WeddingProject[]) {
  window.localStorage.setItem(
    KEY,
    JSON.stringify(projects.filter((p) => !p.isDemo)),
  );
  listeners.forEach((l) => l());
}

export function useProjects(): WeddingProject[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => [DEMO_PROJECT],
  );
}

export function saveProject(project: WeddingProject) {
  const existing = read().filter((p) => !p.isDemo);
  const idx = existing.findIndex((p) => p.id === project.id);
  if (idx >= 0) existing[idx] = project;
  else existing.unshift(project);
  write([DEMO_PROJECT, ...existing]);
}

export function setOrderStatus(id: string, status: OrderStatus) {
  const project = read().find((p) => p.id === id);
  if (!project || project.isDemo) return;
  saveProject({ ...project, orderStatus: status });
}

export function getProject(id: string): WeddingProject | undefined {
  return read().find((p) => p.id === id || p.orderId === id);
}

/* ---- draft (the in-progress create flow) ---- */

export function loadDraft(): WeddingProject | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as WeddingProject) : null;
  } catch {
    return null;
  }
}

export function saveDraft(project: WeddingProject) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(project));
  } catch {
    /* storage full — draft simply isn't persisted */
  }
}

export function clearDraft() {
  window.localStorage.removeItem(DRAFT_KEY);
}

export function makeOrderId() {
  return `WM-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(
    1000 + Math.random() * 8999,
  )}`;
}

export function packagePrice(id: PackageId) {
  return id === "premium" ? 999 : 499;
}

export function formatWeddingDate(value?: string) {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatWeddingTime(value?: string) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h)) return value;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m ?? 0).padStart(2, "0")} ${suffix}`;
}
