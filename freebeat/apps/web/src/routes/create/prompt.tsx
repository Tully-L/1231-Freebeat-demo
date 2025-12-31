"use client";

import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { PromptInput } from "@/components/create/prompt-input";
import type { StyleType } from "@/components/create/style-card";
import { Tutorials } from "@/components/home/tutorials";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { trendingSongs } from "@/data/mock-songs";

export const Route = createFileRoute("/create/prompt")({
  validateSearch: (search: Record<string, unknown>) => ({
    style: (search.style as StyleType) || undefined,
    songId: (search.songId as string) || undefined,
    trimStart: Number(search.trimStart) || 0,
    trimEnd: Number(search.trimEnd) || 15,
  }),
  component: PromptPage,
});

function PromptPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/create/prompt" });

  const song = useMemo(
    () => trendingSongs.find((s) => s.id === search.songId) ?? null,
    [search.songId]
  );

  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState({
    character: null as string | null,
    lyrics: false,
    style: null as string | null,
    removeWatermark: false,
    mode: "fast" as "fast" | "expert",
    visibility: "public" as "public" | "private",
  });

  const handleGenerate = () => {
    navigate({
      to: "/create/generating",
      search: {
        style: search.style,
        songId: search.songId,
        prompt,
      },
    });
  };

  const handleStyleChange = () => {
    navigate({ to: "/" });
  };

  const handleSongRemove = () => {
    navigate({
      to: "/create/music",
      search: { style: search.style },
    });
  };

  return (
    <PageWrapper>
      <div className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] p-8">
        {/* Internal gradient glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-freebeat-cyan/8 blur-100" />

        <div className="relative z-10">
          <PromptInput
            credits={8}
            onGenerate={handleGenerate}
            onOptionsChange={(newOptions) =>
              setOptions((prev) => ({ ...prev, ...newOptions }))
            }
            onPromptChange={setPrompt}
            onSongRemove={handleSongRemove}
            onStyleChange={handleStyleChange}
            options={options}
            prompt={prompt}
            song={song}
            style={search.style ?? null}
          />
        </div>

        {/* Tutorials Section */}
        <div className="relative z-10 mt-8 border-white/5 border-t pt-6">
          <Tutorials />
        </div>
      </div>
    </PageWrapper>
  );
}
