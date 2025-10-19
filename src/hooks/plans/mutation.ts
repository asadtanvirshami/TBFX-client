import api from "@/api/axios";
import { apiEndpoints } from "@/api/endpoints";
import {
  ChoosePlanInput,
  CouponInfo,
  ValidateCouponInput,
} from "@/types/billing-type/type";
import { sanitizeFlatStrings } from "@/utils/sanitize";
import { useMutation } from "@tanstack/react-query";

export const useChoosePlan = () =>
  useMutation({
    mutationFn: (input: ChoosePlanInput) =>
      api
        .post(
          apiEndpoints.billing.createCheckoutSession,
          sanitizeFlatStrings(input)
        )
        .then((res) => res.data),
  });


export const useValidateCoupon = () =>
  useMutation({
    mutationFn: (input: ValidateCouponInput) =>
      api
        .post(apiEndpoints.billing.validateCoupon, sanitizeFlatStrings(input))
        .then((res) => res.data as CouponInfo | null),
  });

export const useUpgradePlan = () =>
  useMutation({
    mutationFn: (input: ChoosePlanInput) =>
      api
        .patch(apiEndpoints.billing.upgrade, sanitizeFlatStrings(input))
        .then((res) => res.data),
  });
