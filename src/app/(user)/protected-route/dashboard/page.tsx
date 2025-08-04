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

async function page() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();

  const token = (await cookieStore).get("accessToken");

  if (!token || !token.value) {
    console.log("No token found");
    return redirect("/auth/signin");
  }

  try {
    const session = await verifyJWTServer(token.value);
    console.log(session);

    if (!session.valid) return redirect("/auth/signin");
    console.log("No token found", session);
  } catch (error) {
    console.error(error);
    // return redirect("/auth/signin");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
}

export default page;
