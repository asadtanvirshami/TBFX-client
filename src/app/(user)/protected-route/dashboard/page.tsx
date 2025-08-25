"use client";

import React, { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetTradesAndStats } from "@/hooks/dashboard/queries";

import AccountSignin from "../../../../components/form/account-signin";
import DashboardSkeleton from "./components/dashboard-skeleton";
import DashboardLayout from "./components/dashboard-layout";

/**
 * Dashboard Component
 *
 * Flow:
 * 1. Show skeleton if either account info or trades are loading.
 * 2. Show error fallback if trades fetch fails.
 * 3. If authenticated but no trade accounts → show AccountSignin.
 * 4. If authenticated with trade accounts → show DashboardLayout.
 * 5. If no user → render nothing.
 */
const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user, shallowEqual);
  const { current, isLoading: isAccountLoading } = useSelector(
    (state: RootState) => state.trade_account,
    shallowEqual
  );

  const {
    data: trades,
    isLoading: isTradesLoading,
    isError: isTradesError,
  } = useGetTradesAndStats();

  if (isAccountLoading || isTradesLoading) {
    return <DashboardSkeleton />;
  }

  if (isTradesError) {
    return null;
  }

  if (user && !current) {
    return (
      <React.Fragment>
        <div className="flex flex-col h-screen space-y-4 w-full items-center justify-center">
          <p className="text-lg">
            You have no trade accounts connected to your account.
          </p>
        </div>
        <AccountSignin buttonVisibility={true} />
      </React.Fragment>
    );
  }

  if (user && current != null) {
    return <DashboardLayout data={trades} />;
  }

  return null;
};

export default memo(Dashboard);
