//app/protected-route/dashboard/page.tsx

"use client";

import { TradeCalendarDemo } from "@/components/ui/landing-layout/tabs-section/calendar";
import { trades } from "@/components/ui/landing-layout/tabs-section/calendar/mock/data";
import MetricCard from "@/components/ui/metric-card";
import { analyzeTrades } from "@/lib/trade-metrics";
import React, { memo } from "react";
import MetricsWidget from "./widgets/metrics.widget";
import ProfitDistributionWidget from "./widgets/profit-dist.widget";
import ForexNewsCarousel from "@/components/ui/landing-layout/tabs-section/dashboard/demo-news";
import TradeTable from "@/components/ui/table/trades-table/table";
import { AreaChartWidget } from "./widgets/area-chart.widget";
import TradeHistoryWidget from "./widgets/trades-history.widget";
import { TradeCalendarWidget } from "./widgets/trade-calendar.widget";
import NewsWidget from "./widgets/news.widget";
import AccInfoWidget from "./widgets/acc-info.widget";
import Data from "@/mocks/data.json";

const Dashboard = () => {
  return (
    <div className="w-full container mt-12 justify-center space-y-8 items-center m-auto">
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
    </div>
  );
};

export default memo(Dashboard);
