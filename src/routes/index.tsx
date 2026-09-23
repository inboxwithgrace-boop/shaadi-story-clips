import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Film, Heart, Images, PenLine, Play, Sparkles } from "lucide-react";
import { TEMPLATES } from "@/lib/wedding/templates";
import { TemplateCard } from "@/components/wedding/TemplateCard";
import { VideoPreview } from "@/components/wedding/VideoPreview";
import { DEMO_PROJECT } from "@/lib/wedding/store";
import { PACKAGES } from "@/lib/wedding/types";
import { FAQS } from "./faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WedMotion — Your Wedding Story, Turned Into a Beautiful Video" },
      {
        name: "description",
        content:
          "Create a personalised Indian wedding invitation video with your names, photos, story and wedding details. Ready to share on WhatsApp and Instagram.",
      },
      {
        property: "og:title",
        content: "WedMotion — Personalised Wedding Invitation Videos",
      },
      {
        property: "og:description",
        content:
          "Choose a cinematic template, add your details and photos, and get a personalised wedding invitation video.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    icon: Film,
    title: "Choose a template",
    body: "Pick from cinematic Indian wedding styles — royal, modern, floral or festive.",
  },
  {
    icon: PenLine,
    title: "Add your details",
    body: "Names, date, venue, families and your story — in a simple guided form.",
  },
  {
    icon: Images,
    title: "Upload your photos",
    body: "Bride, groom, couple and family photos become the heart of your film.",
  },
  {
    icon: Heart,
    title: "Get your personalised video",
    body: "Preview every scene, confirm, and our studio prepares your final HD video.",
  },
];

function Landing() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,color-mix(in_oklab,var(--burgundy)_75%,transparent),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="rise-in">
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-primary">
              Indian wedding invitation films
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] sm:text-6xl">
              Your Wedding Story.
              <br />
              <span className="gold-text">Turned Into a Beautiful Video.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Create a personalized wedding invitation video with your names, photos,
              story and wedding details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/create"
                search={{ template: undefined }}
                className="rounded-full bg-primary px-7 py-3.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Create Your Wedding Video
              </Link>
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 px-7 py-3.5 text-sm text-primary transition hover:bg-primary/10"
              >
                <Play className="size-4" /> Watch Demo
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["Vertical 9:16 for WhatsApp & Instagram", "HD delivery", "Royalty-free music"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-primary" /> {t}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="rise-in">
            <VideoPreview project={DEMO_PROJECT} showNote={false} />
            <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">
              Sample film — Shreya &amp; Shashwat, Royal Heritage template
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          How it works
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">
          Four steps to your wedding film
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border/70 bg-card p-6 transition hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <s.icon className="size-5 text-primary" />
                <span className="font-display text-2xl text-muted-foreground/40">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
              Template showcase
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Premium templates, made for Indian weddings
            </h2>
          </div>
          <Link to="/templates" className="text-sm text-primary hover:underline">
            View all templates
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Pricing</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">One video, one price</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border p-7 ${
                pkg.id === "premium"
                  ? "border-primary/70 bg-gradient-to-b from-secondary/60 to-card"
                  : "border-border/70 bg-card"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{pkg.name}</h3>
                <p className="gold-text font-display text-3xl">₹{pkg.price}</p>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/create"
                search={{ template: undefined }}
                className="mt-7 block rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Start with {pkg.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">FAQ</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Good to know</h2>
        <Accordion type="single" collapsible className="mt-8">
          {FAQS.slice(0, 5).map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <div className="rounded-3xl border border-primary/40 bg-gradient-to-b from-secondary/60 to-card p-10 text-center">
          <Sparkles className="mx-auto size-6 text-primary" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Give us your details. We'll give you a film.
          </h2>
          <Link
            to="/create"
            search={{ template: undefined }}
            className="mt-7 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Create Your Wedding Video
          </Link>
        </div>
      </section>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-sm">
          <DialogTitle className="font-display text-xl">Demo film</DialogTitle>
          <VideoPreview project={DEMO_PROJECT} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
