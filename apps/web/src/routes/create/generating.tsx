"use client";

import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/create/generating")({
  validateSearch: (search: Record<string, unknown>) => ({
    style: (search.style as string) || undefined,
    songId: (search.songId as string) || undefined,
    prompt: (search.prompt as string) || "",
  }),
  component: GeneratingPage,
});

type Stage = "analyzing" | "generating" | "rendering" | "complete";

const stages: { id: Stage; label: string; duration: number }[] = [
  { id: "analyzing", label: "Analyzing audio...", duration: 2000 },
  { id: "generating", label: "Generating scenes...", duration: 3000 },
  { id: "rendering", label: "Rendering video...", duration: 3000 },
  { id: "complete", label: "Complete!", duration: 0 },
];

function GeneratingPage() {
  const navigate = useNavigate();
  useSearch({ from: "/create/generating" });
  const [currentStage, setCurrentStage] = useState<Stage>("analyzing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalElapsed = 0;
    const totalDuration = stages
      .slice(0, -1)
      .reduce((acc, s) => acc + s.duration, 0);

    const interval = setInterval(() => {
      totalElapsed += 100;
      setProgress(Math.min((totalElapsed / totalDuration) * 100, 100));

      let elapsed = 0;
      for (const stage of stages) {
        if (totalElapsed <= elapsed + stage.duration) {
          setCurrentStage(stage.id);
          break;
        }
        elapsed += stage.duration;
      }

      if (totalElapsed >= totalDuration) {
        setCurrentStage("complete");
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    navigate({ to: "/" });
  };

  const handleViewResult = () => {
    navigate({ to: "/" });
  };

  const stageIndex = stages.findIndex((s) => s.id === currentStage);
  const isComplete = currentStage === "complete";

  return (
    <PageWrapper>
      <div className="relative overflow-hidden rounded-3xl bg-[#0d0d0f] p-8">
        {/* Internal gradient glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-freebeat-cyan/8 blur-100" />

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center py-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
        >
          <div className="relative mb-8">
            <motion.div
              animate={{
                scale: isComplete ? [1, 1.1, 1] : [1, 1.05, 1],
                opacity: 1,
              }}
              className="relative flex size-32 items-center justify-center"
              transition={{
                duration: isComplete ? 0.5 : 2,
                repeat: isComplete ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-freebeat-cyan/20 blur-xl" />
              <div className="absolute inset-2 rounded-full bg-freebeat-cyan/30 blur-lg" />
              <div className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-br from-freebeat-cyan to-freebeat-green">
                {isComplete ? (
                  <CheckCircle className="size-12 text-white" />
                ) : (
                  <Loader2 className="size-12 animate-spin text-white" />
                )}
              </div>
            </motion.div>

            {!isComplete && (
              <svg
                aria-label="Loading progress"
                className="absolute inset-0 -rotate-90"
                role="img"
                viewBox="0 0 128 128"
              >
                <circle
                  className="stroke-freebeat-cyan/20"
                  cx="64"
                  cy="64"
                  fill="none"
                  r="56"
                  strokeWidth="4"
                />
                <circle
                  className="stroke-freebeat-cyan transition-all duration-300"
                  cx="64"
                  cy="64"
                  fill="none"
                  r="56"
                  strokeDasharray={`${progress * 3.52} 352`}
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
            )}
          </div>

          <motion.h2
            animate={{ opacity: 1 }}
            className="mb-2 font-bold text-2xl"
            initial={{ opacity: 0 }}
            key={currentStage}
          >
            {isComplete ? "Your video is ready!" : "Creating your video..."}
          </motion.h2>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            key={`${currentStage}-label`}
          >
            {stages[stageIndex].label}
          </motion.p>

          <div className="mb-8 flex w-full justify-center gap-2">
            {stages.slice(0, -1).map((stage, i) => {
              let bgClass = "bg-secondary";
              if (i < stageIndex) {
                bgClass = "bg-freebeat-cyan";
              } else if (i === stageIndex) {
                bgClass = "bg-freebeat-cyan/50";
              }
              return (
                <div
                  className={`h-1.5 w-16 rounded-full transition-colors ${bgClass}`}
                  key={stage.id}
                />
              );
            })}
          </div>

          {isComplete ? (
            <div className="flex gap-3">
              <Button onClick={handleViewResult} variant="secondary">
                View Result
              </Button>
              <Button
                className="bg-freebeat-cyan hover:bg-freebeat-cyan/90"
                onClick={() => navigate({ to: "/" })}
              >
                Create Another
              </Button>
            </div>
          ) : (
            <Button className="gap-2" onClick={handleCancel} variant="ghost">
              <X className="size-4" />
              Cancel
            </Button>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
