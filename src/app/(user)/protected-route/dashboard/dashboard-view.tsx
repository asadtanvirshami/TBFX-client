//app/protected-route/dashboard/page.tsx

"use client";
import React, { memo } from "react";
import MetricsWidget from "./widgets/metrics.widget";
import ProfitDistributionWidget from "./widgets/profit-dist.widget";
import { AreaChartWidget } from "./widgets/area-chart.widget";
import TradeHistoryWidget from "./widgets/trades-history.widget";
import NewsWidget from "./widgets/news.widget";
import AccInfoWidget from "./widgets/acc-info.widget";
import { useGetStats } from "@/hooks/dashboard/queries";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetStats("22673701");

  if (isLoading)
    return (
      <div className="flex flex-col p-6 items-center justify-center space-y-8 w-full h-full ">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );

  if (isError) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col p-6 items-center justify-center space-y-8 w-full h-full">
      <div className=" w-full">
        <AccInfoWidget data={data?.stats} />
      </div>
      <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full ">
        <MetricsWidget data={data?.stats} />
        <ProfitDistributionWidget data={data.trades} />
      </div>
      <div className="w-full">
        <NewsWidget />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
        <AreaChartWidget data={data?.trades} />
        <TradeHistoryWidget data={data?.trades} />
      </div>
    </div>
  );
};

export default memo(Dashboard);
