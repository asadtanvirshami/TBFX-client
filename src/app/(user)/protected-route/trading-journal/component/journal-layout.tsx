"use client";
import React from "react";
import { TradeCalendarWidget } from "../../dashboard/components/trade-calendar.widget";
import { trades } from "@/components/ui/landing-layout/tabs-section/calendar/mock/data";
import { useGetTrades } from "@/hooks/trades/queries";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LayoutSkeleton from "./layout-skeleton";

const JournalLayout = () => {
  const accountId = useSelector(
    (state: RootState) => state.trade_account.current
  );

  const { data, isLoading, isError, error } = useGetTrades(
    accountId || "",
    1,
    10
  );

  if (isLoading) {
    return <LayoutSkeleton />
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="p-12">
      <TradeCalendarWidget taskData={data?.data ?? []} />
    </div>
  );
};

export default JournalLayout;
