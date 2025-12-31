"use client";

import { TopCharts } from "@/components/home/top-charts";

interface PageWrapperProps {
  children: React.ReactNode;
  showTopCharts?: boolean;
}

export function PageWrapper({
  children,
  showTopCharts = true,
}: PageWrapperProps) {
  return (
    <div className="relative min-h-full">
      <div className="dot-pattern absolute inset-0 opacity-50" />

      <div className="relative px-8 py-6">
        {children}

        {showTopCharts && (
          <div className="mt-4">
            <TopCharts />
          </div>
        )}
      </div>
    </div>
  );
}
