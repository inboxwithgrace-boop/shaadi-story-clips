import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/templates", label: "Templates" },
  { to: "/create", label: "Create Video" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/50 font-display text-sm text-primary">
            W
          </span>
          <span className="truncate font-display text-xl tracking-wide">
            Wed<span className="gold-text">Motion</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="rounded-full border border-primary/60 px-4 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            My Video
          </Link>
        </nav>
        <button
          type="button"
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-4 py-3 md:hidden">
          {[...NAV, { to: "/dashboard", label: "My Video" } as const].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg text-foreground">
            Wed<span className="gold-text">Motion</span>
          </p>
          <p className="mt-1 text-xs">
            Personalised Indian wedding invitation videos.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-xs">
          <Link to="/templates" className="hover:text-primary">
            Templates
          </Link>
          <Link to="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link to="/faq" className="hover:text-primary">
            FAQ
          </Link>
          <Link to="/admin" className="hover:text-primary">
            Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
