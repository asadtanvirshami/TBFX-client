import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get(apiEndpoints.users.me).then((res) => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
  };
};
