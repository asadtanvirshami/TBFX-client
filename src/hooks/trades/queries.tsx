// hooks/trades/queries.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";

export const useGetStats = (accountId: string, page = 1, limit = 8) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stats", accountId, page, limit],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.trades.stats, {
        params: {
          accountId,
        },
      });

      return res.data;
    },
    enabled: !!accountId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
