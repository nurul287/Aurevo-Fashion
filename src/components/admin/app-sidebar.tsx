import { AdminSpaceSwitcher } from "@/components/admin/admin-space-switcher";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Bot, Home, Layers, Package, ShoppingCart, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
      isActive: true,
    },
    {
      title: "Product Setup",
      url: "/admin/categories",
      icon: Layers,
      items: [
        {
          title: "1. Categories",
          url: "/admin/categories",
        },
        {
          title: "2. Brands",
          url: "/admin/brands",
        },
      ],
    },
    {
      title: "Product Management",
      url: "/admin/products",
      icon: Package,
      items: [
        {
          title: "3. Products",
          url: "/admin/products",
        },
        {
          title: "4. Variants",
          url: "/admin/variants",
        },
        {
          title: "5. Images",
          url: "/admin/images",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/admin/inventory",
      icon: Package,
    },
    {
      title: "AI Assistant",
      url: "/admin/ai",
      icon: Bot,
    },
    {
      title: "Bulk Import",
      url: "/admin/imports",
      icon: Upload,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders",
        },
        {
          title: "Pending",
          url: "/admin/orders?status=pending",
        },
        {
          title: "Processing",
          url: "/admin/orders?status=processing",
        },
        {
          title: "Shipped",
          url: "/admin/orders?status=shipped",
        },
        {
          title: "Delivered",
          url: "/admin/orders?status=delivered",
        },
        {
          title: "Cancelled",
          url: "/admin/orders?status=cancelled",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AdminSpaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      !item.items &&
                      (item.url === "/admin"
                        ? location.pathname === "/admin"
                        : location.pathname.startsWith(item.url))
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        // Compare full path+search so "/admin/orders" (All Orders)
                        // is not still active when on "/admin/orders?status=cancelled".
                        const currentPath = location.pathname + location.search;
                        const isSubActive = currentPath === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubActive}
                            >
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
