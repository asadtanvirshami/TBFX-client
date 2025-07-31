// hooks/trades/queries.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";

export const useGetNews = (
  pair: string,
  page = 1,
  limit = 8
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news", pair, page, limit],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.news.get, {
        params: {
          pair,
        },
      });

      return res.data;
    },
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
