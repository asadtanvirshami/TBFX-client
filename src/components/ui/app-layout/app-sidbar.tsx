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
  Users2Icon,
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

import dark_logo from "../../../../public/assets/dark.png";
import light_logo from "../../../../public/assets/light.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AppSidebarComponent = (props: React.ComponentProps<typeof Sidebar>) => {
  const { theme } = useTheme();
  const User = useSelector((state: RootState) => state.user.user);
  const TradeAccount = useSelector((state: RootState) => state.trade_account);

  const logo = React.useMemo(
    () => (theme === "dark" ? dark_logo : light_logo),
    [theme]
  );

  const sidebarData = {
    user: {
      name: "John Davis",
      email: "john@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      { title: "Dashboard", url: "/protected-route/dashboard", icon: Dock },
      {
        title: "Operations",
        url: `/protected-route/operations?accountId=${
          TradeAccount?.current || ""
        }&limit=10 &page=1`,
        icon: Target,
      },
      { title: "Strategy", url: "/protected-route/strategy", icon: Frame },
      {
        title: "Trading Journal",
        url: "/protected-route/trading-journal",
        icon: Book,
      },
      { title: "Podium", url: "/protected-route/podium", icon: Users2Icon },
      // { title: "Patterns", url: "#", icon: CandlestickChart },
      // { title: "Learning", url: "#", icon: BookOpen },
      // { title: "Rewards", url: "#", icon: Award },
      {
        title: "Tools",
        url: "#",
        icon: Calculator,
        items: [
          {
            title: "Lot Size Calculator",
            url: "/protected-route/tools/lot-size",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          { title: "Billing", url: "/protected-route/billing" },
          { title: "Trade Accounts", url: "/protected-route/trade-accounts" },
        ],
      },
    ],
    navSecondary: [
      { title: "Support", url: "#", icon: LifeBuoy },
      { title: "Feedback", url: "#", icon: Send },
    ],
  };

  return (
    <Sidebar className="shadow-md " variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center">
              <Image src={logo} alt="Logo" width={50} height={50} />
              <div className="grid flex-1 w-full text-left leading-tight font-[family-name:var(--font-poppins)]">
                <span className="text-sm white">Trading BackTesting</span>
                <span className="font-semibold text-md bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
                  Platform
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarData.navMain} />

        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        {User ? (
          <NavUser
            user={{
              name: User.firstName + " " + User.lastName,
              email: User.email,
              avatar: User.avatar || "",
              sub: User.sub || "",
            }}
          />
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
};

export const AppSidebar = React.memo(AppSidebarComponent);
