import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { getSearchParams } from "@/utils/search-params/url-search-params";
import PageLayout from "./components/page-layout";

export default async function TradesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // normalize searchParams: take first value if array
  const normalized: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) normalized[key] = value[0];
    else if (value !== undefined) normalized[key] = value;
  });

  const { accountId, page, limit } = getSearchParams(normalized, {
    accountId: "default-account",
    page: 1,
    limit: 8,
  });

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
