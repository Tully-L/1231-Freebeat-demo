import { createFileRoute } from "@tanstack/react-router";

import { Tutorials } from "@/components/home/tutorials";
import { PageWrapper } from "@/components/layout/page-wrapper";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] p-8">
        {/* Internal gradient glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-freebeat-cyan/8 blur-100" />

        <h1 className="relative z-10 mb-4 font-bold text-3xl">Dashboard</h1>
        <p className="relative z-10 mb-8 text-muted-foreground">
          Welcome to your dashboard. This is a placeholder page.
        </p>

        {/* Tutorials Section */}
        <div className="relative z-10 border-white/5 border-t pt-6">
          <Tutorials />
        </div>
      </div>
    </PageWrapper>
  );
}
