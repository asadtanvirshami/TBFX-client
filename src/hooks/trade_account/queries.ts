// hooks/trade-account/queries.ts

import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useActiveAccount = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["active_account"],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.trade_account.active);

      return res.data;
    },
    retry: true,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useGetAccounts = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await api.get(apiEndpoints.trade_account.get);

      return res.data;
    }, 
    retry: true,
    refetchOnWindowFocus: false,
    enabled: user !== null,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
