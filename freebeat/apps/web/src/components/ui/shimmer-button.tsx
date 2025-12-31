"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "oklch(0.75 0.15 195)",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "100px",
  background = "linear-gradient(135deg, oklch(0.65 0.25 285), oklch(0.55 0.25 285))",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 font-semibold text-white",
        "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className
      )}
      style={{
        borderRadius,
        background,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
        }}
      >
        <span
          className="absolute inset-[-100%] animate-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
            animationDuration: shimmerDuration,
          }}
        />
      </span>

      <span
        className="absolute inset-px z-[-1] opacity-90"
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
          background,
        }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
