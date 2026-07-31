import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { APP_PATHS } from "@/constants/app-paths";
import { LayoutDashboard, Store } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
            >
              <Link to={APP_PATHS.dashboard}>
                <LayoutDashboard className="size-4" />
                My account
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="group gap-2 border-dashed hover:border-solid hover:bg-[#111111] hover:text-white transition-all"
            >
              <Link to={APP_PATHS.home}>
                <Store className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
                Visit store
              </Link>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
