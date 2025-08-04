import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardView from "./dashboard-view";
import { cookies } from "next/headers";
import { verifyJWTServer } from "@/lib/auth/verifyJWTServer";
import { redirect } from "next/navigation";

export default async function Page() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token || !token.value) {
    console.log("No token found");
    redirect("/auth/signin");
  }

  try {
    const session = await verifyJWTServer(token.value);
    if (!session.valid) {
      console.log("Invalid token");
      return redirect("/auth/signin");
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return redirect("/auth/signin");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
}
