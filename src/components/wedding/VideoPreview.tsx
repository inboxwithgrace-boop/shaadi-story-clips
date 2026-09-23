import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { buildScenes, type Scene } from "@/lib/wedding/scenes";
import { getTemplate } from "@/lib/wedding/templates";
import { getTrack } from "@/lib/wedding/music";
import type { WeddingProject } from "@/lib/wedding/types";
import { cn } from "@/lib/utils";

const SCENE_MS = 3600;

function SceneBody({
  scene,
  style,
}: {
  scene: Scene;
  style: ReturnType<typeof getTemplate>["style"];
}) {
  const eyebrow = (
    <p
      className="text-[0.6rem] sm:text-[0.66rem]"
      style={{
        color: style.accent,
        letterSpacing: style.letterSpacing,
        textTransform: style.uppercase ? "uppercase" : "none",
      }}
    >
      {scene.eyebrow}
    </p>
  );

  if (scene.kind === "photo") {
    return (
      <div className="absolute inset-0">
        {scene.photo ? (
          <img
            src={scene.photo}
            alt=""
            className="ken-burns h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xs"
            style={{ color: style.muted }}
          >
            Add a photo to fill this scene
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        {scene.headline ? (
          <p
            className="absolute inset-x-0 bottom-10 px-6 text-center text-lg text-white sm:text-2xl"
            style={{ fontFamily: style.displayFont }}
          >
            {scene.headline}
          </p>
        ) : null}
      </div>
    );
  }

  const size =
    scene.kind === "names"
      ? "text-[2rem] leading-[1.1] sm:text-[2.7rem]"
      : scene.kind === "closing"
        ? "text-2xl sm:text-3xl"
        : "text-xl sm:text-2xl";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-7 text-center">
      {scene.eyebrow ? eyebrow : null}
      <div className="hairline w-14 opacity-70" style={{ background: style.rule }} />
      <h3
        className={cn("whitespace-pre-line font-normal", size)}
        style={{ fontFamily: style.displayFont, color: style.ink }}
      >
        {scene.headline}
      </h3>
      {scene.sub ? (
        <p
          className="text-[0.7rem] sm:text-xs"
          style={{
            color: style.muted,
            letterSpacing: "0.18em",
            textTransform: style.uppercase ? "uppercase" : "none",
          }}
        >
          {scene.sub}
        </p>
      ) : null}
      {scene.body ? (
        <p
          className="max-w-[22ch] text-[0.72rem] leading-relaxed sm:text-sm"
          style={{ color: style.muted }}
        >
          {scene.body}
        </p>
      ) : null}
    </div>
  );
}

export function VideoPreview({
  project,
  className,
  showNote = true,
}: {
  project: WeddingProject;
  className?: string;
  showNote?: boolean;
}) {
  const template = getTemplate(project.template);
  const scenes = useMemo(() => buildScenes(project), [project]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (index > scenes.length - 1) setIndex(0);
  }, [scenes.length, index]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % scenes.length),
      SCENE_MS,
    );
    return () => clearTimeout(t);
  }, [playing, index, scenes.length]);

  const scene = scenes[Math.min(index, scenes.length - 1)] as Scene;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-auto w-full max-w-[320px]">
        <div className="rounded-[2rem] border border-primary/30 bg-card p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div
            className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.6rem]"
            style={{ background: template.style.background }}
          >
            <div key={scene.key + project.template} className="scene-in absolute inset-0">
              <SceneBody scene={scene} style={template.style} />
            </div>

            {/* scene progress */}
            <div className="absolute inset-x-3 top-3 flex gap-1">
              {scenes.map((s, i) => (
                <span
                  key={s.key}
                  className="h-[2px] flex-1 overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                >
                  <span
                    className="block h-full"
                    style={{
                      width: i <= index ? "100%" : "0%",
                      background: template.style.accent,
                      transition: "width .4s linear",
                    }}
                  />
                </span>
              ))}
            </div>

            <div
              className="absolute inset-x-0 bottom-2 text-center text-[0.55rem] uppercase tracking-[0.3em]"
              style={{ color: template.style.muted }}
            >
              {template.name}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous scene"
          onClick={() => setIndex((i) => (i - 1 + scenes.length) % scenes.length)}
          className="rounded-full border border-border p-2 text-foreground/80 transition hover:border-primary hover:text-primary"
        >
          <SkipBack className="size-4" />
        </button>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full bg-primary p-3 text-primary-foreground transition hover:opacity-90"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          aria-label="Next scene"
          onClick={() => setIndex((i) => (i + 1) % scenes.length)}
          className="rounded-full border border-border p-2 text-foreground/80 transition hover:border-primary hover:text-primary"
        >
          <SkipForward className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Restart"
          onClick={() => {
            setIndex(0);
            setPlaying(true);
          }}
          className="rounded-full border border-border p-2 text-foreground/80 transition hover:border-primary hover:text-primary"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>

      <p className="mt-3 text-center text-[0.7rem] text-muted-foreground">
        Scene {index + 1} of {scenes.length} — {scene.label} · Music:{" "}
        {getTrack(project.music).name}
      </p>
      {showNote ? (
        <p className="mt-1 text-center text-[0.7rem] text-primary/80">
          Preview — Your final video will be rendered after confirmation.
        </p>
      ) : null}
    </div>
  );
}
