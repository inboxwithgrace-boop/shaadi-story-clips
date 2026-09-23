import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VideoPreview } from "@/components/wedding/VideoPreview";
import { formatWeddingDate, formatWeddingTime, useProjects } from "@/lib/wedding/store";
import { getTemplate } from "@/lib/wedding/templates";
import { getTrack } from "@/lib/wedding/music";
import { getPackage } from "@/lib/wedding/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Wedding Video — WedMotion" },
      {
        name: "description",
        content:
          "Track your wedding video order, review your details, photos and personalised preview.",
      },
      { property: "og:title", content: "My Wedding Video — WedMotion" },
      {
        property: "og:description",
        content: "Your wedding video order status and preview.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const projects = useProjects();
  const [activeId, setActiveId] = useState<string | null>(null);
  const project = projects.find((p) => p.id === activeId) ?? projects[0];
  const pkg = getPackage(project.package);
  const ready = project.render.state === "ready" && project.render.videoUrl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Dashboard</p>
      <h1 className="mt-3 font-display text-4xl">My Wedding Video</h1>

      {projects.length > 1 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`rounded-full border px-4 py-1.5 text-xs transition ${
                p.id === project.id ? "border-primary text-primary" : "border-border"
              }`}
            >
              {p.brideName} & {p.groomName}
              {p.isDemo ? " (demo)" : ""}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <VideoPreview project={project} />
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Order status</h2>
              <span className="rounded-full border border-primary/60 px-3 py-1 text-xs text-primary">
                {project.orderStatus}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Order {project.orderId ?? "—"} · {getTemplate(project.template).name} ·{" "}
              {pkg.name} package
            </p>
            {ready ? (
              <a
                href={project.render.videoUrl!}
                download
                className="mt-5 block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Download your video
              </a>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-border px-5 py-4 text-center text-sm text-muted-foreground">
                Your video is being prepared. The download button appears here once the
                final file is ready.
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="font-display text-2xl">Wedding details</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                ["Couple", `${project.brideName} & ${project.groomName}`],
                [
                  "Date",
                  [formatWeddingDate(project.weddingDate), formatWeddingTime(project.weddingTime)]
                    .filter(Boolean)
                    .join(" · ") || "—",
                ],
                ["Venue", [project.venue, project.city].filter(Boolean).join(", ") || "—"],
                ["Bride's parents", project.brideParents || "—"],
                ["Groom's parents", project.groomParents || "—"],
                ["Music", getTrack(project.music).name],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="font-display text-2xl">Uploaded photos</h2>
            {project.photos.length ? (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {project.photos.map((p) => (
                  <img
                    key={p.id}
                    src={p.dataUrl}
                    alt={p.label}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">No photos uploaded yet.</p>
            )}
          </section>

          <Link
            to="/create"
            search={{ template: project.template }}
            className="inline-block text-sm text-primary hover:underline"
          >
            Start another wedding video →
          </Link>
        </div>
      </div>
    </div>
  );
}
