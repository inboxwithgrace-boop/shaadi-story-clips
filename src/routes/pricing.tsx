import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/wedding/types";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — WedMotion Wedding Videos" },
      {
        name: "description",
        content:
          "Simple one-time pricing for personalised wedding invitation videos: Standard at ₹499 and Premium at ₹999.",
      },
      { property: "og:title", content: "Pricing — WedMotion" },
      {
        property: "og:description",
        content: "Standard ₹499 and Premium ₹999 wedding invitation video packages.",
      },
    ],
  }),
  component: PricingPage,
});

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
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
            <p className="font-display text-3xl gold-text">₹{pkg.price}</p>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            One-time · per video
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          {!compact ? (
            <Link
              to="/create"
              search={{ template: undefined }}
              className="mt-7 block rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Start with {pkg.name}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Pricing</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">
        One video. One <span className="gold-text">simple price.</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Pay once per wedding video. No subscription.
      </p>
      <div className="mt-10">
        <PricingCards />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Payment is a placeholder flow in this MVP — no payment gateway is connected
        yet, so no money is charged.
      </p>
    </div>
  );
}
