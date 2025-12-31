"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { StyleType } from "@/components/create/style-card";
import type { Song } from "@/data/mock-songs";

interface WizardOptions {
  character: string | null;
  lyrics: boolean;
  style: string | null;
  removeWatermark: boolean;
  mode: "fast" | "expert";
  visibility: "public" | "private";
}

interface WizardState {
  style: StyleType | null;
  selectedSong: Song | null;
  audioFile: File | null;
  audioUrl: string | null;
  trimStart: number;
  trimEnd: number;
  duration: number;
  prompt: string;
  options: WizardOptions;
}

interface WizardContextType extends WizardState {
  setStyle: (style: StyleType | null) => void;
  setSelectedSong: (song: Song | null) => void;
  setAudioFile: (file: File | null) => void;
  setTrimRange: (start: number, end: number) => void;
  setDuration: (duration: number) => void;
  setPrompt: (prompt: string) => void;
  setOptions: (options: Partial<WizardOptions>) => void;
  reset: () => void;
}

const defaultOptions: WizardOptions = {
  character: null,
  lyrics: false,
  style: null,
  removeWatermark: false,
  mode: "fast",
  visibility: "public",
};

const defaultState: WizardState = {
  style: null,
  selectedSong: null,
  audioFile: null,
  audioUrl: null,
  trimStart: 0,
  trimEnd: 15,
  duration: 15,
  prompt: "",
  options: defaultOptions,
};

const WizardContext = createContext<WizardContextType | null>(null);

export function CreateWizardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<WizardState>(defaultState);

  const setStyle = useCallback((style: StyleType | null) => {
    setState((prev) => ({ ...prev, style }));
  }, []);

  const setSelectedSong = useCallback((song: Song | null) => {
    setState((prev) => ({
      ...prev,
      selectedSong: song,
      audioFile: null,
      audioUrl: null,
      trimStart: 0,
      trimEnd: Math.min(15, song?.duration ?? 15),
    }));
  }, []);

  const setAudioFile = useCallback((file: File | null) => {
    setState((prev) => {
      if (prev.audioUrl) {
        URL.revokeObjectURL(prev.audioUrl);
      }
      return {
        ...prev,
        audioFile: file,
        audioUrl: file ? URL.createObjectURL(file) : null,
        selectedSong: null,
      };
    });
  }, []);

  const setTrimRange = useCallback((start: number, end: number) => {
    setState((prev) => ({ ...prev, trimStart: start, trimEnd: end }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  const setPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, prompt }));
  }, []);

  const setOptions = useCallback((options: Partial<WizardOptions>) => {
    setState((prev) => ({
      ...prev,
      options: { ...prev.options, ...options },
    }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => {
      if (prev.audioUrl) {
        URL.revokeObjectURL(prev.audioUrl);
      }
      return defaultState;
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setStyle,
      setSelectedSong,
      setAudioFile,
      setTrimRange,
      setDuration,
      setPrompt,
      setOptions,
      reset,
    }),
    [
      state,
      setStyle,
      setSelectedSong,
      setAudioFile,
      setTrimRange,
      setDuration,
      setPrompt,
      setOptions,
      reset,
    ]
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useCreateWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useCreateWizard must be used within CreateWizardProvider");
  }
  return context;
}
