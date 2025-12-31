import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const user = {
    name: "Guest User",
    email: "guest@example.com",
    image: null as string | null,
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 font-medium text-sm text-white">
          {user.image ? (
            <img
              alt={user.name}
              className="size-full rounded-full object-cover"
              height={36}
              src={user.image}
              width={36}
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-sm">{user.name}</div>
          <div className="truncate text-muted-foreground text-xs">
            {user.email}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card" side="top">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut className="mr-2 size-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
