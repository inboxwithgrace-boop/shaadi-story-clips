import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import type { WeddingPhoto } from "@/lib/wedding/types";

async function downscale(file: File, max = 1000): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = dataUrl;
    });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.78);
  } catch {
    return dataUrl;
  }
}

export function PhotoSlot({
  id,
  label,
  photo,
  onChange,
}: {
  id: string;
  label: string;
  photo?: WeddingPhoto | undefined;
  onChange: (photo: WeddingPhoto | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-xl border border-dashed border-border bg-secondary/40"
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        {photo ? (
          <>
            <img src={photo.dataUrl} alt={label} className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label={`Remove ${label}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/70 p-1 text-white"
            >
              <X className="size-3.5" />
            </button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1.5 text-muted-foreground">
            <ImagePlus className="size-5" />
            <span className="px-2 text-center text-[0.65rem]">Upload</span>
          </div>
        )}
      </div>
      <p className="text-center text-xs text-muted-foreground">{label}</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const dataUrl = await downscale(file);
          onChange({ id, label, dataUrl });
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function AdditionalPhotos({
  photos,
  max,
  onAdd,
  onRemove,
}: {
  photos: WeddingPhoto[];
  max: number;
  onAdd: (photos: WeddingPhoto[]) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((p) => (
          <div key={p.id} className="relative aspect-square overflow-hidden rounded-xl">
            <img src={p.dataUrl} alt={p.label} className="h-full w-full object-cover" />
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onRemove(p.id)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={photos.length >= max}
        className="w-full rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-50"
      >
        {photos.length >= max
          ? "Photo limit reached for this package"
          : "Add more photos"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []);
          const room = Math.max(0, max - photos.length);
          const next: WeddingPhoto[] = [];
          for (const file of files.slice(0, room)) {
            next.push({
              id: `extra-${crypto.randomUUID()}`,
              label: "Additional photo",
              dataUrl: await downscale(file),
            });
          }
          onAdd(next);
          e.target.value = "";
        }}
      />
    </div>
  );
}
