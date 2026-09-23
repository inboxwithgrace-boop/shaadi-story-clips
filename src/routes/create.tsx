import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { z } from "zod";
import { TEMPLATES, getTemplate } from "@/lib/wedding/templates";
import { MUSIC_TRACKS, getTrack } from "@/lib/wedding/music";
import { VideoPreview } from "@/components/wedding/VideoPreview";
import { AdditionalPhotos, PhotoSlot } from "@/components/wedding/PhotoUploader";
import {
  clearDraft,
  emptyProject,
  formatWeddingDate,
  loadDraft,
  makeOrderId,
  saveDraft,
  saveProject,
} from "@/lib/wedding/store";
import { renderService } from "@/lib/wedding/rendering";
import { PACKAGES, getPackage, type PackageId, type WeddingProject } from "@/lib/wedding/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/create")({
  validateSearch: z.object({ template: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Create Your Wedding Video — WedMotion" },
      {
        name: "description",
        content:
          "Add your wedding details, upload photos, choose music and preview your personalised invitation video scene by scene.",
      },
      { property: "og:title", content: "Create Your Wedding Video — WedMotion" },
      {
        property: "og:description",
        content: "Personalise your Indian wedding invitation video in a few guided steps.",
      },
    ],
  }),
  component: CreatePage,
});

const SLOTS = [
  { id: "bride", label: "Bride photo" },
  { id: "groom", label: "Groom photo" },
  { id: "couple1", label: "Couple photo 1" },
  { id: "couple2", label: "Couple photo 2" },
  { id: "family", label: "Family photo" },
] as const;

const STEP_TITLES = [
  "Template",
  "Couple",
  "Wedding",
  "Family",
  "Story",
  "Photos",
  "Music",
  "Preview",
  "Order",
];

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {optional ? <span className="ml-1 normal-case text-muted-foreground/60">(optional)</span> : null}
      </Label>
      {children}
    </div>
  );
}

function CreatePage() {
  const { template: templateParam } = Route.useSearch();
  const navigate = useNavigate();
  const [project, setProject] = useState<WeddingProject>(() =>
    emptyProject(templateParam ?? "royal-heritage"),
  );
  const [step, setStep] = useState(templateParam ? 1 : 0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setProject({ ...draft, template: templateParam ?? draft.template });
    } else if (templateParam) {
      setProject((p) => ({ ...p, template: templateParam }));
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hydrated) saveDraft(project);
  }, [project, hydrated]);

  const set = <K extends keyof WeddingProject>(key: K, value: WeddingProject[K]) =>
    setProject((p) => ({ ...p, [key]: value }));

  const pkg = getPackage(project.package);
  const extras = project.photos.filter((p) => p.id.startsWith("extra-"));
  const maxExtras = Math.max(0, pkg.maxPhotos - SLOTS.length);

  const setPhoto = (id: string, label: string, photo: { dataUrl: string } | null) =>
    setProject((p) => {
      const rest = p.photos.filter((x) => x.id !== id);
      return photo ? { ...p, photos: [...rest, { id, label, dataUrl: photo.dataUrl }] } : { ...p, photos: rest };
    });

  const total = STEP_TITLES.length;
  const canNext = useMemo(() => {
    if (step === 1) return project.brideName.trim() && project.groomName.trim();
    if (step === 2) return project.weddingDate && project.venue.trim() && project.city.trim();
    return true;
  }, [step, project]);

  async function submitOrder() {
    const orderId = makeOrderId();
    const job = await renderService.submit(project);
    const finalProject: WeddingProject = {
      ...project,
      orderId,
      orderStatus: "Payment Pending",
      render: { state: job.state, videoUrl: job.videoUrl },
      createdAt: new Date().toISOString(),
    };
    saveProject(finalProject);
    clearDraft();
    navigate({ to: "/order/$orderId", params: { orderId } });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
            Step {step + 1} of {total}
          </p>
          <h1 className="mt-2 truncate font-display text-3xl sm:text-4xl">
            {STEP_TITLES[step]}
          </h1>
        </div>
        <p className="shrink-0 text-right text-xs text-muted-foreground">
          {getTemplate(project.template).name}
          <br />
          {pkg.name} · ₹{pkg.price}
        </p>
      </div>

      <div className="mt-5 flex gap-1">
        {STEP_TITLES.map((t, i) => (
          <button
            key={t}
            type="button"
            aria-label={t}
            onClick={() => i <= step && setStep(i)}
            className={`h-1 flex-1 rounded-full transition ${
              i <= step ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {step === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    set("template", t.id);
                    setStep(1);
                  }}
                  className={`overflow-hidden rounded-2xl border text-left transition ${
                    project.template === t.id ? "border-primary" : "border-border/70"
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <img
                      src={t.cover}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <p className="absolute bottom-3 left-4 font-display text-xl text-white">
                      {t.name}
                    </p>
                  </div>
                  <p className="p-4 text-xs text-muted-foreground">{t.description}</p>
                </button>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Bride name">
                <Input
                  value={project.brideName}
                  onChange={(e) => set("brideName", e.target.value)}
                  placeholder="e.g. Shreya"
                />
              </Field>
              <Field label="Groom name">
                <Input
                  value={project.groomName}
                  onChange={(e) => set("groomName", e.target.value)}
                  placeholder="e.g. Shashwat"
                />
              </Field>
              <Field label="Bride nickname" optional>
                <Input
                  value={project.brideNickname ?? ""}
                  onChange={(e) => set("brideNickname", e.target.value)}
                />
              </Field>
              <Field label="Groom nickname" optional>
                <Input
                  value={project.groomNickname ?? ""}
                  onChange={(e) => set("groomNickname", e.target.value)}
                />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Wedding date">
                <Input
                  type="date"
                  value={project.weddingDate}
                  onChange={(e) => set("weddingDate", e.target.value)}
                />
              </Field>
              <Field label="Wedding time" optional>
                <Input
                  type="time"
                  value={project.weddingTime ?? ""}
                  onChange={(e) => set("weddingTime", e.target.value)}
                />
              </Field>
              <Field label="Venue">
                <Input
                  value={project.venue}
                  onChange={(e) => set("venue", e.target.value)}
                  placeholder="e.g. Royal Palace"
                />
              </Field>
              <Field label="City">
                <Input
                  value={project.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="e.g. Jaipur"
                />
              </Field>
              <Field label="Wedding hashtag" optional>
                <Input
                  value={project.hashtag ?? ""}
                  onChange={(e) => set("hashtag", e.target.value)}
                  placeholder="#ShreyaMeetsShashwat"
                />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <Field label="Bride's parents">
                <Input
                  value={project.brideParents ?? ""}
                  onChange={(e) => set("brideParents", e.target.value)}
                  placeholder="Mr. & Mrs. ..."
                />
              </Field>
              <Field label="Groom's parents">
                <Input
                  value={project.groomParents ?? ""}
                  onChange={(e) => set("groomParents", e.target.value)}
                  placeholder="Mr. & Mrs. ..."
                />
              </Field>
              <Field label="Other family names" optional>
                <Textarea
                  rows={3}
                  value={project.otherFamily ?? ""}
                  onChange={(e) => set("otherFamily", e.target.value)}
                />
              </Field>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">
                This step is optional — you can skip it and still get a beautiful video.
              </p>
              <Field label="How we met" optional>
                <Textarea
                  rows={3}
                  value={project.story.howWeMet ?? ""}
                  onChange={(e) =>
                    set("story", { ...project.story, howWeMet: e.target.value })
                  }
                />
              </Field>
              <Field label="Our story" optional>
                <Textarea
                  rows={4}
                  value={project.story.ourStory ?? ""}
                  onChange={(e) =>
                    set("story", { ...project.story, ourStory: e.target.value })
                  }
                />
              </Field>
              <Field label="Special message" optional>
                <Textarea
                  rows={3}
                  value={project.story.specialMessage ?? ""}
                  onChange={(e) =>
                    set("story", { ...project.story, specialMessage: e.target.value })
                  }
                />
              </Field>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-7">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
                {SLOTS.map((s) => (
                  <PhotoSlot
                    key={s.id}
                    id={s.id}
                    label={s.label}
                    photo={project.photos.find((p) => p.id === s.id)}
                    onChange={(photo) => setPhoto(s.id, s.label, photo)}
                  />
                ))}
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Additional photos · {project.photos.length}/{pkg.maxPhotos} used
                </p>
                <AdditionalPhotos
                  photos={extras}
                  max={maxExtras}
                  onAdd={(next) =>
                    setProject((p) => ({ ...p, photos: [...p.photos, ...next] }))
                  }
                  onRemove={(id) =>
                    setProject((p) => ({
                      ...p,
                      photos: p.photos.filter((x) => x.id !== id),
                    }))
                  }
                />
              </div>
            </div>
          ) : null}

          {step === 6 ? (
            <div className="space-y-3">
              {MUSIC_TRACKS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => set("music", t.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition ${
                    project.music === t.id
                      ? "border-primary bg-secondary/50"
                      : "border-border/70 hover:border-primary/50"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block font-display text-lg">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.mood}</span>
                  </span>
                  {project.music === t.id ? (
                    <Check className="size-4 shrink-0 text-primary" />
                  ) : null}
                </button>
              ))}
              <p className="text-xs text-muted-foreground">
                Royalty-free placeholder tracks only — no copyrighted commercial songs.
              </p>
            </div>
          ) : null}

          {step === 7 ? (
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
              <h2 className="font-display text-2xl">Your film, scene by scene</h2>
              <p className="text-sm text-muted-foreground">
                Every scene below uses the details you entered. Go back to any step to
                change names, dates, venue, photos or story — the preview updates
                instantly.
              </p>
              <div className="lg:hidden">
                <VideoPreview project={project} />
              </div>
            </div>
          ) : null}

          {step === 8 ? (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => set("package", p.id as PackageId)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      project.package === p.id
                        ? "border-primary bg-secondary/50"
                        : "border-border/70"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-xl">{p.name}</span>
                      <span className="gold-text font-display text-2xl">₹{p.price}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      {p.features.map((f) => (
                        <li key={f}>· {f}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-6">
                <h2 className="font-display text-2xl">Order summary</h2>
                <dl className="mt-4 space-y-2.5 text-sm">
                  {([
                    ["Template", getTemplate(project.template).name],
                    [
                      "Couple",
                      [project.brideName, project.groomName].filter(Boolean).join(" & ") ||
                        "—",
                    ],
                    ["Wedding date", formatWeddingDate(project.weddingDate) || "—"],
                    ["Photos", `${project.photos.length} uploaded`],
                    ["Music", getTrack(project.music).name],
                    ["Package", pkg.name],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border/40 pb-2">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-display text-xl">
                    <dt>Price</dt>
                    <dd className="gold-text">₹{pkg.price}</dd>
                  </div>
                </dl>
                <Field label="Your name (for the order)">
                  <Input
                    className="mt-4"
                    value={project.customerName ?? ""}
                    onChange={(e) => set("customerName", e.target.value)}
                    placeholder="Who should we contact?"
                  />
                </Field>
                <button
                  type="button"
                  onClick={submitOrder}
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Continue to Payment
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Placeholder checkout — no payment gateway is connected yet, so nothing
                  is charged. Your order is recorded as “Payment Pending”.
                </p>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition enabled:hover:border-primary disabled:opacity-40"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < 8 ? (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setStep((s) => Math.min(8, s + 1))}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition enabled:hover:opacity-90 disabled:opacity-40"
              >
                {step === 4 ? "Skip / Continue" : step === 7 ? "Continue" : "Next"}
                <ArrowRight className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <VideoPreview project={project} />
          </div>
        </aside>
      </div>

      {step !== 7 ? (
        <div className="mt-12 lg:hidden">
          <VideoPreview project={project} />
        </div>
      ) : null}
    </div>
  );
}
