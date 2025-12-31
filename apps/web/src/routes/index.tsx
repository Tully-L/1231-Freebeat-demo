"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

import { StyleCard, type StyleType } from "@/components/create/style-card";
import { Tutorials } from "@/components/home/tutorials";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Meteors } from "@/components/ui/meteors";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);

  const handleStyleSelect = (style: StyleType) => {
    setSelectedStyle(style);
    setTimeout(() => {
      navigate({ to: "/create/music", search: { style } });
    }, 300);
  };

  return (
    <PageWrapper>
      {/* Panel with sidebar-like background and internal glow */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] px-8 pt-12 pb-6">
        {/* Internal gradient glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-freebeat-cyan/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-96 translate-y-1/2 rounded-full bg-freebeat-green/6 blur-[80px]" />
        <div className="pointer-events-none absolute top-1/2 right-0 h-80 w-80 translate-x-1/4 rounded-full bg-freebeat-cyan/5 blur-[100px]" />
        <div className="grid-pattern absolute inset-0 opacity-20" />
        <Meteors className="opacity-30" number={12} />

        {/* Header with side text */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mb-8"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-8">
            <p className="hidden text-muted-foreground/60 text-sm italic md:block">
              If the song were a
            </p>
            <h1 className="text-center font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
              Which Style
              <br />
              Fits Your Music?
            </h1>
            <p className="hidden text-muted-foreground/60 text-sm italic md:block">
              What would it look like...
            </p>
          </div>
        </motion.div>

        {/* Style Cards */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto grid max-w-5xl gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <StyleCard
            onClick={() => handleStyleSelect("singing")}
            selected={selectedStyle === "singing"}
            type="singing"
          />
          <StyleCard
            onClick={() => handleStyleSelect("storytelling")}
            selected={selectedStyle === "storytelling"}
            type="storytelling"
          />
          <StyleCard
            onClick={() => handleStyleSelect("automatic")}
            selected={selectedStyle === "automatic"}
            type="automatic"
          />
        </motion.div>

        {/* Skip button - aligned right */}
        <motion.div
          animate={{ opacity: 1 }}
          className="relative z-10 mt-4 flex justify-end"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
            onClick={() => navigate({ to: "/create/music" })}
            type="button"
          >
            Skip
          </button>
        </motion.div>

        {/* Tutorials Section - Inside the panel */}
        <div className="relative z-10 mt-6 border-white/5 border-t pt-6">
          <Tutorials />
        </div>
      </div>
    </PageWrapper>
  );
}
