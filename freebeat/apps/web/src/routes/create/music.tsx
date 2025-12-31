"use client";

import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { AudioTrimmer } from "@/components/create/audio-trimmer";
import { MusicBrowser } from "@/components/create/music-browser";
import { Tutorials } from "@/components/home/tutorials";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Meteors } from "@/components/ui/meteors";
import type { Song } from "@/data/mock-songs";

export const Route = createFileRoute("/create/music")({
  validateSearch: (search: Record<string, unknown>) => ({
    style: (search.style as string) || undefined,
  }),
  component: MusicPage,
});

function MusicPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/create/music" });
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [_audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showTrimmer, setShowTrimmer] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(15);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setAudioFile(null);
    setAudioUrl(null);
    setShowTrimmer(true);
  };

  const handleUpload = (file: File) => {
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
    setSelectedSong(null);
    setShowTrimmer(true);
  };

  const handleTrimConfirm = () => {
    navigate({
      to: "/create/prompt",
      search: {
        style: search.style,
        songId: selectedSong?.id,
        trimStart,
        trimEnd,
      },
    });
  };

  const handleSkip = () => {
    navigate({
      to: "/create/prompt",
      search: { style: search.style },
    });
  };

  return (
    <PageWrapper>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] px-8 pt-8 pb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Internal gradient glows - matching frontpage */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-freebeat-cyan/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-96 translate-y-1/2 rounded-full bg-freebeat-green/6 blur-[80px]" />
        <div className="pointer-events-none absolute top-1/2 right-0 h-80 w-80 translate-x-1/4 rounded-full bg-freebeat-cyan/5 blur-[100px]" />
        <div className="grid-pattern absolute inset-0 opacity-20" />
        <Meteors className="opacity-30" number={12} />

        <div className="relative z-10">
          {showTrimmer ? (
            <AudioTrimmer
              audioUrl={audioUrl}
              onCancel={() => setShowTrimmer(false)}
              onConfirm={handleTrimConfirm}
              onTrimChange={(start, end) => {
                setTrimStart(start);
                setTrimEnd(end);
              }}
              song={selectedSong}
              trimEnd={trimEnd}
              trimStart={trimStart}
            />
          ) : (
            <MusicBrowser
              onSelectSong={handleSelectSong}
              onSkip={handleSkip}
              onUpload={handleUpload}
              selectedSong={selectedSong}
            />
          )}
        </div>

        {/* Tutorials Section */}
        <div className="relative z-10 mt-6 border-white/5 border-t pt-6">
          <Tutorials />
        </div>
      </motion.div>
    </PageWrapper>
  );
}
