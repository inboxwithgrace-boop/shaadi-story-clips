import { createFileRoute } from "@tanstack/react-router";
import { TEMPLATES } from "@/lib/wedding/templates";
import { TemplateCard } from "@/components/wedding/TemplateCard";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Wedding Video Templates — WedMotion" },
      {
        name: "description",
        content:
          "Four premium Indian wedding invitation video templates: Royal Heritage, Modern Love Story, Floral Romance and Indian Celebration.",
      },
      { property: "og:title", content: "Wedding Video Templates — WedMotion" },
      {
        property: "og:description",
        content: "Choose a cinematic template for your wedding invitation video.",
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
        Template gallery
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        Choose a <span className="gold-text">template</span>
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every template is a vertical 9:16 film built for WhatsApp and Instagram,
        designed around Indian wedding traditions.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPLATES.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </div>
  );
}
