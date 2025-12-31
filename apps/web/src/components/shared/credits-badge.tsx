import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface CreditsBadgeProps {
  credits: number;
  className?: string;
}

export function CreditsBadge({ credits, className }: CreditsBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 font-medium text-sm",
        "bg-gradient-to-r from-[#0a1f1a] via-[#0d2922] to-[#0a1f1a]",
        "text-white",
        "border border-[#1a3d33]",
        className
      )}
    >
      <Sparkles className="size-4 fill-[#22c55e] text-[#22c55e]" />
      <span>{credits.toLocaleString()}</span>
    </div>
  );
}
