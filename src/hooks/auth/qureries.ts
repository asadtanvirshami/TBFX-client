// hooks/auth/useVerifyJWT.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import Cookies from "js-cookie";

export const useVerifyJWT = () => {
  const token = Cookies.get("token"); // Adjust key if your cookie is named differently

  const {
    data: verification,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["verify-jwt"],
    queryFn: async () => {
      if (!token) throw new Error("Token not found");

      const res = await api.post(apiEndpoints.auth.verifyJWT, { token });
      return res.data;
    },
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    verification,
    isLoading,
    isError,
    error,
    refetch,
  };
};
