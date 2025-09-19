  // src/app/(user)/protected-route/operations/page.tsx
  import {
    HydrationBoundary,
    dehydrate,
    QueryClient,
  } from "@tanstack/react-query";
  import api from "@/api/axios";
  import { apiEndpoints } from "@/api/endpoints";
  import { getSearchParams } from "@/utils/search-params/url-search-params";
  import PageLayout from "./components/page-layout";

  interface TradesPageProps {
    searchParams?: Record<string, string | string[] | undefined>;
  }

  // Helper to normalize Next.js searchParams
  function normalizeSearchParams(
    params?: Record<string, string | string[] | undefined>
  ): Record<string, string> {
    const normalized: Record<string, string> = {};
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) normalized[key] = value[0];
      else if (value !== undefined) normalized[key] = value;
    });
    return normalized;
  }

  export default async function TradesPage({ searchParams }: TradesPageProps) {
    // Normalize searchParams
    const normalizedParams = normalizeSearchParams(searchParams);

    // Extract typed params with defaults
    const { accountId, page, limit } = getSearchParams(normalizedParams, {
      accountId: "default-account",
      page: 1,
      limit: 8,
    });

    // Create a fresh query client on the server
    const queryClient = new QueryClient();

    // Prefetch trades data on the server
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
