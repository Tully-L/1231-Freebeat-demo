"use client";

import { motion } from "framer-motion";

import type { Song } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  song: Song;
  rank: number;
  onClick?: () => void;
}

export function ChartCard({ song, rank, onClick }: ChartCardProps) {
  return (
    <motion.button
      className="group relative flex w-44 shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl text-left transition-all"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          alt={song.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          height={176}
          src={song.albumArt}
          width={176}
        />

        {/* Rank badge */}
        <div
          className={cn(
            "absolute top-2 left-2 flex size-7 items-center justify-center rounded-lg font-bold text-sm backdrop-blur-md",
            rank <= 3
              ? "bg-gradient-to-br from-freebeat-cyan via-teal-400 to-freebeat-green text-white shadow-[0_0_12px_rgba(6,182,212,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-1 ring-white/30"
              : "bg-gradient-to-br from-white/15 to-white/5 text-white shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/20"
          )}
        >
          {rank.toString().padStart(2, "0")}
        </div>

        {/* Remix count badge */}
        {song.remixCount && (
          <div className="absolute right-2 bottom-12 z-10 flex items-center gap-1 rounded-md bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 px-2 py-1 font-medium text-black text-xs shadow-[0_0_12px_rgba(16,185,129,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/25 backdrop-blur-md">
            {song.remixCount} REMIX
          </div>
        )}

        {/* Bottom gradient with title and artist overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 pt-10">
          <h4 className="truncate font-medium text-sm text-white drop-shadow-md">
            {song.title}
          </h4>
          <p className="truncate text-white/70 text-xs">{song.artist}</p>
        </div>
      </div>
    </motion.button>
  );
}
