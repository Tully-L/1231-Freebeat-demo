"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { chartCategories, trendingSongs } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

import { ChartCard } from "./chart-card";

export function TopCharts() {
  const [activeCategory, setActiveCategory] = useState(chartCategories[0].id);

  return (
    <section className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-lg">Top Charts</h2>
        <Button
          className="gap-1 text-muted-foreground hover:text-foreground"
          variant="ghost"
        >
          View Charts
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="scrollbar-hide mb-4 flex w-fit gap-1 overflow-x-auto rounded-full bg-white/5 p-1">
        {chartCategories.map((category) => (
          <button
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeCategory === category.id
                ? "bg-white/10 text-white shadow-sm"
                : "bg-transparent text-white/50 hover:bg-white/5 hover:text-white/70"
            )}
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="scrollbar-hide flex gap-4 overflow-x-auto pb-4"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        {trendingSongs.map((song, index) => (
          <ChartCard key={song.id} rank={index + 1} song={song} />
        ))}
      </motion.div>
    </section>
  );
}
