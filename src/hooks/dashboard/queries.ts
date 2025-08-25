// hooks/trades/queries.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useGetTradesAndStats = () => {
  const trade_account = useSelector(
    (state: RootState) => state.trade_account.current
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stats", trade_account],
    queryFn: async () => {
      const res = await api.get(
        apiEndpoints.dashboard.stats(trade_account ? trade_account : ""),
        {
          params: {
            accountId: trade_account,
          },
        }
      );
      return res.data;
    },
    enabled: trade_account !== null,
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
