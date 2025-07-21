"use client";

import * as React from "react";
import {
  Award,
  Book,
  BookOpen,
  Calculator,
  CandlestickChart,
  Dock,
  Frame,
  LifeBuoy,
  Send,
  Settings2,
  Target,
} from "lucide-react";

import { NavMain } from "@/components/ui/app-layout/nav-main";
import { NavSecondary } from "@/components/ui/app-layout/nav-secondary";
import { NavUser } from "@/components/ui/app-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../theme-provider/toggle-button";

import dark_logo from "../../../../public/assets/dark.png";
import light_logo from "../../../../public/assets/light.png";
import Image from "next/image";
import { useTheme } from "next-themes";

// ✅ Memoize data outside component
const sidebarData = {
  user: {
    name: "John Davis",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "#", icon: Dock },
    {
      title: "Operations",
      url: "#",
      icon: Target,
      items: [
        { title: "Orders", url: "#" },
        { title: "Portfolios", url: "#" },
      ],
    },
    { title: "Strategy", url: "#", icon: Frame },
    { title: "Trading Journal", url: "#", icon: Book },
    { title: "Patterns", url: "#", icon: CandlestickChart },
    { title: "Learning", url: "#", icon: BookOpen },
    { title: "Rewards", url: "#", icon: Award },
    {
      title: "Tools",
      url: "#",
      icon: Calculator,
      items: [{ title: "Lot Size Calculator", url: "#" }],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ],
};

// ✅ Memoized component
const AppSidebarComponent = (props: React.ComponentProps<typeof Sidebar>) => {
  const { theme } = useTheme();

  const logo = React.useMemo(
    () => (theme === "dark" ? dark_logo : light_logo),
    [theme]
  );

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center">
              <Image src={logo} alt="Logo" width={50} height={50} />
              <div className="grid flex-1 w-full text-left leading-tight font-[family-name:var(--font-poppins)]">
                <span className="font-semibold text-xl bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
                  BackTesting
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <ModeToggle />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

// ✅ Export memoized component
export const AppSidebar = React.memo(AppSidebarComponent);
