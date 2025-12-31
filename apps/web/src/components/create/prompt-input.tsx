"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Maximize2,
  Music,
  Shuffle,
  Sparkles,
  Type,
  User,
  X,
  Zap,
} from "lucide-react";
import type { StyleType } from "@/components/create/style-card";
import { Button } from "@/components/ui/button";
import type { Song } from "@/data/mock-songs";
import { formatDuration } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  style: StyleType | null;
  song: Song | null;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  options: {
    character: string | null;
    lyrics: boolean;
    style: string | null;
    removeWatermark: boolean;
    mode: "fast" | "expert";
    visibility: "public" | "private";
  };
  onOptionsChange: (options: Partial<PromptInputProps["options"]>) => void;
  onStyleChange?: () => void;
  onSongRemove?: () => void;
  onGenerate: () => void;
  credits?: number;
}

const styleLabels: Record<StyleType, string> = {
  singing: "Singing",
  storytelling: "Storytelling",
  automatic: "Automatic",
};

export function PromptInput({
  style,
  song,
  prompt,
  onPromptChange,
  options,
  onOptionsChange,
  onStyleChange,
  onSongRemove,
  onGenerate,
  credits = 8,
}: PromptInputProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
      >
        <h1 className="font-bold text-3xl">What do you want to create?</h1>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
      >
        {style && (
          <button
            className="flex items-center gap-2 rounded-xl bg-freebeat-cyan/15 px-4 py-2 text-sm transition-colors hover:bg-freebeat-cyan/25"
            onClick={onStyleChange}
            type="button"
          >
            {styleLabels[style]}
            <Shuffle className="size-4" />
          </button>
        )}
        {song && (
          <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm">
            <Music className="size-4" />
            <span className="max-w-32 truncate">{song.title}</span>
            <span className="text-muted-foreground">
              {formatDuration(song.duration)}
            </span>
            <button
              className="text-muted-foreground hover:text-foreground"
              onClick={onSongRemove}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-card/50"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-4">
          <div className="mb-4 flex items-start gap-3">
            <Sparkles className="mt-1 size-5 shrink-0 text-freebeat-cyan" />
            <textarea
              className="min-h-24 w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder='Describe the vibe...or let us surprise you by prompting "Make a video for this song"'
              value={prompt}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              className={cn(
                "gap-2 rounded-xl",
                options.character && "bg-freebeat-cyan/15"
              )}
              size="sm"
              variant="secondary"
            >
              <User className="size-4" />
              Character
            </Button>
            <Button
              className={cn(
                "gap-2 rounded-xl",
                options.lyrics && "bg-freebeat-cyan/15"
              )}
              onClick={() => onOptionsChange({ lyrics: !options.lyrics })}
              size="sm"
              variant="secondary"
            >
              <Type className="size-4" />
              Lyrics
            </Button>
            <Button
              className={cn(
                "gap-2 rounded-xl",
                options.style && "bg-freebeat-cyan/15"
              )}
              size="sm"
              variant="secondary"
            >
              <Sparkles className="size-4" />
              Style
            </Button>
            <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-sm">
              <span className="text-muted-foreground">Remove watermark</span>
              <button
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors",
                  options.removeWatermark ? "bg-primary" : "bg-muted"
                )}
                onClick={() =>
                  onOptionsChange({ removeWatermark: !options.removeWatermark })
                }
                type="button"
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform",
                    options.removeWatermark && "translate-x-4"
                  )}
                />
              </button>
            </div>
            <Button className="ml-auto size-8" size="icon" variant="ghost">
              <Maximize2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-white/5 border-t bg-secondary/30 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-secondary p-1">
              <button
                className={cn(
                  "rounded-lg px-3 py-1 text-sm transition-colors",
                  options.mode === "fast"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground"
                )}
                onClick={() => onOptionsChange({ mode: "fast" })}
                type="button"
              >
                Fast
              </button>
              <button
                className={cn(
                  "rounded-lg px-3 py-1 text-sm transition-colors",
                  options.mode === "expert"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => onOptionsChange({ mode: "expert" })}
                type="button"
              >
                Expert
              </button>
            </div>

            <Button className="gap-2 rounded-xl" size="sm" variant="secondary">
              <Sparkles className="size-4" />
              Auto
            </Button>

            <Button className="gap-2 rounded-xl" size="sm" variant="secondary">
              <Eye className="size-4" />
              {options.visibility === "public" ? "Public" : "Private"}
            </Button>
          </div>

          <Button
            className="gap-2 rounded-xl bg-freebeat-green font-semibold text-white hover:bg-freebeat-green/90"
            onClick={onGenerate}
          >
            Create
            <Zap className="size-4 fill-current" />
            {credits}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
