"use client";

import { useWavesurfer } from "@wavesurfer/react";
import { Pause, Play, Square } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Song } from "@/data/mock-songs";
import { formatDuration } from "@/data/mock-songs";
import { cn } from "@/lib/utils";

interface AudioTrimmerProps {
  song: Song | null;
  audioUrl: string | null;
  trimStart: number;
  trimEnd: number;
  onTrimChange: (start: number, end: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const DURATION_PRESETS = [15, 30, 60] as const;

// Generate consistent pseudo-random waveform data based on song id
function generateWaveformData(songId: string, barCount: number): number[] {
  const seed = songId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bars: number[] = [];
  for (let i = 0; i < barCount; i++) {
    // Create a pseudo-random but consistent pattern
    const x = (seed * (i + 1) * 9301 + 49_297) % 233_280;
    const random = x / 233_280;
    // Create more musical-looking waves with some smoothing
    const base = 0.3 + random * 0.7;
    const wave = Math.sin(i * 0.3) * 0.2 + 0.5;
    bars.push(Math.min(1, base * wave + 0.2));
  }
  return bars;
}

export function AudioTrimmer({
  song,
  audioUrl,
  trimStart,
  trimEnd,
  onTrimChange,
  onConfirm,
  onCancel,
}: AudioTrimmerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(song?.duration || 0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<number>(15);
  const [isLoading, setIsLoading] = useState(true);

  const songUrl = song ? song.audioUrl : audioUrl;

  // Generate waveform bars
  const waveformBars = useMemo(() => {
    return generateWaveformData(song?.id || "default", 80);
  }, [song?.id]);

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    url: songUrl ?? undefined,
    waveColor: "transparent",
    progressColor: "transparent",
    cursorColor: "transparent",
    height: 1,
    normalize: true,
  });

  useEffect(() => {
    if (wavesurfer) {
      const handleReady = () => {
        setDuration(wavesurfer.getDuration());
        setIsLoading(false);
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleFinish = () => setIsPlaying(false);
      const handleTimeUpdate = (time: number) => setCurrentTime(time);

      wavesurfer.on("ready", handleReady);
      wavesurfer.on("play", handlePlay);
      wavesurfer.on("pause", handlePause);
      wavesurfer.on("finish", handleFinish);
      wavesurfer.on("timeupdate", handleTimeUpdate);

      return () => {
        wavesurfer.un("ready", handleReady);
        wavesurfer.un("play", handlePlay);
        wavesurfer.un("pause", handlePause);
        wavesurfer.un("finish", handleFinish);
        wavesurfer.un("timeupdate", handleTimeUpdate);
      };
    }
  }, [wavesurfer]);

  // Use song duration as fallback
  useEffect(() => {
    if (song?.duration && duration === 0) {
      setDuration(song.duration);
      setIsLoading(false);
    }
  }, [song?.duration, duration]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  }, [wavesurfer]);

  const handleStop = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.stop();
      setCurrentTime(0);
    }
  }, [wavesurfer]);

  const handlePresetChange = (preset: number) => {
    setSelectedPreset(preset);
    const newEnd = Math.min(
      trimStart + preset,
      duration || song?.duration || 0
    );
    onTrimChange(trimStart, newEnd);
  };

  const effectiveDuration = duration || song?.duration || 60;
  const trimStartPercent = (trimStart / effectiveDuration) * 100;
  const trimWidthPercent = ((trimEnd - trimStart) / effectiveDuration) * 100;
  const progressPercent = (currentTime / effectiveDuration) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Song Info Header */}
      <div className="flex items-center gap-3 rounded-xl bg-freebeat-cyan/10 p-3">
        {song && (
          <>
            <div className="size-10 overflow-hidden rounded-lg">
              <img
                alt={song.title}
                className="size-full object-cover"
                height={40}
                src={song.albumArt}
                width={40}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-medium text-sm">{song.title}</h4>
              <p className="text-muted-foreground text-xs">{song.artist}</p>
            </div>
          </>
        )}
        <div className="text-muted-foreground text-sm">
          {formatDuration(Math.floor(effectiveDuration))}
        </div>
        <span className="rounded-lg bg-secondary px-2 py-1 text-xs">
          Short Edit
        </span>
      </div>

      {/* Waveform Visualization */}
      <div className="relative rounded-xl bg-secondary/30 p-4">
        <div className="relative mb-4">
          {/* Hidden wavesurfer container for audio control */}
          <div
            className="pointer-events-none absolute opacity-0"
            ref={containerRef}
          />

          {/* Custom Waveform Visualization */}
          <div className="relative h-20 overflow-hidden rounded-xl bg-[#1a1a1c]">
            {/* Waveform Bars */}
            <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-2">
              {waveformBars.map((height, index) => {
                const barPosition = (index / waveformBars.length) * 100;
                const isInSelection =
                  barPosition >= trimStartPercent &&
                  barPosition <= trimStartPercent + trimWidthPercent;
                const isPlayed = barPosition <= progressPercent;

                const getBarColor = () => {
                  if (!isInSelection) {
                    return "bg-gray-600/50";
                  }
                  if (isPlayed) {
                    return "bg-freebeat-cyan";
                  }
                  return "bg-freebeat-cyan/60";
                };

                return (
                  <div
                    className={cn(
                      "w-[3px] rounded-full transition-all duration-150",
                      getBarColor()
                    )}
                    key={`bar-${index}-${height.toFixed(2)}`}
                    style={{
                      height: `${height * 100}%`,
                      minHeight: "4px",
                    }}
                  />
                );
              })}
            </div>

            {/* Selection Region Overlay */}
            <div
              className="pointer-events-none absolute top-0 h-full rounded-lg border-2 border-freebeat-cyan"
              style={{
                left: `${trimStartPercent}%`,
                width: `${trimWidthPercent}%`,
              }}
            >
              {/* Left Handle */}
              <div className="absolute top-0 -left-1 h-full w-2 cursor-ew-resize rounded-l-sm bg-freebeat-cyan shadow-[0_0_10px_var(--freebeat-cyan)]" />
              {/* Right Handle */}
              <div className="absolute top-0 -right-1 h-full w-2 cursor-ew-resize rounded-r-sm bg-freebeat-cyan shadow-[0_0_10px_var(--freebeat-cyan)]" />
            </div>

            {/* Playhead */}
            {isPlaying && (
              <div
                className="pointer-events-none absolute top-0 h-full w-0.5 bg-white shadow-[0_0_8px_white] transition-all"
                style={{ left: `${progressPercent}%` }}
              />
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="size-6 animate-spin rounded-full border-2 border-freebeat-cyan border-t-transparent" />
              </div>
            )}
          </div>

          {/* Time Labels */}
          <div className="mt-2 flex justify-between text-muted-foreground text-xs">
            <span>{formatDuration(Math.floor(trimStart))}</span>
            <span className="font-medium text-freebeat-cyan">
              {formatDuration(Math.floor(trimEnd - trimStart))} selected
            </span>
            <span>{formatDuration(Math.floor(effectiveDuration))}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "size-10 rounded-xl",
                isPlaying && "bg-freebeat-cyan text-black"
              )}
              onClick={handlePlayPause}
              size="icon"
              variant="secondary"
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
            <Button
              className="size-10 rounded-xl"
              onClick={handleStop}
              size="icon"
              variant="secondary"
            >
              <Square className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              Duration preset
            </span>
            <select
              className="cursor-pointer rounded-xl bg-secondary px-3 py-2 text-sm"
              onChange={(e) => handlePresetChange(Number(e.target.value))}
              value={selectedPreset}
            >
              {DURATION_PRESETS.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}s
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button className="rounded-xl" onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button
          className="rounded-xl bg-white text-black hover:bg-white/90"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
