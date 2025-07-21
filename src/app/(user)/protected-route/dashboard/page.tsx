import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardView from "./dashboard-view";
import { cookies } from "next/headers";

async function page() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();

  const token = (await cookieStore).get("accessToken");

  if (!token) {
    // return redirect("/auth/signin");
  }

  if (token) {
    // try {
    //   const session = await verifyJWTServer(token.value);
    //   if (session.valid === false) return redirect("/auth/signin");
    // } catch (error) {
    //   console.log(error);
    //   redirect("/auth/signin");
    // }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
}

export default page;
