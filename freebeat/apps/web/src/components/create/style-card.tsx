"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, Sparkles, Type } from "lucide-react";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export type StyleType = "singing" | "storytelling" | "automatic";

interface StyleCardProps {
  type: StyleType;
  selected?: boolean;
  onClick?: () => void;
}

const styleConfig: Record<
  StyleType,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
  }
> = {
  singing: {
    title: "SINGING",
    description: "A virtual artist lip-syncing to your vocals.",
    icon: <Mic className="size-5" />,
    image: "https://picsum.photos/seed/singing/400/300",
  },
  storytelling: {
    title: "STORYTELLING",
    description: "A cinematic story with custom plots and scenes.",
    icon: <Type className="size-5" />,
    image: "https://picsum.photos/seed/story/400/300",
  },
  automatic: {
    title: "AUTOMATIC",
    description: "Let AI listen to your track and create the magic.",
    icon: <Sparkles className="size-5" />,
    image: "https://picsum.photos/seed/auto/400/300",
  },
};

export function StyleCard({ type, selected, onClick }: StyleCardProps) {
  const config = styleConfig[type];

  return (
    <motion.button
      className={cn(
        "group relative h-[280px] w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-all",
        "hover:shadow-freebeat-cyan/10 hover:shadow-lg",
        selected &&
          "ring-2 ring-freebeat-cyan ring-offset-2 ring-offset-background"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <SpotlightCard
        className={cn(
          "size-full border-white/8 bg-card/50",
          selected && "border-freebeat-cyan/50 bg-freebeat-cyan/5"
        )}
        spotlightColor="rgba(6, 182, 212, 0.15)"
      >
        <div className="absolute inset-0 z-0">
          <img
            alt={config.title}
            className="size-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
            height={300}
            src={config.image}
            width={400}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 z-10">
          <div className="flex size-10 items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm transition-colors group-hover:bg-freebeat-cyan/20">
            {config.icon}
          </div>
        </div>

        <div className="absolute right-4 bottom-4 left-4 z-10">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold text-lg tracking-wide">{config.title}</h3>
            <div className="flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-freebeat-cyan group-hover:text-black">
              <ArrowRight className="size-4" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/90">
            {config.description}
          </p>
        </div>
      </SpotlightCard>
    </motion.button>
  );
}
