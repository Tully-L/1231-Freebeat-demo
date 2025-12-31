import { ChevronDown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreditsBadge } from "../shared/credits-badge";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-border border-b bg-background/50 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-2 font-medium text-sm transition-colors hover:bg-secondary">
            <Sparkles className="size-4 text-freebeat-cyan" />
            Music Video
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <Sparkles className="mr-2 size-4" />
              Music Video
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sparkles className="mr-2 size-4" />
              Short Clip
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sparkles className="mr-2 size-4" />
              Full Video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <CreditsBadge credits={1000} />
        <Button
          className="rounded-full bg-[#3366FF] px-5 font-medium text-white hover:bg-[#2952cc]"
          size="sm"
        >
          Join our Discord
        </Button>
      </div>
    </header>
  );
}
