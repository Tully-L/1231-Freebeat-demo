"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  Gift,
  Globe,
  HelpCircle,
  History,
  Plus,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Logo } from "../shared/logo";
import { UserMenu } from "../user-menu";

const historyItems = [
  { id: "1", title: "A dreamy cyberpunk cit..." },
  { id: "2", title: "A dreamy cyberpunk cit..." },
  { id: "3", title: "A dreamy cyberpunk cit..." },
];

export function Sidebar() {
  const location = useLocation();

  const isCreateActive =
    location.pathname === "/" || location.pathname.startsWith("/create");

  return (
    <aside className="relative flex h-full w-60 flex-col overflow-hidden border-white/5 border-r">
      {/* Rich gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0d0d0f] via-[#0a0a0c] to-[#08080a]" />

      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content container with relative positioning */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="p-4 pl-6">
          <Link className="cursor-pointer" to="/">
            <Logo />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6 flex rounded-full bg-white/5 p-1">
            <Button
              className={cn(
                "flex-1 cursor-pointer rounded-full shadow-sm",
                isCreateActive
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-transparent text-white/50 hover:bg-white/5 hover:text-white/70"
              )}
              size="sm"
              variant="ghost"
            >
              Create
            </Button>
            <Button
              className="flex-1 cursor-pointer rounded-full text-white/50 hover:bg-white/5 hover:text-white/70"
              size="sm"
              variant="ghost"
            >
              Edit
            </Button>
          </div>

          <div className="mb-8 space-y-2">
            <Link to="/">
              <Button
                className={cn(
                  "group w-full cursor-pointer justify-start gap-3 rounded-xl border border-white/15 transition-all duration-300",
                  "bg-[#1a1a1d] text-white hover:border-white/25 hover:bg-[#252528]",
                  "shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                )}
                size="lg"
                variant="ghost"
              >
                <Sparkles className="size-5 text-white/80" />
                <span className="font-medium">Agent</span>
                <span className="ml-auto rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 px-2.5 py-0.5 font-bold text-[10px] text-black shadow-[0_0_12px_rgba(16,185,129,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/20 backdrop-blur-sm">
                  HOT
                </span>
              </Button>
            </Link>

            <Button
              className="w-full cursor-pointer justify-start gap-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white/80"
              size="sm"
              variant="ghost"
            >
              <Wrench className="size-4" />
              <span>ToolBox</span>
            </Button>
          </div>

          <div className="mt-6">
            <div className="mb-3 px-1 font-medium text-white/30 text-xs uppercase tracking-wider">
              HISTORY
            </div>
            <Button
              className="mb-4 w-full cursor-pointer justify-center gap-2 rounded-full border border-white/10 bg-white/5 font-medium text-white shadow-sm hover:bg-white/10"
              size="sm"
            >
              <Plus className="size-4" />
              New task
            </Button>
            <div className="space-y-1">
              {historyItems.map((item) => (
                <Button
                  className="w-full cursor-pointer justify-start gap-3 rounded-lg font-normal text-white/40 hover:bg-white/5 hover:text-white/70"
                  key={item.id}
                  size="sm"
                  variant="ghost"
                >
                  <History className="size-4 opacity-50" />
                  <span className="truncate">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-white/5 border-t p-3">
          <div className="mb-3 space-y-1">
            <Button
              className="w-full cursor-pointer justify-start gap-3 rounded-lg text-white/60 transition-colors hover:bg-[#1a1a1d] hover:text-white/90"
              size="sm"
              variant="ghost"
            >
              <Gift className="size-4" />
              Refer & Earn
            </Button>
            <Button
              className="w-full cursor-pointer justify-start gap-3 rounded-lg text-white/60 transition-colors hover:bg-[#1a1a1d] hover:text-white/90"
              size="sm"
              variant="ghost"
            >
              <Star className="size-4" />
              Subscribe
            </Button>
            <Button
              className="w-full cursor-pointer justify-start gap-3 rounded-lg text-white/60 transition-colors hover:bg-[#1a1a1d] hover:text-white/90"
              size="sm"
              variant="ghost"
            >
              <HelpCircle className="size-4" />
              FAQs
            </Button>
            <Button
              className="w-full cursor-pointer justify-start gap-3 rounded-lg text-white/60 transition-colors hover:bg-[#1a1a1d] hover:text-white/90"
              size="sm"
              variant="ghost"
            >
              <Globe className="size-4" />
              Language
              <span className="ml-auto rounded-md bg-[#1a1a1d] px-2 py-0.5 text-white/70 text-xs">
                EN
              </span>
            </Button>
          </div>
          <UserMenu />
        </div>
      </div>
    </aside>
  );
}
