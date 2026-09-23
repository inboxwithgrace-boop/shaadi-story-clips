import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "How does WedMotion work?",
    a: "You choose a template, fill in your wedding details, upload your photos and pick a music style. We personalise the video with your information and our studio prepares the final file.",
  },
  {
    q: "What do I get at the end?",
    a: "A vertical 9:16 HD wedding invitation video, sized for WhatsApp status and Instagram reels. Until our studio finishes rendering, you will see the personalised preview in your dashboard.",
  },
  {
    q: "Is the preview the final video?",
    a: "No. The preview shows exactly how your details, photos and template will appear scene by scene. The final cinematic video is rendered after you confirm your order.",
  },
  {
    q: "How many photos can I add?",
    a: "Up to 6 photos on the Standard package and up to 12 on Premium.",
  },
  {
    q: "Can I use my own song?",
    a: "During this MVP we only offer royalty-free placeholder tracks, so your video is safe to post on Instagram and WhatsApp without copyright issues.",
  },
  {
    q: "Can I change details after ordering?",
    a: "Yes. Message us on WhatsApp with your order ID before the video moves into the Rendering stage.",
  },
  {
    q: "Is payment live?",
    a: "Not yet. The checkout in this version is a placeholder flow — no payment gateway is connected and nothing is charged.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — WedMotion Wedding Invitation Videos" },
      {
        name: "description",
        content:
          "Answers about templates, photos, music, delivery and pricing for personalised wedding invitation videos.",
      },
      { property: "og:title", content: "FAQ — WedMotion" },
      {
        property: "og:description",
        content: "Common questions about creating your wedding invitation video.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">FAQ</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        Questions, <span className="gold-text">answered</span>
      </h1>
      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left font-display text-lg">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
