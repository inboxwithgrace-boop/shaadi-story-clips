import { Link } from "@tanstack/react-router";
import type { VideoTemplate } from "@/lib/wedding/templates";

export function TemplateCard({
  template,
  onUse,
  selected,
}: {
  template: VideoTemplate;
  onUse?: (id: string) => void;
  selected?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-card transition ${
        selected ? "border-primary shadow-[0_0_0_1px_var(--gold)]" : "border-border/70"
      }`}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={template.cover}
          alt={`${template.name} wedding video template preview`}
          loading="lazy"
          width={768}
          height={1344}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary">
            {template.tagline}
          </p>
          <h3 className="font-display text-2xl text-white">{template.name}</h3>
        </div>
        {template.premium ? (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-primary-foreground">
            Premium
          </span>
        ) : null}
      </div>
      <div className="space-y-4 p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {template.description}
        </p>
        <div className="flex gap-1.5">
          {template.palette.map((c) => (
            <span
              key={c}
              className="size-4 rounded-full border border-white/20"
              style={{ background: c }}
            />
          ))}
        </div>
        {onUse ? (
          <button
            type="button"
            onClick={() => onUse(template.id)}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {selected ? "Selected" : "Use This Template"}
          </button>
        ) : (
          <Link
            to="/create"
            search={{ template: template.id }}
            className="block w-full rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Use This Template
          </Link>
        )}
      </div>
    </article>
  );
}
