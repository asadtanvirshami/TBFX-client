// hooks/trades/queries.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";

export const SyncPlan = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["sync-plan"],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.billing.sync);
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
