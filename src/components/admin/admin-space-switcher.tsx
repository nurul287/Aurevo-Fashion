import { APP_PATHS } from "@/constants/app-paths";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Check, ChevronsUpDown, LayoutDashboard, Package, Store } from "lucide-react";
import { Link } from "react-router-dom";

const spaces = [
  {
    id: "admin",
    label: "Admin Panel",
    description: "Inventory & orders",
    to: APP_PATHS.admin,
    icon: Package,
    current: true,
  },
  {
    id: "storefront",
    label: "Storefront",
    description: "Browse the shop",
    to: APP_PATHS.home,
    icon: Store,
    current: false,
  },
  {
    id: "account",
    label: "My Account",
    description: "Orders & profile",
    to: APP_PATHS.dashboard,
    icon: LayoutDashboard,
    current: false,
  },
] as const;

export function AdminSpaceSwitcher() {
  const { isMobile } = useSidebar();
  const active = spaces.find((s) => s.current) ?? spaces[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip="Switch space"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <active.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Aurevo Admin</span>
                <span className="truncate text-xs text-muted-foreground">
                  Switch space
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Jump to another space
            </DropdownMenuLabel>
            {spaces.map((space) => {
              const content = (
                <>
                  <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                    <space.icon className="size-4 shrink-0" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-medium">{space.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {space.description}
                    </span>
                  </div>
                  {space.current && (
                    <Check className="size-4 text-primary" aria-hidden />
                  )}
                </>
              );

              if (space.current) {
                return (
                  <DropdownMenuItem
                    key={space.id}
                    className="gap-2 p-2 opacity-80"
                    onSelect={(e) => e.preventDefault()}
                  >
                    {content}
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem
                  key={space.id}
                  asChild
                  className="gap-2 p-2 cursor-pointer"
                >
                  <Link to={space.to}>{content}</Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <p className="px-2 py-1.5 text-[11px] text-muted-foreground">
              You&apos;re managing the store — hop out anytime.
            </p>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
