//app/auth/account-recovery/page.tsx
"use client";
import React from "react";

import Image from "next/image";
import { useTheme } from "next-themes";

import mt4 from "../../../../../public/assets/mt4.png";
import mt5 from "../../../../../public/assets/mt5.png";
import manual from "../../../../../public/assets/manual.png";

import { cn } from "@/lib/utils";
import SubscriptionCards from "@/components/ui/subscription-plans";
const SubscriptionPage = () => {
  const { theme } = useTheme();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center justify-center h-full w-full overflow-hidden ">
        <div>
          <h1 className="text-3xl font-bold mt-4 text-center text-gray-800 dark:text-white">
            Select your Trade Account Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            We support over 100+ MetaTrader 4/5 brokers to start from.
          </p>
          <SubscriptionCards
            prices={{
              free: { monthly: 0 },
              standard: { monthly: 2500 },
              elite: { monthly: 4700 },
            }}
            yearlyDiscountPercent={20}
            onChooseFree={async () => {
              // POST /onboarding/choose-plan { plan_code: 'free' }
            }}
            onCheckout={async (plan, { cycle, coupon }) => {
              // POST /onboarding/choose-plan { plan_code: plan, coupon_code: coupon }
              // → { checkoutUrl } then window.location.href = checkoutUrl
            }}
            onValidateCoupon={async (code, plan) => {
              // POST /billing/validate-coupon { code, plan_code: plan }
              return {
                code,
                type: "percent",
                value: 20,
                applies_to: "any",
                label: "Student 20% off",
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
