//app/protected-route/dashboard/page.tsx

"use client";
import { trades } from "@/components/ui/landing-layout/tabs-section/calendar/mock/data";
import React, { memo } from "react";
import MetricsWidget from "./widgets/metrics.widget";
import ProfitDistributionWidget from "./widgets/profit-dist.widget";
import { AreaChartWidget } from "./widgets/area-chart.widget";
import TradeHistoryWidget from "./widgets/trades-history.widget";
import NewsWidget from "./widgets/news.widget";
import AccInfoWidget from "./widgets/acc-info.widget";


const Dashboard = () => {
  return (
    <div className="flex flex-col p-6 items-center justify-center space-y-8">
      <div className=" w-full">
        <AccInfoWidget />
      </div>
      <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full ">
        <MetricsWidget data={trades} />
        <ProfitDistributionWidget data={trades} />
      </div>
      <div className="w-full">
        <NewsWidget />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full">
        <AreaChartWidget />
        <TradeHistoryWidget />
      </div>
    </div>
  );
};

export default memo(Dashboard);
