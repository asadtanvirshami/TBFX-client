import React, { memo } from "react";

import MetricsWidget from "./metrics.widget";
import ProfitDistributionWidget from "./profit-dist.widget";
import { AreaChartWidget } from "./area-chart.widget";
import TradeHistoryWidget from "./trades-history.widget";
import NewsWidget from "./news.widget";
import AccInfoWidget from "./acc-info.widget";
import { TradeStats } from "@/types/dashboard-type/type";
import { TradeRaw } from "@/types/trade-type/type";

const DashboardLayout = ({
  data,
}: {
  data: { trades: TradeRaw[]; stats: TradeStats };
}) => {
  return (
    <div className="flex flex-col p-6 items-center justify-center space-y-8 w-full h-full">
      <section className="w-full">
        <AccInfoWidget data={data.stats} />
      </section>

      <section className="grid gap-5 grid-cols-1 md:grid-cols-2 w-full">
        <MetricsWidget data={data.stats} />
        <ProfitDistributionWidget data={data.trades} />
      </section>

      <section className="w-full">
        <NewsWidget />
      </section>

      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
        <AreaChartWidget data={data.trades} />
        <TradeHistoryWidget data={data.trades} />
      </section>
    </div>
  );
};

export default memo(DashboardLayout);
