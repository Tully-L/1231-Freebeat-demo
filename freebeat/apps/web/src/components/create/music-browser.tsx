"use client";

import { motion } from "framer-motion";
import { Link2, Plus, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Song } from "@/data/mock-songs";
import { trendingSongs } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

import { MusicCard } from "./music-card";

interface MusicBrowserProps {
  selectedSong: Song | null;
  onSelectSong: (song: Song) => void;
  onUpload: (file: File) => void;
  onSkip?: () => void;
}

type Tab = "trending" | "used";

export function MusicBrowser({
  selectedSong,
  onSelectSong,
  onUpload,
  onSkip,
}: MusicBrowserProps) {
  const [activeTab, setActiveTab] = useState<Tab>("trending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = trendingSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 text-center">
        <h2 className="font-bold text-2xl">Choose a music</h2>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className={cn(
              "rounded-xl px-4 py-2 font-medium text-sm transition-all",
              activeTab === "trending"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("trending")}
            type="button"
          >
            Trending
          </button>
          <button
            className={cn(
              "rounded-xl px-4 py-2 font-medium text-sm transition-all",
              activeTab === "used"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("used")}
            type="button"
          >
            Used Tracks
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select className="rounded-xl bg-secondary px-3 py-2 text-sm">
            <option>All</option>
          </select>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-48 rounded-xl bg-secondary/50 pl-9"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search music"
              value={searchQuery}
            />
          </div>
        </div>
      </div>

      <div className="scrollbar-hide flex-1 overflow-y-auto overflow-x-hidden">
        <motion.div
          animate={{ opacity: 1 }}
          className="grid gap-1 md:grid-cols-2"
          initial={{ opacity: 0 }}
        >
          {filteredSongs.map((song) => (
            <MusicCard
              key={song.id}
              onClick={() => onSelectSong(song)}
              selected={selectedSong?.id === song.id}
              song={song}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-border border-t pt-4">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border border-dashed px-4 py-3 transition-colors hover:border-freebeat-cyan/50 hover:bg-freebeat-cyan/5">
          <Plus className="size-5 text-muted-foreground" />
          <div>
            <div className="font-medium text-sm">Upload music</div>
            <div className="text-muted-foreground text-xs">
              MP3, WAV, FLAC, AAC
            </div>
          </div>
          <input
            accept="audio/*"
            className="hidden"
            onChange={handleFileSelect}
            type="file"
          />
        </label>

        <div className="flex flex-1 items-center gap-2">
          <Link2 className="size-5 text-muted-foreground" />
          <Input
            className="flex-1 bg-secondary/50"
            placeholder="http://soundcloud.com/"
          />
        </div>

        {onSkip && (
          <Button
            className="text-muted-foreground"
            onClick={onSkip}
            variant="ghost"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}
