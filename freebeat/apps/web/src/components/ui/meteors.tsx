"use client";

import { useId, useMemo } from "react";

import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

interface MeteorConfig {
  id: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const baseId = useId();

  const meteors = useMemo<MeteorConfig[]>(() => {
    return Array.from({ length: number }, (_, i) => ({
      id: `${baseId}-meteor-${i}`,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
  }, [baseId, number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {meteors.map((meteor) => (
        <span
          className="pointer-events-none absolute top-0 left-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-freebeat-cyan shadow-[0_0_0_1px_#ffffff10]"
          key={meteor.id}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        >
          <span className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-freebeat-cyan to-transparent" />
        </span>
      ))}
    </div>
  );
}
