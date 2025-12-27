import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { TradeRaw } from "@/types/trade-type/type";
import { useMutation } from "@tanstack/react-query";

export type CreateTradeInput = Omit<TradeRaw, "id">;

export const useCreateTrade = () =>
  useMutation({
    mutationFn: (input: TradeRaw) =>
      api.post(apiEndpoints.trades.create, input).then((res) => res.data),
  });   
