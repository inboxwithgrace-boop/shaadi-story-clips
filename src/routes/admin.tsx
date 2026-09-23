import { createFileRoute } from "@tanstack/react-router";
import { formatWeddingDate, setOrderStatus, useProjects } from "@/lib/wedding/store";
import { getTemplate } from "@/lib/wedding/templates";
import { getPackage, ORDER_STATUSES, type OrderStatus } from "@/lib/wedding/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Studio Orders — WedMotion" },
      {
        name: "description",
        content: "Internal order board for WedMotion wedding video production.",
      },
      { property: "og:title", content: "Studio Orders — WedMotion" },
      { property: "og:description", content: "Internal order board." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const projects = useProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">Internal</p>
      <h1 className="mt-3 font-display text-4xl">Studio orders</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Orders placed on this device. The demo project is read-only.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border/70">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {["Order", "Customer", "Couple", "Wedding date", "Template", "Package", "Status"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-border/50">
                <td className="px-4 py-3 text-muted-foreground">{p.orderId ?? "—"}</td>
                <td className="px-4 py-3">{p.customerName || "—"}</td>
                <td className="px-4 py-3">
                  {p.brideName} &amp; {p.groomName}
                </td>
                <td className="px-4 py-3">{formatWeddingDate(p.weddingDate) || "—"}</td>
                <td className="px-4 py-3">{getTemplate(p.template).name}</td>
                <td className="px-4 py-3">{getPackage(p.package).name}</td>
                <td className="px-4 py-3">
                  <select
                    value={p.orderStatus}
                    disabled={p.isDemo}
                    onChange={(e) => setOrderStatus(p.id, e.target.value as OrderStatus)}
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-xs disabled:opacity-60"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
