import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { getSearchParams } from "@/utils/search-params/url-search-params";
import TradeHistoryWidget from "../dashboard/components/trades-history.widget";
import PageLayout from "./components/page-layout";
import { log } from "console";

export default async function TradesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const resolvedParams = await searchParams;
  const { accountId, page, limit } = getSearchParams(resolvedParams, {
    accountId: "default-account",
    page: 1,
    limit: 8,
  });
  console.log("accountId, page, limit", accountId, page, limit);

  // Create a fresh query client on the server
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trades", accountId, page, limit],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.trades.get, {
        params: { accountId, page, limit },
      });
      return res.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout accountId={accountId} page={page} limit={limit} />
    </HydrationBoundary>
  );
}
