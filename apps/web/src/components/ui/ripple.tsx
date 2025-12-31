"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

interface CircleConfig {
  id: string;
  size: number;
  opacity: number;
  animationDelay: string;
  borderStyle: "solid" | "dashed";
  borderOpacity: number;
}

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps) {
  const [mounted, setMounted] = useState(false);
  const baseId = useId();

  const circles = useMemo<CircleConfig[]>(() => {
    return Array.from({ length: numCircles }, (_, i) => ({
      id: `${baseId}-circle-${i}`,
      size: mainCircleSize + i * 70,
      opacity: mainCircleOpacity - i * 0.03,
      animationDelay: `${i * 0.06}s`,
      borderStyle: i === numCircles - 1 ? "dashed" : "solid",
      borderOpacity: 5 + i * 5,
    }));
  }, [baseId, mainCircleSize, mainCircleOpacity, numCircles]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
    >
      {circles.map((circle) => (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full border bg-freebeat-cyan/5"
          key={circle.id}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
            animationDelay: circle.animationDelay,
            borderStyle: circle.borderStyle,
            borderWidth: "1px",
            borderColor: `oklch(0.7 0.12 195 / ${circle.borderOpacity}%)`,
            top: "50%",
            left: "50%",
          }}
        />
      ))}
    </div>
  );
}
