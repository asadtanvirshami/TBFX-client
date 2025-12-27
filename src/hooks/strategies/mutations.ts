"use client";

import { useMutation } from "@tanstack/react-query";
import { StrategyData } from "@/types/strategy-type/type";
import { apiEndpoints } from "@/api/endpoints";
import api from "@/api/axios";

export const useCreateStrategy = () => {
  return useMutation({
    mutationFn: async (input: StrategyData) => {
      const res = await api.post(apiEndpoints.strategies.create, input);
      return res.data;
    },
  });
};
