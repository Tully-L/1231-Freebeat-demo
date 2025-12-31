"use client";

import { motion } from "framer-motion";

import type { Song } from "@/data/mock-songs";
import { formatDuration } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

interface MusicCardProps {
  song: Song;
  selected?: boolean;
  onClick?: () => void;
}

export function MusicCard({ song, selected, onClick }: MusicCardProps) {
  return (
    <motion.button
      className={cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-card/30 text-left transition-all",
        "hover:bg-card/50 hover:shadow-lg",
        selected &&
          "bg-freebeat-cyan/10 ring-1 ring-freebeat-cyan ring-offset-1 ring-offset-background"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3 p-2">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
          <img
            alt={song.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            height={48}
            src={song.albumArt}
            width={48}
          />
          {selected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <div className="size-2 rounded-full bg-freebeat-cyan shadow-[0_0_8px_var(--freebeat-cyan)]" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h4
            className={cn(
              "truncate font-medium text-sm transition-colors",
              selected ? "text-freebeat-cyan" : "group-hover:text-white"
            )}
          >
            {song.title}
          </h4>
          <div className="flex items-center justify-between">
            <p className="truncate text-muted-foreground text-xs group-hover:text-white/70">
              {song.artist}
            </p>
            <span className="text-[10px] text-muted-foreground">
              {formatDuration(song.duration)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
