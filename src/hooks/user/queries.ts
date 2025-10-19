import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { queryClient } from "@/provider/react-query";
import { refresh } from "aos";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get(apiEndpoints.users.me).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const refreshUser = () => queryClient.invalidateQueries({ queryKey: ["me"] });
  return {
    user,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
    refreshUser,
  };
};
