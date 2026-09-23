import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { getProject, formatWeddingDate, useProjects } from "@/lib/wedding/store";
import { getTemplate } from "@/lib/wedding/templates";
import { getPackage } from "@/lib/wedding/types";

export const Route = createFileRoute("/order/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — WedMotion" },
      {
        name: "description",
        content: "Your wedding video request details and current order status.",
      },
      { property: "og:title", content: "Order Confirmation — WedMotion" },
      {
        property: "og:description",
        content: "Track the status of your personalised wedding invitation video.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();
  useProjects();
  const project = typeof window === "undefined" ? undefined : getProject(orderId);

  if (!project) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Order not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find order {orderId} on this device.
        </p>
        <Link to="/dashboard" className="mt-6 inline-block text-primary hover:underline">
          Go to my dashboard
        </Link>
      </div>
    );
  }

  const pkg = getPackage(project.package);
  const message = encodeURIComponent(
    [
      `WedMotion order ${project.orderId}`,
      `Couple: ${project.brideName} & ${project.groomName}`,
      `Wedding date: ${formatWeddingDate(project.weddingDate)}`,
      `Venue: ${project.venue}, ${project.city}`,
      `Template: ${getTemplate(project.template).name}`,
      `Package: ${pkg.name} (₹${pkg.price})`,
      `Status: ${project.orderStatus}`,
    ].join("\n"),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <CheckCircle2 className="size-8 text-primary" />
      <h1 className="mt-4 font-display text-3xl sm:text-4xl">
        Your wedding video request has been received.
      </h1>
      <p className="mt-3 text-muted-foreground">
        Our studio will prepare your film. No video file exists yet — you'll see it in
        your dashboard the moment it's ready.
      </p>

      <dl className="mt-8 space-y-3 rounded-2xl border border-border/70 bg-card p-6 text-sm">
        {([
          ["Order ID", project.orderId ?? "—"],
          ["Couple names", `${project.brideName} & ${project.groomName}`],
          ["Template", getTemplate(project.template).name],
          ["Package", `${pkg.name} · ₹${pkg.price}`],
          ["Status", project.orderStatus],
        ] as [string, string][]).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 pt-1">
          <dt className="text-muted-foreground">Video</dt>
          <dd className="text-right text-primary">Preparing your video</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Share Order on WhatsApp
        </a>
        <Link
          to="/dashboard"
          className="rounded-full border border-primary/50 px-6 py-3 text-center text-sm text-primary transition hover:bg-primary/10"
        >
          Go to my dashboard
        </Link>
      </div>
    </div>
  );
}
