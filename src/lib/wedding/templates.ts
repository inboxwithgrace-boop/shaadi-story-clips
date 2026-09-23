import royal from "@/assets/tpl-royal.jpg";
import modern from "@/assets/tpl-modern.jpg";
import floral from "@/assets/tpl-floral.jpg";
import celebration from "@/assets/tpl-celebration.jpg";

export interface TemplateStyle {
  /** CSS background for the vertical canvas */
  background: string;
  ink: string;
  muted: string;
  accent: string;
  rule: string;
  displayFont: string;
  bodyFont: string;
  letterSpacing: string;
  uppercase: boolean;
}

export interface VideoTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  palette: string[];
  cover: string;
  premium: boolean;
  style: TemplateStyle;
}

export const TEMPLATES: VideoTemplate[] = [
  {
    id: "royal-heritage",
    name: "Royal Heritage",
    tagline: "Burgundy · Gold · Ivory",
    description:
      "Traditional Indian luxury with palace-inspired framing, elegant serif typography and candlelit gold detailing.",
    palette: ["#4a0d1f", "#c8a04a", "#f6efe2"],
    cover: royal,
    premium: false,
    style: {
      background:
        "radial-gradient(120% 90% at 50% 0%, #6b1630 0%, #400c1c 45%, #22060f 100%)",
      ink: "#f7efe0",
      muted: "rgba(247,239,224,0.72)",
      accent: "#d9b263",
      rule: "rgba(217,178,99,0.55)",
      displayFont: "var(--font-display)",
      bodyFont: "var(--font-sans)",
      letterSpacing: "0.34em",
      uppercase: true,
    },
  },
  {
    id: "modern-love-story",
    name: "Modern Love Story",
    tagline: "Cream · Black · Muted gold",
    description:
      "Minimal luxury storytelling. Quiet typography, wide margins and cinematic couple-first framing.",
    palette: ["#efe9df", "#1a1a1a", "#b39a6b"],
    cover: modern,
    premium: false,
    style: {
      background:
        "linear-gradient(170deg, #f2ece2 0%, #e6ded1 55%, #d9d0c2 100%)",
      ink: "#191714",
      muted: "rgba(25,23,20,0.62)",
      accent: "#9a7f4f",
      rule: "rgba(25,23,20,0.25)",
      displayFont: "var(--font-sans)",
      bodyFont: "var(--font-sans)",
      letterSpacing: "0.42em",
      uppercase: true,
    },
  },
  {
    id: "floral-romance",
    name: "Floral Romance",
    tagline: "Ivory · Blush · Botanical",
    description:
      "Soft romantic aesthetic with blush washes, delicate floral rules and gentle dissolve transitions.",
    palette: ["#fbf3ef", "#e7b7ae", "#8c5b57"],
    cover: floral,
    premium: true,
    style: {
      background:
        "radial-gradient(110% 80% at 50% 10%, #fdf6f2 0%, #f6e2dc 55%, #eccfc8 100%)",
      ink: "#5c3a38",
      muted: "rgba(92,58,56,0.66)",
      accent: "#c47f74",
      rule: "rgba(196,127,116,0.5)",
      displayFont: "var(--font-display)",
      bodyFont: "var(--font-sans)",
      letterSpacing: "0.3em",
      uppercase: false,
    },
  },
  {
    id: "indian-celebration",
    name: "Indian Celebration",
    tagline: "Marigold · Vermilion · Gold",
    description:
      "Rich festive colours, traditional motifs and an energetic baraat-night atmosphere.",
    palette: ["#a11d1d", "#e8871e", "#ffd88a"],
    cover: celebration,
    premium: true,
    style: {
      background:
        "radial-gradient(120% 90% at 50% 100%, #c2401a 0%, #8f1717 48%, #3d0a0a 100%)",
      ink: "#fff3d9",
      muted: "rgba(255,243,217,0.75)",
      accent: "#ffcf78",
      rule: "rgba(255,207,120,0.55)",
      displayFont: "var(--font-display)",
      bodyFont: "var(--font-sans)",
      letterSpacing: "0.3em",
      uppercase: true,
    },
  },
];

export const getTemplate = (id: string): VideoTemplate =>
  TEMPLATES.find((t) => t.id === id) ?? (TEMPLATES[0] as VideoTemplate);
