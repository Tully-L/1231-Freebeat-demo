import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  collapsed?: boolean;
}

export function Logo({ className, collapsed = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-lg bg-freebeat-cyan/20 blur-lg" />
        <svg
          aria-label="Freebeat logo"
          className="relative size-8"
          fill="none"
          role="img"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="fill-freebeat-green"
            height="24"
            rx="4"
            width="4"
            x="2"
            y="4"
          />
          <rect
            className="fill-freebeat-green"
            height="20"
            rx="4"
            width="4"
            x="8"
            y="6"
          />
          <rect
            className="fill-freebeat-cyan"
            height="28"
            rx="4"
            width="4"
            x="14"
            y="2"
          />
          <rect
            className="fill-freebeat-cyan"
            height="20"
            rx="4"
            width="4"
            x="20"
            y="6"
          />
          <rect
            className="fill-freebeat-green"
            height="24"
            rx="4"
            width="4"
            x="26"
            y="4"
          />
        </svg>
      </div>
      {!collapsed && (
        <span className="font-bold text-lg tracking-tight">freebeat</span>
      )}
    </div>
  );
}
