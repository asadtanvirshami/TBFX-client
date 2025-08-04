//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
import MetricsWidget from "./components/metrics.widget";
import ProfitDistributionWidget from "./components/profit-dist.widget";
import { AreaChartWidget } from "./components/area-chart.widget";
import TradeHistoryWidget from "./components/trades-history.widget";
import NewsWidget from "./components/news.widget";
import AccInfoWidget from "./components/acc-info.widget";
import { useGetTradesAndStats } from "@/hooks/dashboard/queries";
import DashboardSkeleton from "./components/dashboard-skeleton";

const Dashboard = () => {
  const {
    data: trades,
    isLoading: isLoadingTrades,
    isError: isErrorTrades,
  } = useGetTradesAndStats();

  if (isLoadingTrades || !trades) return <DashboardSkeleton />;

  if (isErrorTrades) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col p-6 items-center justify-center space-y-8 w-full h-full">
      <div className=" w-full">
        <AccInfoWidget data={trades?.stats} />
      </div>
      <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full ">
        <MetricsWidget data={trades?.stats} />
        <ProfitDistributionWidget data={trades?.trades} />
      </div>
      <div className="w-full">
        <NewsWidget />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
        <AreaChartWidget data={trades?.trades} />
        <TradeHistoryWidget data={trades?.trades} />
      </div>
    </div>
  );
};

export default memo(Dashboard);
