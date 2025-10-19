"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/slices/user/user-slice";

import SubscriptionCards from "@/components/ui/subscription-plans";
import {
  useChoosePlan,
  useUpgradePlan,
  useValidateCoupon,
} from "@/hooks/plans/mutation";
import { useUser } from "@/hooks/user/queries";

export default function PlansPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const { refetch } = useUser();
  const { user } = useSelector((state: RootState) => state.user);

  const choosePlanMutation = useChoosePlan();
  const upgradePlanMutation = useUpgradePlan();
  const validateCouponMutation = useValidateCoupon();

  // -------------------------------------------
  // 🧠 Centralized plan selection handler
  // -------------------------------------------
  const handlePlanSelection = async (
    action: "choose" | "upgrade",
    plan: string,
    cycle: "month" | "year",
    coupon?: string
  ) => {
    try {
      const mutation =
        action === "choose" ? choosePlanMutation : upgradePlanMutation;
      console.log(`🎉 ${action} plan: ${plan} (${cycle})`);
      const res = await mutation.mutateAsync({
        plan_code: plan,
        cycle,
        coupon_code: coupon,
      });

      // ✅ Handle missing response safely
      if (!res) throw new Error("No response from server.");

      // ✅ Handle error state returned by mutation
      if (mutation.isError || (res as any).isError) {
        console.error(`❌ Failed to ${action} plan:`, res);
        alert("Something went wrong. Please try again later.");
        return;
      }

      // ✅ Handle free plan locally (no checkout)
      if (plan.toLowerCase() === "free") {
        const userData = await refetch();
        if (userData?.data) {
          dispatch(updateProfile(userData.data));
        }
        router.push("/plans/success");
        return;
      }

      // ✅ Redirect for paid plans
      const redirectUrl = res.checkoutUrl || res.redirectTo;
      if (!redirectUrl) {
        console.error("⚠️ No checkout URL or redirect returned from API");
        alert("Could not start checkout. Please contact support.");
        return;
      }

      router.push(redirectUrl);
    } catch (error) {
      console.error("💥 Plan selection failed:", error);
      alert("An unexpected error occurred. Please refresh and try again.");
    }
  };

  // -------------------------------------------
  // 🏷️ Coupon validation
  // -------------------------------------------
  const handleCouponValidation = async (code: string, plan: string) => {
    try {
      const res = await validateCouponMutation.mutateAsync({
        code,
        plan_code: plan,
      });

      if (validateCouponMutation.isError || !res) {
        alert("Invalid coupon. Please try another one.");
        return null;
      }

      return {
        code,
        type: res.type,
        value: res.value,
        applies_to: res.applies_to,
        label: res.label,
      };
    } catch (error) {
      console.error("Coupon validation failed:", error);
      alert("Error validating coupon. Please try again.");
      return null;
    }
  };

  // -------------------------------------------
  // 🧭 Render
  // -------------------------------------------
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center justify-center h-full w-full overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold mt-4 text-center text-gray-800 dark:text-white">
            Select your Trade Account Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            We support over 100+ MetaTrader 4/5 brokers to start from.
          </p>

          <SubscriptionCards
            isLoading={
              choosePlanMutation.isPending || upgradePlanMutation.isPending
            }
            prices={{
              free: { monthly: 0 },
              standard: { monthly: 2500 },
              elite: { monthly: 4700 },
            }}
            yearlyDiscountPercent={0}
            onChooseFree={async () => {
              const currentPlan = user?.plan?.toUpperCase();
              const action = ["ELITE", "STANDARD", "FREE"].includes(currentPlan)
                ? "upgrade"
                : "choose";
              await handlePlanSelection(action, "free", "month");
            }}
            onCheckout={async (plan, { cycle, coupon }) => {
              const currentPlan = user?.plan?.toUpperCase();
              const action = ["ELITE", "STANDARD", "FREE"].includes(currentPlan)
                ? "upgrade"
                : "choose";
              await handlePlanSelection(action, plan, cycle, coupon);
            }}
            onValidateCoupon={handleCouponValidation}
          />
        </div>
      </div>
    </div>
  );
}
