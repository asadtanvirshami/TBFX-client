"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-layout/app-sidbar";
import Header from "../header";
import Footer from "../footer";

import ReactQueryClientProvider from "@/provider/react-query";
import StoreProvider from "@/redux/store-provider";
import AppHeader from "./app-header";

const MemoizedSidebar = React.memo(AppSidebar);
const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isAuthPath = path.startsWith("/auth");
  const isProtectedRoute = path.startsWith("/protected-route/");

  if (isAuthPath) {
    return (
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <StoreProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </StoreProvider>
      </GoogleOAuthProvider>
    );
  }

  if (isProtectedRoute) {
    return (
      <StoreProvider>
        <ReactQueryClientProvider>
          <SidebarProvider>
            <MemoizedSidebar />
            <main className="w-full flex-col flex h-full">
              <AppHeader />
              {children}
            </main>
          </SidebarProvider>
        </ReactQueryClientProvider>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <ReactQueryClientProvider>
        <MemoizedHeader />
        {children}
        <MemoizedFooter />
      </ReactQueryClientProvider>
    </StoreProvider>
  );
}
