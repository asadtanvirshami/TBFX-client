import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";

export const useAccountSwitch = () =>
  useMutation({
    mutationFn: (input: { id: string }) =>
      api
        .patch(`${apiEndpoints.trade_account.switch}/${input.id}`)
        .then((res) => res.data),
  });
