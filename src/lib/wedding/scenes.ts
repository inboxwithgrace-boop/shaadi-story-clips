import type { WeddingProject } from "./types";
import { formatWeddingDate, formatWeddingTime } from "./store";

export interface Scene {
  key: string;
  label: string;
  kind: "title" | "names" | "text" | "photo" | "detail" | "closing";
  eyebrow?: string;
  headline?: string;
  sub?: string;
  body?: string;
  photo?: string;
}

/** Scene 1 — 11 structure, always derived from the customer's own data. */
export function buildScenes(p: WeddingProject): Scene[] {
  const photo = (id: string) => p.photos.find((x) => x.id === id)?.dataUrl;
  const extras = p.photos.filter(
    (x) => !["bride", "groom", "couple1", "couple2", "family"].includes(x.id),
  );
  const bride = p.brideName || "Bride";
  const groom = p.groomName || "Groom";

  const scenes: Scene[] = [
    {
      key: "s1",
      label: "Opening",
      kind: "title",
      eyebrow: "Save the date",
      headline: "A wedding invitation",
      sub: p.hashtag || formatWeddingDate(p.weddingDate),
    },
    {
      key: "s2",
      label: "Names",
      kind: "names",
      eyebrow: p.brideNickname && p.groomNickname
        ? `${p.brideNickname} & ${p.groomNickname}`
        : "Together forever",
      headline: `${bride}\n&\n${groom}`,
    },
    {
      key: "s3",
      label: "Families",
      kind: "text",
      headline: "Together with our families",
      sub: "we invite you to celebrate with us",
    },
    {
      key: "s4",
      label: "Couple photo",
      kind: "photo",
      photo: photo("couple1") ?? photo("bride") ?? photo("groom"),
      headline: `${bride} & ${groom}`,
    },
    {
      key: "s5",
      label: "Our story",
      kind: "text",
      eyebrow: "Our Story",
      headline: p.story.howWeMet || "How it all began",
      body: p.story.ourStory,
    },
    {
      key: "s6",
      label: "Wedding date",
      kind: "detail",
      eyebrow: "The wedding day",
      headline: formatWeddingDate(p.weddingDate) || "Date to be announced",
      sub: formatWeddingTime(p.weddingTime),
    },
    {
      key: "s7",
      label: "Venue",
      kind: "detail",
      eyebrow: "Venue",
      headline: p.venue || "Venue to be announced",
      sub: p.city,
    },
    {
      key: "s8",
      label: "Family details",
      kind: "text",
      eyebrow: "With the blessings of",
      headline: [p.brideParents, p.groomParents].filter(Boolean).join("\n&\n") ||
        "Our families",
      body: p.otherFamily,
    },
    {
      key: "s9",
      label: "More photos",
      kind: "photo",
      photo:
        photo("couple2") ?? extras[0]?.dataUrl ?? photo("family") ?? photo("bride"),
      headline: p.hashtag || "",
    },
    {
      key: "s10",
      label: "Invitation",
      kind: "detail",
      eyebrow: "You are invited",
      headline: `${bride} & ${groom}`,
      sub: [formatWeddingDate(p.weddingDate), p.venue, p.city]
        .filter(Boolean)
        .join(" · "),
      body: p.story.specialMessage,
    },
    {
      key: "s11",
      label: "Closing",
      kind: "closing",
      headline: "Join us as we begin forever.",
      sub: p.hashtag,
    },
  ];

  return scenes;
}
