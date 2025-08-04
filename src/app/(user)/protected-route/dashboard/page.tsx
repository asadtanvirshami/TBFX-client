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
import { apiEndpoints } from "@/api/endpoints";
import api from "@/api/axios";

async function page() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();

  const token = (await cookieStore).get("accessToken");

  if (!token || !token.value || token.value.split(".").length !== 3) {
    return redirect("/auth/signin");
  }

  try {
    const session = await verifyJWTServer(token.value);

    if (!session.valid) return redirect("/auth/signin");
  } catch (error) {
    console.error(error);
    return redirect("/auth/signin");
  }

  await queryClient.prefetchQuery({
    queryKey: ["trades", 1, 8],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.trades.get, {
        params: { accountId: "22673701" },
        headers: {
          Cookie: `accessToken=${token}`,
        },
      });
      console.log(res, "server");

      return res.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
}

export default page;
